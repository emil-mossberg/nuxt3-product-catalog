import {
  KlevuFetch,
  KlevuLastSearches,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
} from "@klevu/core";
import type { EmptyResult } from "@/types/EmptyResult";
import type { QuickSearchResult } from "@/types/QuickSearchResult";
export const useSearchStore = defineStore("searchStore", () => {
  const { toggleLoadingSpinner } = useAppInfoStore();
  const { cleanDataKlevu } = useKlevu();

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
      ?.records.map(cleanDataKlevu);
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

  return {
    cleanQuickSearch,
    doQuickSearch,
    doEmptySearch,
    searchTerm,
    showDropDown,
    emptyResult,
    quickSearchResult,
  };
});
