import type { ProductData } from "@/types/ProductData";

export type ListingData = {
  products?: ProductData[];
  showMore?: boolean;
  totalHits?: number;
};
