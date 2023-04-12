import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useAppInfoStore } from "@/stores/AppInfoStore";

import type { ProductData } from "@/types/ProductData";

export const useCompareStore = defineStore("compareStore", () => {
  const { addMessage } = useAppInfoStore();

  const compareProducts = reactive<any>({
    name: [],
    imageUrl: [],
    sku: [],
    id: [],
    category: [],
  });

  const showCompareLink = computed(() => compareProducts.name.length > 0);

  // TO DO in the future here we need to prof this against empty fields, check this when have more data
  const addProductToCompare = (data: ProductData) => {
    addMessage("success", data.name);
    const keys = Object.keys(data);
    const values = Object.values(data);
    keys.forEach((key, index) => {
      compareProducts[key].push(values[index]);
    });
  };

  return {
    addProductToCompare,
    compareProducts,
    showCompareLink,
  };
});
