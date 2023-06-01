import { useAppInfoStore } from "@/stores/AppInfoStore";
import type { CategoryMenu } from "@/types/CategoryMenu";
import type {
  CategoryMenuList0,
  CategoryMenuList1,
} from "@/types/CategoryMenuList";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  // app:mounted client side
  // app:rendered server side

  // Fetch category tree - needed for menu

  // TO DO remove just for testing
  const zuko = {
    nationality: "Fire Nation",
    nickname: "Zuzu",
  };

  Object.keys(zuko).forEach((key) => {
    console.log(zuko[key as keyof typeof zuko]);
  });

  nuxtApp.hook("app:mounted", async () => {
    const { categoryMenu, categoryMenu2 } = useAppInfoStore();
    const data = await $fetch<CategoryMenu>(runtimeConfig.public.categoryUrl);

    const categoryTemp: CategoryMenuList0 = reactive({});

    categoryTemp.children = Object.values(data.children).map((category0) => {
      if (typeof category0 === "object") {
        category0.children = Object.values(category0.children).map(
          (category1) => {
            category1.children = Object.values(category1.children).map(
              (category2) => {
                // TO do add mapping to lvl 4 here
                return category2;
              }
            );

            return category1;
          }
        );
      }

      return category0;
    });

    Object.assign(categoryMenu, categoryTemp);
  });

  // TO DO
  // Might have to use it to be able to fetch category -> product mapping on over API
  // if client side version - use localStorage

  // Fetch category to product mapping - needed for PLP
  // nuxtApp.hook("app:rendered", async () => {
  //   const { categoryProductMap } = useAppInfoStore();
  //   const data = await $fetch(runtimeConfig.public.categoryProductMap);
  //   categoryProductMap.data = data as {}; // TO DO Type this also
  // });
});
