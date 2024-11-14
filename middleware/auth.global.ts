import { useAuthStore } from "~/store";
export default defineNuxtRouteMiddleware((to) => {
  const { token } = useAuthStore();

  if (
    !!token.value &&
    (to.name == "auth-login" || to.name == "auth-register")
  ) {
    return navigateTo("/");
  }
  if (!token.value && to.name == "auth-logout") {
    return navigateTo("/");
  }
});
