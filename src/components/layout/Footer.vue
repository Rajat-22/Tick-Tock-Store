<template>
  <footer class="footer text-light py-4 mt-5 position-relative overflow-hidden">
    <!-- Gentle animated glow -->
    <div class="footer-glow"></div>

    <div class="container position-relative text-center">
      <h5 class="fw-bold mb-1 text-accent d-flex align-items-center justify-content-center">
        <i class="bi bi-watch me-2 fs-5"></i> Tick-Tock Store
      </h5>
      <p class="text-muted fst-italic small mb-2">
        “Keeping You On Time, Every Time.”
      </p>

      <hr class="border-secondary my-3" />

      <div class="small text-muted">
        &copy; {{ new Date().getFullYear() }}
        <span class="text-accent fw-semibold">Tick-Tock Store</span> — All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #0e1116 0%, #141820 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

/* Compact glow */
.footer-glow {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%);
  filter: blur(40px);
  z-index: 0;
  animation: glowPulse 7s ease-in-out infinite;
  pointer-events: none;
}

/* Gentle pulse */
@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1.1);
  }
}

/* Accent + divider styling */
.text-accent {
  color: var(--color-accent, #d4af37);
}

hr {
  opacity: 0.1;
  border-color: rgba(255, 255, 255, 0.08);
}

/* Responsive fine-tuning */
@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 0;
  }
  .footer h5 {
    font-size: 1.1rem;
  }
  .footer p {
    font-size: 0.85rem;
  }
  .footer-glow {
    width: 140px;
    height: 140px;
    top: -30px;
  }
}
</style>
