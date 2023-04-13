import { defineStore } from "pinia";

import {
  KlevuFetch,
  KlevuLastSearches,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
  FilterManager,
  listFilters,
  applyFilterWithManager,
  // products,
} from "@klevu/core";
import { useAppInfoStore } from "@/stores/AppInfoStore";
export const useSearchStore = defineStore("searchStore", () => {
  const { toggleDarkOverlay, toggleLoadingSpinner } = useAppInfoStore();
  const { cleanImageUrl } = useKlevu();

  // General searchField Logic

  const searchTerm = ref<string>("");
  const showDropDown = ref<boolean>(false);

  // Logic quickSearch

  const MIN_LENGTH_SEARCH = 3;

  const quickSearchResult = reactive<any>({
    products: [],
    searchSuggestions: [],
  });

  const doQuickSearch = async () => {
    if (searchTerm.value.length < MIN_LENGTH_SEARCH) {
      return;
    }

    const result = await KlevuFetch(
      search(searchTerm.value, {
        limit: 5,
        typeOfRecords: [KlevuTypeOfRecord.Product],
      }),
      suggestions(searchTerm.value)
    );
    quickSearchResult.products = result
      .queriesById("search")
      ?.records.map(cleanImageUrl);
    quickSearchResult.searchSuggestions =
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((item) => item.suggest) ?? [];
  };

  const cleanQuickSearch = () => {
    quickSearchResult.products = [];
    quickSearchResult.searchSuggestions = [];
    searchTerm.value = "";
    showDropDown.value = false;
    toggleDarkOverlay(false);
  };

  // Logic Empty search (using trending products)

  const LIMIT_TRENDING_PRODUCTS = 5;

  const emptyResult = reactive<any>({
    products: [],
    lastSearched: [],
  });

  const doEmptySearch = async () => {
    toggleLoadingSpinner(true);
    if (!emptyResult.products.length) {
      const result = await KlevuFetch(
        trendingProducts({ limit: LIMIT_TRENDING_PRODUCTS })
      );
      emptyResult.products =
        result.queriesById("trendingProducts")?.records.map(cleanImageUrl) ??
        [];

      emptyResult.lastSearched = KlevuLastSearches.get().map(
        (item) => item.term
      );
    }

    showDropDown.value = true;
    toggleLoadingSpinner(false);
    toggleDarkOverlay(true);
  };

  // Logic SERP Page

  let prevResult: any;
  const manager = new FilterManager();

  const SERPResult = reactive<any>({
    products: [],
    filterOptions: [],
    showMore: false,
    totalHits: 0,
  });

  const doSERPSearch = async (searchTerm: string, sortOption: any) => {
    KlevuLastSearches.save(searchTerm);
    toggleLoadingSpinner(true);
    const result = await KlevuFetch(
      search(
        searchTerm,
        {
          id: "search",
          sort: sortOption.value,
          limit: 16,
        },
        listFilters({
          include: ["category"],
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
          filterManager: manager,
        }),
        applyFilterWithManager(manager)
      )
    );

    const searchResult = result.queriesById("search");

    if (!searchResult) {
      return;
    }

    prevResult = searchResult;

    SERPResult.filterOptions = manager.options;
    SERPResult.totalHits = searchResult?.meta.totalResultsFound;
    SERPResult.products = searchResult?.records.map(cleanImageUrl);
    console.log(SERPResult.products);
    SERPResult.showMore = Boolean(searchResult?.next);
    toggleLoadingSpinner(false);
  };
  const { scrollToBottom } = useScrollToBottom();
  const doNextSERPResult = async () => {
    const nextRes = await prevResult.next({
      FilterManager: manager,
    });

    const searchResult = nextRes.queriesById("search");

    SERPResult.products = [
      ...SERPResult.products,
      ...(searchResult.records.map(cleanImageUrl) ?? []),
    ];
    prevResult = searchResult;
    SERPResult.showMore = Boolean(searchResult?.next);

    scrollToBottom();
  };

  const toggleManager = (filterKey: string, option: string) => {
    manager.toggleOption(filterKey, option);
  };

  return {
    cleanQuickSearch,
    doQuickSearch,
    doEmptySearch,
    doSERPSearch,
    doNextSERPResult,
    toggleManager,
    searchTerm,
    showDropDown,
    emptyResult,
    quickSearchResult,
    SERPResult,
  };
});
