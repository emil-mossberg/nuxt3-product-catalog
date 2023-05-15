import type { ProductData } from "@/types/ProductData";

export type QuickSearchResult = {
  searchSuggestions?: string[];
  products?: ProductData[];
};
