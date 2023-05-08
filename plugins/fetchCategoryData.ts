import { useAppInfoStore } from "@/stores/AppInfoStore";
import type { CategoryMenu } from "@/types/CategoryMenu";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  // app:mounted client side
  // app:rendered server side

  // Fetch category tree - needed for menu
  nuxtApp.hook("app:mounted", async () => {
    const { categoryMenu } = useAppInfoStore();
    const data = await $fetch<CategoryMenu>(runtimeConfig.public.categoryUrl);
    Object.assign(categoryMenu, data);
  });

  // Fetch category to product mapping - needed for PLP
  nuxtApp.hook("app:rendered", async () => {
    const { categoryProductMap } = useAppInfoStore();
    const data = await $fetch(runtimeConfig.public.categoryProductMap);
    categoryProductMap.data = data as {}; // TYYPE THIS ALSO
  });
  // TO DO if client side version - use localStorage
  // TO DO if server side version - try and pre render category component
});
