import { KlevuConfig } from "@klevu/core";

export default defineNuxtPlugin((nuxtApp) => {
  if (!KlevuConfig.default) {
    // SE Klevu Test API

    // KlevuConfig.init({
    //   url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    //   apiKey: "klevu-164651914788114877",
    // });

    // SE Retailer staging API

    // KlevuConfig.init({
    //   url: "https://eucs24v2.ksearchnet.com/cs/v2/search",
    //   apiKey: "klevu-161400519083013248",
    // });

    // SE Retailer production

    KlevuConfig.init({
      url: "https://eucs25v2.ksearchnet.com/cs/v2/search",
      apiKey: "klevu-161709198811913248",
    });
  }

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {});
  // TO DO WHY DO I NEED THIS?

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {});
});
