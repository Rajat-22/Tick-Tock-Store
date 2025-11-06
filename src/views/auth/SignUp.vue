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

<style scoped>
.btn-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  transition: all 0.3s ease;
}
.btn-gradient:hover {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  transform: translateY(-2px);
}

.text-accent {
  color: var(--color-accent);
}


.auth-overlay {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: radial-gradient(circle at 30% 50%, #060b18, #1b2a4e 60%, #0a0f23 100%);
  position: relative;
  overflow: hidden;
}

/* --- Layer 1: moving gold-blue gradient flow --- */
.auth-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    rgba(252, 176, 69, 0.15),
    rgba(46, 94, 255, 0.2),
    rgba(252, 176, 69, 0.15)
  );
  background-size: 200% 200%;
  animation: gradientShift 10s ease-in-out infinite alternate;
  opacity: 0.6;
  mix-blend-mode: screen;
  z-index: 0;
}

/* --- Layer 2: rotating shimmer sweep --- */
.auth-overlay::after {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: conic-gradient(
    from 0deg,
    rgba(252, 176, 69, 0.2),
    rgba(46, 94, 255, 0.15),
    rgba(255, 255, 255, 0.08),
    rgba(252, 176, 69, 0.25),
    rgba(46, 94, 255, 0.1)
  );
  animation: rotateGlow 25s linear infinite;
  opacity: 0.5;
  mix-blend-mode: lighten;
  z-index: 0;
}

/* --- Layer 3: moving spotlight --- */
.auth-overlay::marker {
  content: none; /* remove default marker behavior */
}
.auth-overlay::part(spotlight) {
  display: none;
}
.auth-overlay .spotlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.08), transparent 50%);
  mix-blend-mode: overlay;
  animation: moveSpot 12s ease-in-out infinite alternate;
  z-index: 0;
}

/* --- Popup card --- */
.auth-card {
  width: 100%;
  max-width: 400px;
  background: rgba(18, 26, 46, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.9s ease;
}

/* --- Animations --- */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes rotateGlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveSpot {
  0% {
    --x: 20%;
    --y: 30%;
  }
  50% {
    --x: 80%;
    --y: 60%;
  }
  100% {
    --x: 50%;
    --y: 40%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Mobile optimization --- */
@media (max-width: 576px) {
  .auth-overlay {
    padding: 3rem 1rem;
    background: radial-gradient(circle at 50% 40%, #0b1121, #1e3c72 70%, #0a0f23 100%);
  }
  .auth-card {
    background: rgba(15, 22, 40, 0.95);
    backdrop-filter: blur(10px);
  }
}
</style>