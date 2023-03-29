// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {
    // assets: "/<rootDir>/assets",
    // '@': resolve(__dirname, "/")
  },
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
});
