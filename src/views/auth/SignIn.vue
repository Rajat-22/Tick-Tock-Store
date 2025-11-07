<template>
  <div class="auth-overlay d-flex justify-content-center align-items-center">
    <div class="spotlight"></div>

    <div class="auth-card p-4 rounded-4 shadow-lg border-0 position-relative">
      <div class="text-center mb-4">
        <i class="bi bi-watch text-accent fs-1"></i>
        <h4 class="fw-bold mt-2 text-light">Welcome Back</h4>
      <p class="text-secondary small mb-4">Access your exclusive watch collection.</p>
      </div>

      <form @submit.prevent="handleSignIn">
        <div class="mb-3">
          <label for="email" class="form-label text-light">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="form-control bg-dark text-light border-0 rounded-3"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label text-light">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="form-control bg-dark text-light border-0 rounded-3"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          :disabled="isLoading"
          type="submit"
          class="btn btn-gradient w-100 rounded-3 py-2 fw-semibold"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
          Sign In
        </button>

        <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
      </form>

      <p class="mt-4 text-center text-secondary small">
        Don’t have an account?
        <router-link
          :to="APP_ROUTE_NAMES.SIGN_UP"
          class="text-accent fw-semibold text-decoration-none"
        >
          Register here
        </router-link>
      </p>
    </div>
  </div>
</template>

 <script setup>
 import { ref, reactive } from 'vue';
 import { useRouter } from 'vue-router';
 import { alerts } from '@/utility/alert';
import { APP_ROUTE_NAMES } from '@/constants/routerName';
import { loginUser } from '@/apiEndpoints/apiEndpoints';
import { useAuthStore } from "@/store/authStore";

const router = useRouter()
 const error = ref("");
 const form = reactive({
    email: "",
    password: ""
 })
 const authStore = useAuthStore();
const isLoading = ref(false);
const {showSuccess, showError} = alerts()

const handleSignIn = async() =>{
  isLoading.value = true;
  try {
    error.value = ''
   const data = await loginUser(form.email, form.password);
    // localStorage.setItem("token", data.token); // save token for auth
    error.value = "Login successful!";
    router.push({name:APP_ROUTE_NAMES.HOME})
    
  } catch (err) {
    error.value = err.message
    showError(err.message)
  } finally {
    isLoading.value = false; // stop loading
  }
 }
</script>

