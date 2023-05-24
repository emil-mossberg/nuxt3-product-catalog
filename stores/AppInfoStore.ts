// TO DO computed this when can auto import, can other be also?
import { reactive, ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
// TO DO remove this when can auto import
import { defineStore } from "pinia";

import type { CategoryMenu } from "@/types/CategoryMenu";

export const useAppInfoStore = defineStore("appInfoStore", () => {
  // App loading spinner logic
  const isLoading = ref(false);

  const toggleLoadingSpinner = (isShowing: boolean) => {
    isLoading.value = isShowing;
  };

  // App logic break point mobile

  const MOBILE_BREAPOINT = 991;
  const isMobile = computed(
    () => useWindowSize().width.value < MOBILE_BREAPOINT
  );

  // App logic category and menu data

  const categoryMenu: CategoryMenu = reactive({});

  // Not used right now

  const categoryProductMap = reactive({ data: {} });

  return {
    toggleLoadingSpinner,
    isLoading,
    isMobile,
    categoryMenu,
    categoryProductMap,
  };
});
