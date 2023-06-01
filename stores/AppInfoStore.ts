import { reactive, ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { defineStore } from "pinia";

import type { CategoryMenuList0 } from "@/types/CategoryMenuList";

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
  // TO DO how to have this typed when it is empty
  // TO DO switch type here
  const categoryMenu: CategoryMenuList0 = reactive({});
  const categoryMenu2: CategoryMenuList0 = reactive({});

  // Not used right now

  const categoryProductMap = reactive({ data: {} });

  return {
    toggleLoadingSpinner,
    isLoading,
    isMobile,
    categoryMenu,
    categoryMenu2,
    categoryProductMap,
  };
});
