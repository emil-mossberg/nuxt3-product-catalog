import type { CompareProductsAttribute } from "@/types/CompareProductsAttribute";

export type CompareProducts = {
  name: string[];
  imageUrl: string[];
  sku: string[];
  tableData: CompareProductsAttribute[];
};
