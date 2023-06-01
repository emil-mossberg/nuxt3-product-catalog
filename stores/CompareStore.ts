import { defineStore } from "pinia";
import { reactive, computed, ref } from "vue";
import type { ProductData } from "@/types/ProductData";
import type { CompareProducts } from "@/types/CompareProducts";
import type { CompareProductsAttribute } from "@/types/CompareProductsAttribute";

export const useCompareStore = defineStore("compareStore", () => {
  const compareProductsList: ProductData[] = reactive([]);
  const compareProducts: CompareProducts = reactive({
    name: [],
    sku: [],
    imageUrl: [],
    tableData: [],
  });

  const compareCount = computed<number>(() => compareProductsList?.length ?? 0);

  const HEADER_IDENTIFIER = "rubrik";

  const isHeader = (names: string[]): boolean => {
    return names.some((name) => name.toLowerCase() === HEADER_IDENTIFIER);
  };

  const buildCompareData = (productList: ProductData[]): void => {
    // Create an array of all products attributes with unique values (no duplicates)
    const uniqueAttributes: string[] = productList.reduce(
      (accumulator: string[], currentValue) =>
        (accumulator = accumulator.concat(Object.keys(currentValue.table))),
      []
    );

    // Create an array of attributes with CompareProductsTable[] elements to use in Compare Page table
    const tableData = Array.from(new Set(uniqueAttributes)).map(
      (item: string): CompareProductsAttribute => {
        const attributes = productList.map(
          (product) => product.table[item] ?? "-"
        );
        return {
          label: item,
          values: attributes,
          isHeader: isHeader(attributes),
        };
      }
    );

    compareProducts.name = productList.map((item) => item.name);
    compareProducts.sku = productList.map((item) => item.sku);
    compareProducts.imageUrl = productList.map((item) => item.imageUrl);
    compareProducts.tableData = tableData;
  };

  const addProductCompare = (product: ProductData): void => {
    showCompareSlider.value = true;
    // Check if product already exists if so abort
    if (compareProductsList.find((item) => item.sku === product.sku)) {
      return;
    }
    newAddedProducts.skus.push(product.sku);
    compareProductsList.push(product);

    buildCompareData(compareProductsList);

    localStorage.setItem(
      "compare-products",
      JSON.stringify(compareProductsList)
    );
  };

  const getProductsFromLocalStorage = () => {
    const compareProducts = localStorage.getItem("compare-products");

    if (compareProducts && typeof compareProducts === "string") {
      Object.assign(compareProductsList, JSON.parse(compareProducts));
    }

    buildCompareData(compareProductsList);
  };

  const removeProductCompare = (index: number) => {
    compareProductsList.splice(index - 1, 1);
    buildCompareData(compareProductsList);

    localStorage.setItem(
      "compare-products",
      JSON.stringify(compareProductsList)
    );
  };

  const closeCompareSlider = () => {
    showCompareSlider.value = false;
    newAddedProducts.skus = [];
  };

  const showCompareSlider = ref(false);

  // TO DO MOVE THIS
  type NewAddedProducts = {
    skus: string[];
  };

  const newAddedProducts: NewAddedProducts = reactive({ skus: [] });

  return {
    addProductCompare,
    getProductsFromLocalStorage,
    removeProductCompare,
    compareProducts,
    compareCount,
    compareProductsList,
    showCompareSlider,
    closeCompareSlider,
    newAddedProducts,
  };
});
