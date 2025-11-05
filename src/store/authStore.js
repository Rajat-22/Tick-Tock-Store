import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("authStore", () => {
  const token = ref(localStorage.getItem("token") || "");

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  };

// ✅ Decode token reactively into a user object
  const user = computed(() => {
    if (!token.value) return null;
    return decodeToken(token.value);
  });

  const isAuthenticated = computed(() => !!token.value);

  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  };

  const signOutUser = () => {
    token.value = "";
    localStorage.removeItem("token");
  };

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    setToken,
    signOutUser,
  };
});

