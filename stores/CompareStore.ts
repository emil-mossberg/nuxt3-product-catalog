import { reactive, computed } from "vue";
import type { ProductData } from "@/types/ProductData";
import type { CompareProducts } from "@/types/CompareProducts";

export const useCompareStore = defineStore("compareStore", () => {
  const { addMessage } = useAppInfoStore();

  const compareProductsList: ProductData[] = reactive([]);
  const compareProducts: CompareProducts = reactive({
    name: [],
    sku: [],
    imageUrl: [],
    tableData: [],
  });

  const compareCount = computed<number>(() => compareProductsList?.length ?? 0);

  const isHeader = (names: string[]) => {
    return names.some((name) => name.toLowerCase() === "rubrik");
  };

  const buildCompareData = (productList: ProductData[]) => {
    // TO DO fix Typing reduce
    const tempList = productList.reduce(
      (accumulator, currentValue) =>
        (accumulator = accumulator.concat(Object.keys(currentValue.table))),
      []
    );

    const tempListUniq = Array.from(new Set(tempList)).map((item: string) => {
      return { label: item, values: [], isHeader: false };
    });

    // TO DO switch to map and/or type it
    tempListUniq.forEach((attribute) => {
      const attributes = [];
      productList.forEach((item) => {
        attributes.push(item.table[attribute.label] ?? "-");
      });

      attribute.values = attributes;
      attribute.isHeader = isHeader(attribute.values);
    });

    compareProducts.name = [];
    compareProducts.sku = [];
    compareProducts.imageUrl = [];
    compareProducts.tableData = [];

    Object.assign(compareProducts.tableData, tempListUniq);

    productList.forEach((item) => {
      compareProducts.name?.push(item.name);
      compareProducts.sku?.push(item.sku);
      compareProducts.imageUrl?.push(item.imageUrl);
    });
  };

  const addProductCompare = (product: ProductData) => {
    // Check if product already exists if so abort
    if (compareProductsList.find((item) => item.sku === product.sku)) {
      addMessage("success", product.name);
      return;
    }
    compareProductsList.push(product);

    buildCompareData(compareProductsList);

    localStorage.setItem(
      "compare-products",
      JSON.stringify(compareProductsList)
    );

    addMessage("success", product.name);
  };

  const getProductsFromLocalStorage = () => {
    if (localStorage.getItem("compare-products")) {
      Object.assign(
        compareProductsList,
        JSON.parse(localStorage.getItem("compare-products")!)
      );
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

  return {
    addProductCompare,
    getProductsFromLocalStorage,
    removeProductCompare,
    compareProducts,
    compareCount,
    compareProductsList,
  };
});
