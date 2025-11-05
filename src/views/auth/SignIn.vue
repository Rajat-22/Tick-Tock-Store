<template>
    <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Sign In</h4>
            <form @submit.prevent="handleSignIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" required />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
                <button :disabled="isLoading" type="submit" class="btn btn-success w-100">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                Sign In
              </button>
              <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Don't have an account?
              <router-link :to="APP_ROUTE_NAMES.SIGN_UP">Register here</router-link>
              
            </p>
          </div>
        </div>
      </div>
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