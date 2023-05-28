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

    console.log(
      Object.entries(data.children).map((category) => {
        return {
          id: category[0],
          name: category[1].name,
          slug_name: category[1].slug_name,
          children: Object.entries(category[1].children).map((category1) => {
            return {
              id: category1[0],
              name: category1[1].name,
              slug_name: category1[1].slug_name,
              children: Object.entries(category1[1].children).map(
                (category2) => {
                  return {
                    id: category2[0],
                    name: category2[1].name,
                    slug_name: category2[1].slug_name,
                  };
                }
              ),
            };
          }),
        };
      })
    );
    Object.assign(categoryMenu, data);
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
