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

  // TO DO
  // Might have to use it to be able to fetch category -> product mapping on over API
  // if client side version - use localStorage

  // Fetch category to product mapping - needed for PLP
  // nuxtApp.hook("app:rendered", async () => {
  //   console.log("IS THIS RUNNING?");
  //   const { categoryProductMap } = useAppInfoStore();
  //   const data = await $fetch(runtimeConfig.public.categoryProductMap);
  //   categoryProductMap.data = data as {}; // TO DO Type this also
  // });
});
