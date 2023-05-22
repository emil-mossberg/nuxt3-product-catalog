import { reactive, ref } from "vue";
import { useWindowSize } from "@vueuse/core";

import type { AppMessage } from "@/types/AppMessage";
import type { CategoryMenu } from "@/types/CategoryMenu";

export const useAppInfoStore = defineStore("appInfoStore", () => {
  // App message logic
  const appMessages: AppMessage[] = reactive([]);

  const addMessage = (type: "error" | "success", message: string) => {
    appMessages.push({ type, message });
  };

  const removeMessage = (messageIndex: number) => {
    appMessages.splice(messageIndex, 1);
  };

  const removeMessageAll = () => {
    appMessages.splice(0, appMessages.length);
  };

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

  // TO DO not user right now - need to work out solution
  const categoryProductMap = reactive({ data: {} });

  return {
    appMessages,
    addMessage,
    removeMessage,
    removeMessageAll,
    toggleLoadingSpinner,
    isLoading,
    isMobile,
    categoryMenu,
    categoryProductMap,
  };
});
