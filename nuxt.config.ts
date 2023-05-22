// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/styles/main.less", "~/assets/styles/typography.less"],
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  pwa: {
    // workbox: {
    //   globPatterns: ["**/*.{js,css,html,ico,png,svg, woff2}"],
    // },
    registerType: "autoUpdate", // prompt (default) or autoUpdate
    manifest: {
      name: "Lantmännen Lantbruks Produktkatalog",
      short_name: "LM Produktkatalog",
      description: "Sida för att söka bland Lantmännen Lantbruks produkter",
      theme_color: "#1E6E37",
      display: "standalone",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable_icon-140x140.png",
          sizes: "140x140",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
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
