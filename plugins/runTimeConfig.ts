export default defineNuxtPlugin(() => {
  const { klevuKey} = useRuntimeConfig();
  console.log(klevuKey);
});
