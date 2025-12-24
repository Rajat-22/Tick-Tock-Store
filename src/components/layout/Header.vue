<template>
  <nav
    ref="navbarRef"
    class="navbar navbar-expand-lg premium-navbar fixed-top"
    :class="{ scrolled: isScrolled }"
  >
    <div class="container">
      <router-link :to="{ name: APP_ROUTE_NAMES.HOME }" class="navbar-brand d-flex align-items-center">
        <img
          src="@/assets/tick-tock.jpg"
          alt="TickTock Store"
          class="logo-img me-2"
          :class="{ 'logo-shrink': isScrolled }"
        />
      </router-link>

      <button
        class="navbar-toggler border-0 custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item mx-2">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.HOME }">Home</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }">Products</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.CONTACT_US }">Contact</router-link>
          </li>

          <!-- <li class="nav-item dropdown mx-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-laptop"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <button @click="themeStore.setTheme('light')" class="dropdown-item">
                  <i class="bi bi-sun"></i> Light
                </button>
              </li>
              <li>
                <button @click="themeStore.setTheme('dark')" class="dropdown-item">
                  <i class="bi bi-moon-stars-fill"></i> Dark
                </button>
              </li>
            </ul>
          </li> -->

          <li class="nav-item mx-2" v-if="!authStore.isAuthenticated">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.SIGN_IN }">Sign In</router-link>
          </li>
          <li class="nav-item mx-2" v-if="!authStore.isAuthenticated">
            <router-link
              class="nav-link"
              :to="{ name: APP_ROUTE_NAMES.SIGN_UP }"
            >
              Sign Up
            </router-link>
          </li>
          <li class="nav-item mx-2" v-if="authStore.isAuthenticated">
            <button
              class="btn btn-outline-danger rounded-pill px-3 py-1"
              @click="[authStore.signOutUser(), router.push({ name: APP_ROUTE_NAMES.HOME })]"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { APP_ROUTE_NAMES } from '@/constants/routerName';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()

const isScrolled = ref(false)
const navbarRef = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style scoped>
/* 🌟 Frosted Glass Navbar */
.premium-navbar {
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(15px);
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  z-index: 1030;
}

/* On scroll — shrink & darken */
.premium-navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  padding: 0.4rem 0;
}

/* Logo */
.logo-img {
  width: 120px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Shrinked logo */
.logo-shrink {
  width: 90px;
  height: 38px;
}

/* Nav links */
.nav-link {
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}
.nav-link:hover {
  color: var(--bs-primary);
  transform: translateY(-2px);
}
.router-link-active {
  color: var(--bs-primary) !important;
}

/* Toggler icon */
.custom-toggler i {
  font-size: 1.8rem;
  color: #0d6efd;
  transition: transform 0.2s ease, color 0.2s ease;
}
.custom-toggler:hover i {
  color: #0a58ca;
  transform: rotate(90deg);
}
[data-bs-theme="dark"] .custom-toggler i {
  color: #f8f9fa;
}

/* Dark theme navbar */
[data-bs-theme="dark"] .premium-navbar {
  background-color: rgba(33, 37, 41, 0.6);
  backdrop-filter: blur(15px);
}

/* Dropdown */
.dropdown-menu {
  border-radius: 12px;
}

/* Mobile spacing */
@media (max-width: 992px) {
  .nav-item {
    margin: 8px 0;
  }
}
</style>