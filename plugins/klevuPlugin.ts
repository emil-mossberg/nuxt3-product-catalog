import { KlevuConfig } from "@klevu/core";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  // Set up global config for Klevu
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: runtimeConfig.public.klevuURL,
      apiKey: runtimeConfig.public.klevuKey,
    });
  }

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {});

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {});
});
