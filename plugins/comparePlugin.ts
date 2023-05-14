export default defineNuxtPlugin((nuxtApp) => {
  // Check with localStorage if compare products exist -  This is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {
    const { getProductsFromLocalStorage } = useCompareStore();
    getProductsFromLocalStorage();
  });
});
