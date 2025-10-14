<template>
     <div class="container py-5 my-3">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border rounded">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Create Account</h4>
            <form @submit.prevent="handleSignUp">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="form.name" type="text" class="form-control" id="name" required />
              </div>
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
                Create Account
              </button>
              <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Already have an account?
              <router-link :to="APP_ROUTE_NAMES.SIGN_IN">Login here</router-link>
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
    error.value = "Registration successful! Please login.";
  } catch (err) {
    error.value = err.message || "Registration failed";
    showError(err.message)
  } finally {
    isLoading.value = false;
  }
 }
</script>