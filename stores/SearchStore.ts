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
  KlevuFilterResultOptions,
} from "@klevu/core";
import type { EmptyResult } from "@/types/EmptyResult";
import type { QuickSearchResult } from "@/types/QuickSearchResult";
import type { SERPResult } from "@/types/SERPResult";
export const useSearchStore = defineStore("searchStore", () => {
  const { toggleLoadingSpinner } = useAppInfoStore();
  const { cleanImageUrl, cleanDataKlevu } = useKlevu();

  // General searchField Logic

  const searchTerm = ref("");
  const showDropDown = ref(false);

  // Logic quickSearch

  const MIN_LENGTH_SEARCH = 3;

  const quickSearchResult: QuickSearchResult = reactive({});

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
  };

  // Logic Empty search (using trending products)

  const LIMIT_TRENDING_PRODUCTS = 5;

  const emptyResult: EmptyResult = reactive({});

  const doEmptySearch = async () => {
    toggleLoadingSpinner(true);
    if (!emptyResult.products?.length) {
      const result = await KlevuFetch(
        trendingProducts({ limit: LIMIT_TRENDING_PRODUCTS })
      );
      emptyResult.products =
        result.queriesById("trendingProducts")?.records.map(cleanDataKlevu) ??
        [];

      emptyResult.lastSearched = KlevuLastSearches.get().map(
        (item) => item.term
      );
    }

    showDropDown.value = true;
    toggleLoadingSpinner(false);
  };

  // Logic SERP Page

  let prevResult: any;
  const manager = new FilterManager();
  const SERPResult: SERPResult = reactive({ showMore: false, products: [] });
  const filterOptions: KlevuFilterResultOptions[] = reactive([]);

  const doSERPSearch = async (searchTerm: string, sortOption: any) => {
    KlevuLastSearches.save(searchTerm);
    toggleLoadingSpinner(true);
    const result = await KlevuFetch(
      search(
        searchTerm,
        {
          id: "search",
          sort: sortOption.value,
          limit: 90,
        },
        listFilters({
          include: ["category"],
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

    Object.assign(filterOptions, manager.options);
    SERPResult.totalHits = searchResult?.meta.totalResultsFound;
    SERPResult.products = searchResult?.records.map(cleanDataKlevu);

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
      // TO DO get rid of !
      ...SERPResult.products!,
      ...(searchResult.records.map(cleanDataKlevu) ?? []),
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
    filterOptions,
  };
});
