import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useWindowSize } from "@vueuse/core";

import type { AppMessage } from "@/types/AppMessage";

export const useAppInfoStore = defineStore("appInfo", () => {
  // App message logic
  const appMessages: AppMessage[] = reactive([]);

  const addMessage = (type: "error" | "success", message: unknown) => {
    if (typeof message === "string") {
      appMessages.push({ type, message });
    }
  };

  const removeMessage = (messageIndex: number) => {
    appMessages.splice(messageIndex, 1);
  };

  const removeMessageAll = () => {
    appMessages.splice(0, appMessages.length);
  };

  // App loading spinner logic
  const isLoading = ref<boolean>(false);

  const toggleLoadingSpinner = (isShowing: boolean) => {
    isLoading.value = isShowing;
  };

  const MOBILE_BREAPOINT = 480;
  const isMobile = computed(
    () => useWindowSize().width.value < MOBILE_BREAPOINT
  );

  return {
    appMessages,
    addMessage,
    removeMessage,
    removeMessageAll,
    toggleLoadingSpinner,
    isLoading,
    isMobile,
  };
});
