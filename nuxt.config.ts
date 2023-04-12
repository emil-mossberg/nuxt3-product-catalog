// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/styles/main.less", "~/assets/styles/typography.less"],
  modules: ["@pinia/nuxt"],
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
    "~/components/uicomponents",
  ],

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      klevuURL: process.env.KLEVU_URL_AGRI_PROD,
      klevuKey: process.env.KLEVU_KEY_AGRI_PROD,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "se",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
