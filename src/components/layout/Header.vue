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

          <li class="nav-item dropdown mx-2">
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
          </li>

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

