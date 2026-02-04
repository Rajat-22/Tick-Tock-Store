<template>
  <div class="premium-hero">
    <div class="hero-content">
      <!-- Main watch showcase -->
      <div class="watch-showcase">
        <div class="watch-container">
          <!-- Outer ring with rotating effect -->
          <div class="outer-ring"></div>
          
          <!-- Main watch face -->
          <div class="watch-face">
            <!-- Inner details -->
            <div class="face-inner">
              <!-- Hour markers -->
              <div class="markers">
                <div v-for="i in 12" :key="i" class="marker" :style="{ transform: `rotate(${i * 30}deg)` }"></div>
              </div>
              
              <!-- Watch hands -->
              <div class="hands">
                <div class="hand hour"></div>
                <div class="hand minute"></div>
                <div class="hand second"></div>
                <div class="center-pin"></div>
              </div>
              
              <!-- Brand name -->
              <div class="brand">TICK-TOCK</div>
              
              <!-- Date display -->
              <div class="date-display">
                <div class="date-day"></div>
                <div class="date-month-year"></div>
              </div>
            </div>
          </div>
          
          <!-- Glow effect -->
          <div class="glow-effect"></div>
        </div>
      </div>
      
      <!-- Floating particles -->
      <div class="particles">
        <div v-for="i in 50" :key="i" class="particle" :style="{
          '--delay': `${i * 0.2}s`,
          '--duration': `${3 + Math.random() * 2}s`,
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`,
          '--size': `${2 + Math.random() * 3}px`
        }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let interval;

onMounted(() => {
  const hourHand = document.querySelector('.hand.hour');
  const minuteHand = document.querySelector('.hand.minute');
  const secondHand = document.querySelector('.hand.second');
  const dateDay = document.querySelector('.date-day');
  const dateMonthYear = document.querySelector('.date-month-year');
  
  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    if (hourHand) hourHand.style.transform = `rotate(${(hours * 30) + (minutes * 0.5)}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    
    // Update date
    if (dateDay) {
      dateDay.textContent = now.getDate();
    }
    if (dateMonthYear) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      dateMonthYear.textContent = `${month} ${year}`;
    }
  };
  
  updateClock();
  interval = setInterval(updateClock, 1000);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.premium-hero {
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Watch Showcase */
.watch-showcase {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  z-index: 2;
}

.watch-container {
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Outer rotating ring */
.outer-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #d4af37, transparent, #d4af37) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Main watch face */
.watch-face {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1d24 0%, #0d0f13 100%);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 40px rgba(0, 0, 0, 0.6),
    0 0 0 8px rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.face-inner {
  position: relative;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #1a1d24, #0a0c10);
  border: 2px solid rgba(212, 175, 55, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hour markers */
.markers {
  position: absolute;
  width: 100%;
  height: 100%;
}

.marker {
  position: absolute;
  width: 3px;
  height: 12px;
  background: linear-gradient(180deg, #d4af37, rgba(212, 175, 55, 0.5));
  top: 8%;
  left: 50%;
  margin-left: -1.5px;
  transform-origin: center 100px;
  border-radius: 2px;
}

.marker:nth-child(3n) {
  width: 4px;
  height: 16px;
  margin-left: -2px;
  background: linear-gradient(180deg, #d4af37, #f4e5b1);
}

/* Watch hands */
.hands {
  position: absolute;
  width: 100%;
  height: 100%;
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom center;
  border-radius: 10px;
  transition: transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.hand.hour {
  width: 5px;
  height: 50px;
  background: linear-gradient(180deg, #d4af37, rgba(212, 175, 55, 0.8));
  margin-left: -2.5px;
  z-index: 3;
}

.hand.minute {
  width: 4px;
  height: 70px;
  background: linear-gradient(180deg, #f4e5b1, rgba(244, 229, 177, 0.8));
  margin-left: -2px;
  z-index: 4;
}

.hand.second {
  width: 2px;
  height: 80px;
  background: linear-gradient(180deg, #ff6b6b, rgba(255, 107, 107, 0.6));
  margin-left: -1px;
  z-index: 5;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
}

.center-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #d4af37, #8b7000);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
}

/* Brand name */
.brand {
  position: absolute;
  top: 30%;
  font-family: 'Georgia', serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(90deg, #d4af37, #f4e5b1, #d4af37);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Date display */
.date-display {
  position: absolute;
  bottom: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background: rgba(13, 15, 19, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.5);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  backdrop-filter: blur(5px);
}

.date-day {
  font-family: 'Georgia', serif;
  font-size: 14px;
  font-weight: 700;
  color: #d4af37;
  line-height: 1;
}

.date-month-year {
  font-family: 'Georgia', serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #f4e5b1;
  line-height: 1;
}

/* Glow effect */
.glow-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent 70%);
  animation: pulse 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* Floating particles */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, #d4af37, rgba(212, 175, 55, 0.6));
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: particleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.8);
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  50% {
    transform: translate(calc(var(--x) * 0.3), -50px);
    opacity: 0.8;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .premium-hero {
    min-height: 400px;
  }
  
  .watch-container {
    width: 220px;
    height: 220px;
  }
  
  .watch-face {
    width: 190px;
    height: 190px;
  }
  
  .hand.hour {
    height: 40px;
  }
  
  .hand.minute {
    height: 55px;
  }
  
  .hand.second {
    height: 65px;
  }
}

@media (max-width: 576px) {
  .premium-hero {
    min-height: 350px;
  }
  
  .watch-showcase {
    gap: 2rem;
  }
  
  .watch-container {
    width: 180px;
    height: 180px;
  }
  
  .watch-face {
    width: 155px;
    height: 155px;
  }
  
  .brand {
    font-size: 11px;
    letter-spacing: 2px;
  }
}
</style>
