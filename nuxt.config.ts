// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/styles/main.less", "~/assets/styles/typography.less"],
  modules: ["@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  imports: {
    dirs: ["stores"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/styles/variables.less";',
        },
      },
    },
  },
  components: [
    "~/components",
    "~/components/icons",
    "~/components/basecomponents",
  ],
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      klevuKey: process.env.KLEVU_KEY_PC_TEST,
      klevuURL: process.env.KLEVU_URL_PC_TEST,
      categoryUrl: process.env.URL_CATEGORY_TREE,
      categoryProductMap: process.env.URL_CATEGORY_PRODUCT_MAP,
    },
  },
  app: {
    head: {
      title: "Lantmännen Lantbruk produktkatalog",
      meta: [
        { name: "description", content: "Add some useful information here" },
      ],
      htmlAttrs: {
        lang: "se",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },
});
