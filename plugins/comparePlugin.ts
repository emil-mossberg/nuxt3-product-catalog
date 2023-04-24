import { useCompareStore } from "@/stores/CompareStore";

export default defineNuxtPlugin((nuxtApp) => {
  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {
    const { addProductsCompare } = useCompareStore();
    if (localStorage.getItem("compare-products")) {
      addProductsCompare(
        JSON.parse(localStorage.getItem("compare-products") ?? "")
      );
    }
  });
});
