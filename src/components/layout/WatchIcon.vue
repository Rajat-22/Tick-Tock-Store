<template>
  <div class="watch-icon-wrapper" :class="{ shrink: isScrolled }">
    <svg 
      class="watch-svg" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Outer Ring (Gold) -->
      <circle 
        cx="100" 
        cy="100" 
        r="85" 
        fill="none" 
        stroke="url(#goldGradient)" 
        stroke-width="4"
        class="outer-ring"
      />
      
      <!-- Inner Ring -->
      <circle 
        cx="100" 
        cy="100" 
        r="75" 
        fill="url(#dialGradient)" 
        stroke="#d4af37" 
        stroke-width="2"
      />
      
      <!-- Hour Markers -->
      <g class="hour-markers">
        <line x1="100" y1="30" x2="100" y2="40" stroke="#d4af37" stroke-width="3" />
        <line x1="170" y1="100" x2="160" y2="100" stroke="#d4af37" stroke-width="3" />
        <line x1="100" y1="170" x2="100" y2="160" stroke="#d4af37" stroke-width="3" />
        <line x1="30" y1="100" x2="40" y2="100" stroke="#d4af37" stroke-width="3" />
      </g>
      
      <!-- Watch Center -->
      <circle 
        cx="100" 
        cy="100" 
        r="8" 
        fill="#d4af37"
        class="center-dot"
      />
      
      <!-- Hour Hand -->
      <line 
        x1="100" 
        y1="100" 
        x2="100" 
        y2="55" 
        stroke="#1e3c72" 
        stroke-width="4" 
        stroke-linecap="round"
        class="hour-hand"
      />
      
      <!-- Minute Hand -->
      <line 
        x1="100" 
        y1="100" 
        x2="100" 
        y2="45" 
        stroke="#2a5298" 
        stroke-width="3" 
        stroke-linecap="round"
        class="minute-hand"
      />
      
      <!-- Second Hand -->
      <line 
        x1="100" 
        y1="100" 
        x2="100" 
        y2="35" 
        stroke="#fcb045" 
        stroke-width="2" 
        stroke-linecap="round"
        class="second-hand"
      />
      
      <!-- Gradient Definitions -->
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fcb045;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#d4af37;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fcb045;stop-opacity:1" />
        </linearGradient>
        
        <radialGradient id="dialGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:#f8f9fa;stop-opacity:0.9" />
        </radialGradient>
      </defs>
    </svg>
    
    <!-- Brand Text -->
    <div class="brand-text">
      <span class="brand-name">TICK-TOCK</span>
      <span class="brand-tagline">LUXURY WATCHES</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.watch-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.4s ease;
}

.watch-icon-wrapper.shrink .watch-svg {
  width: 45px;
  height: 45px;
}

.watch-icon-wrapper.shrink .brand-name {
  font-size: 1.1rem;
}

.watch-icon-wrapper.shrink .brand-tagline {
  font-size: 0.5rem;
}

.watch-svg {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
  transition: all 0.4s ease;
}

.watch-svg:hover {
  filter: drop-shadow(0 6px 12px rgba(252, 176, 69, 0.5));
  transform: scale(1.05);
}

.outer-ring {
  animation: rotateRing 20s linear infinite;
  transform-origin: center;
}

@keyframes rotateRing {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.center-dot {
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% {
    r: 8;
    opacity: 1;
  }
  50% {
    r: 10;
    opacity: 0.8;
  }
}

.hour-hand {
  animation: rotateHour 43200s linear infinite;
  transform-origin: 100px 100px;
}

@keyframes rotateHour {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.minute-hand {
  animation: rotateMinute 3600s linear infinite;
  transform-origin: 100px 100px;
}

@keyframes rotateMinute {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.second-hand {
  animation: rotateTick 60s steps(60) infinite;
  transform-origin: 100px 100px;
}

@keyframes rotateTick {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hour-markers line {
  filter: drop-shadow(0 0 2px rgba(212, 175, 55, 0.5));
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.brand-name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
  transition: all 0.4s ease;
}

.brand-tagline {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  opacity: 0.8;
  transition: all 0.4s ease;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

[data-bs-theme="dark"] .brand-name {
  background: linear-gradient(135deg, #fff 0%, var(--color-accent) 50%, #fff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-bs-theme="dark"] .brand-tagline {
  color: var(--color-accent);
}

/* Responsive */
@media (max-width: 768px) {
  .watch-icon-wrapper {
    gap: 0.6rem;
  }
  
  .watch-svg {
    width: 50px;
    height: 50px;
  }
  
  .brand-name {
    font-size: 1.2rem;
  }
  
  .brand-tagline {
    font-size: 0.5rem;
  }
}

@media (max-width: 576px) {
  .brand-tagline {
    display: none;
  }
}
</style>
