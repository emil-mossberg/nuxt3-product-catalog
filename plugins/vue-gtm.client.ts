import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.$router should thus be used in config?
  nuxtApp.vueApp.use(VueGtag, {
    config: {
      id: "G-9BEKX0CWF0",
    },
  });
});
