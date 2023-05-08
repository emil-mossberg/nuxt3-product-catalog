import type { ProductData } from "@/types/ProductData";

export type SERPResult = {
  products?: ProductData[];
  showMore?: boolean;
  totalHits?: number;
};
