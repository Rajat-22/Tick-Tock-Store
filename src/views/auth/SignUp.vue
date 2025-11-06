<template>
  <div class="auth-overlay d-flex justify-content-center align-items-center">
    <div class="spotlight"></div>
    <div class="auth-card p-4 rounded-4 shadow-lg border-0">
      <div class="text-center mb-4">
        <i class="bi bi-watch text-accent fs-1"></i>
        <h4 class="fw-bold mt-2 text-light">Create Account</h4>
        <p class="text-secondary small">Join our premium watch collection</p>
      </div>

      <form @submit.prevent="handleSignUp">
        <div class="mb-3">
          <label for="name" class="form-label text-light">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="form-control bg-dark text-light border-0 rounded-3"
            placeholder="Enter your full name"
            required
          />
        </div>

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
            placeholder="Create a strong password"
            required
          />
        </div>

        <button
          :disabled="isLoading"
          type="submit"
          class="btn btn-gradient w-100 rounded-3 py-2 fw-semibold"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
          Create Account
        </button>

        <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
      </form>

      <p class="mt-4 text-center text-secondary small">
        Already have an account?
        <router-link :to="APP_ROUTE_NAMES.SIGN_IN" class="text-accent fw-semibold text-decoration-none">
          Login here
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
import { registerUser } from '@/apiEndpoints/apiEndpoints';
 
 const router = useRouter()
 const error = ref("");
 const form = reactive({
    name: "",
    email: "",
    password: ""
 })
 const isLoading = ref(false);
 const {showSuccess, showError} = alerts()

const handleSignUp = async() =>{
  isLoading.value = true;
  try {
    error.value = ''
    const data = await registerUser(form.name, form.email, form.password);
    showSuccess('Account created successfully')
    router.push({name:APP_ROUTE_NAMES.HOME})
    // error.value = "Registration successful! Please login.";
  } catch (err) {
    error.value = err.message || "Registration failed";
    showError(err.message)
  } finally {
    isLoading.value = false;
  }
 }
</script>

