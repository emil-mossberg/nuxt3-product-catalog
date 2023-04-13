import { KlevuConfig } from "@klevu/core";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: runtimeConfig.public.klevuURL,
      apiKey: runtimeConfig.public.klevuKey,
    });
  }

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {});
  // TO DO WHY DO I NEED THIS?

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {});
});
