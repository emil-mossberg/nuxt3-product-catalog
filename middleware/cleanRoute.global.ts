export default defineNuxtRouteMiddleware(() => {
  const { removeMessageAll } = useAppInfoStore();
  removeMessageAll();
});
