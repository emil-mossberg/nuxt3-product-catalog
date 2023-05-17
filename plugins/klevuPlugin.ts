import { KlevuConfig } from "@klevu/core";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  // Set up global config for Klevu
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: runtimeConfig.public.klevuURL,
      apiKey: runtimeConfig.public.klevuKey,
    });
  }
});
