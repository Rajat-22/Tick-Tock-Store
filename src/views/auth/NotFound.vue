<template>
  <div class="not-found-wrapper d-flex justify-content-center align-items-center">
    <!-- Animated background glows -->
    <div class="glow-orb glow-1"></div>
    <div class="glow-orb glow-2"></div>
    
    <div class="not-found-content text-center position-relative">
      <!-- Animated 404 with clock icon -->
      <div class="error-code-wrapper mb-4">
        <div class="clock-icon-bg position-relative">
          <i class="bi bi-clock-history text-accent"></i>
          <div class="clock-hand"></div>
        </div>
        <h1 class="error-code text-gradient fw-bold mb-0">404</h1>
      </div>

      <!-- Main heading -->
      <h2 class="fw-bold text-light mb-3">Time Stopped Here</h2>
      <p class="lead text-secondary mb-4 px-3">
        Looks like this page has wound down. The watch you're looking for doesn't exist in our collection.
      </p>

      <!-- Action buttons -->
      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
        <router-link 
          :to="{ name: APP_ROUTE_NAMES.HOME }" 
          class="btn btn-accent rounded-pill px-4 py-2 fw-semibold shadow-lg"
        >
          <i class="bi bi-house-door me-2"></i>
          Back to Home
        </router-link>
        <router-link 
          :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }" 
          class="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold"
        >
          <i class="bi bi-watch me-2"></i>
          Browse Watches
        </router-link>
      </div>

      <!-- Decorative elements -->
      <div class="decorative-dots mt-5">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routerName';
</script>

<style scoped>
/* =====================
   MAIN WRAPPER
===================== */
.not-found-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at 30% 50%, #060b18, #1b2a4e 60%, #0a0f23 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
}

/* =====================
   ANIMATED GLOWS
===================== */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  z-index: 0;
  animation: floatGlow 8s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--color-accent), transparent);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.glow-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--color-primary), transparent);
  bottom: 15%;
  right: 15%;
  animation-delay: 2s;
}

@keyframes floatGlow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.5;
  }
}

/* =====================
   CONTENT CONTAINER
===================== */
.not-found-content {
  z-index: 2;
  max-width: 600px;
  animation: fadeInUp 1s ease;
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

/* =====================
   404 ERROR CODE
===================== */
.error-code-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.clock-icon-bg {
  width: 120px;
  height: 120px;
  background: rgba(252, 176, 69, 0.1);
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse 3s ease-in-out infinite;
}

.clock-icon-bg i {
  font-size: 3.5rem;
  animation: tickTock 2s ease-in-out infinite;
}

.clock-hand {
  position: absolute;
  width: 2px;
  height: 35px;
  background: var(--color-accent);
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(0deg);
  animation: rotateHand 4s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(252, 176, 69, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px rgba(252, 176, 69, 0.6);
    transform: scale(1.05);
  }
}

@keyframes tickTock {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

@keyframes rotateHand {
  0% {
    transform: translate(-50%, -100%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -100%) rotate(360deg);
  }
}

.error-code {
  font-size: 6rem;
  line-height: 1;
  letter-spacing: 0.1em;
  text-shadow: 0 0 30px rgba(252, 176, 69, 0.5);
}

.text-gradient {
  background: linear-gradient(135deg, var(--color-accent), #fff, var(--color-accent));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* =====================
   BUTTONS
===================== */
.btn-accent {
  background: var(--color-accent);
  color: #000;
  border: none;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-accent:hover {
  background: #ffc86b;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(252, 176, 69, 0.4);
  color: #000;
}

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  background: transparent;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  transform: translateY(-3px);
  color: #fff;
}

/* =====================
   DECORATIVE DOTS
===================== */
.decorative-dots {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  opacity: 0.6;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.3s;
}
.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* =====================
   RESPONSIVE DESIGN
===================== */
@media (max-width: 768px) {
  .error-code {
    font-size: 4.5rem;
  }

  .clock-icon-bg {
    width: 100px;
    height: 100px;
  }

  .clock-icon-bg i {
    font-size: 3rem;
  }

  .not-found-content h2 {
    font-size: 1.5rem;
  }

  .not-found-content p {
    font-size: 1rem;
  }

  .glow-1, .glow-2 {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 576px) {
  .error-code {
    font-size: 3.5rem;
  }

  .clock-icon-bg {
    width: 80px;
    height: 80px;
  }

  .clock-icon-bg i {
    font-size: 2.5rem;
  }

  .clock-hand {
    height: 28px;
  }

  .btn-accent, .btn-outline-light {
    width: 100%;
    max-width: 300px;
  }
}
</style>