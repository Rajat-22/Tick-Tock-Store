import { useAuthStore } from "@/store/authStore";

export function isAdmin() {
  const authStore = useAuthStore();
  // If user is admin, allow access
  if (authStore.isAdmin) return true;

  // Otherwise, redirect to Access Denied page
  return { name: "ACCESS_DENIED" };
}

export function isAuthenticated() {
  const authStore = useAuthStore();
  // If user is logged in, allow access
  if (authStore.isAuthenticated) return true;

  // Otherwise, redirect to Sign In page
  return { name: "SIGN_IN" };
}
