<template>
  <div class="app-wrapper d-flex flex-column min-vh-100">
    <!-- Header -->
    <Header />

    <!-- Main Content Area -->
    <main class="flex-grow-1">
  <div class="container py-4">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>

<style scoped>
/* 🌈 Use gradient background defined in global theme */
.app-wrapper {
  background: linear-gradient(135deg, var(--color-light) 0%, #f1f3f5 50%, #e9ecef 100%);
  color: var(--color-dark);
  font-family: var(--font-base);
  transition: var(--transition-default);
}

/* ✨ Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 🖥️ Adjust padding on smaller screens using global mixins logic */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
