import { reactive, ref } from "vue";
import { defineStore } from "pinia";

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

  // App loading spinner logic
  const isLoading = ref<boolean>(false);

  const toggleLoadingSpinner = (isShowing: boolean) => {
    isLoading.value = isShowing;
  };

  // App dark overlay logic
  const showDarkOverlay = ref<boolean>(false);

  const toggleDarkOverlay = (isShowing: boolean) => {
    showDarkOverlay.value = isShowing;
  };
  return {
    appMessages,
    addMessage,
    removeMessage,
    toggleLoadingSpinner,
    isLoading,
    showDarkOverlay,
    toggleDarkOverlay,
  };
});
