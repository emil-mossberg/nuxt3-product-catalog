import { useAppInfoStore } from "@/stores/AppInfoStore";

export default defineNuxtRouteMiddleware(() => {
  const { removeMessageAll } = useAppInfoStore();
  removeMessageAll();
});
