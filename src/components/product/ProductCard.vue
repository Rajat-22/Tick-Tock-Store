<template>
  <div class="col-6 col-md-4 col-lg-3 col-xl-3">
    <div
      class="watch-card card border-0 shadow-sm h-100 position-relative overflow-hidden rounded-4"
    >
      <!-- Product Image Section -->
      <div class="image-wrapper position-relative overflow-hidden">
        <img
          :src="product.image || `https://placehold.co/600x400?text=Watch+Preview`"
          class="card-img-top object-fit-cover"
          alt="Watch Image"
        />

        <!-- Bestseller Tag -->
        <div
          v-if="product.isBestSeller"
          class="badge-bestseller text-dark fw-semibold"
        >
          <i class="bi bi-star-fill me-1"></i> Bestseller
        </div>

        <!-- Hover Overlay -->
        <div class="overlay d-flex flex-column align-items-center justify-content-center">
          <button
            class="btn btn-accent rounded-pill px-4 py-2 fw-semibold shadow-sm mb-2"
            data-bs-toggle="modal"
            :data-bs-target="`#productDetailModal-${product._id}`"
          >
            <i class="bi bi-eye me-1"></i> View Details
          </button>
        </div>
      </div>

      <!-- Card Content -->
      <div class="card-body text-center p-4 bg-transparent backdrop-blur-sm">
        <h5 class="fw-bold mb-2 text-light text-uppercase">{{ product.name }}</h5>

        <!-- Price Section -->
        <div class="price mb-3">
          <span
            class="fw-semibold fs-6 text-muted"
            :class="{ 'text-decoration-line-through': product.salePrice }"
          >
            ₹{{ product.price }}
          </span>
          <span
            v-if="product.salePrice"
            class="fw-bold fs-5 ms-2 text-accent"
          >
            ₹{{ product.salePrice }}
          </span>
        </div>

        <!-- Category Badge -->
        <span class="badge-category">
          {{ product.category }}
        </span>
      </div>
    </div>

    <!-- Product Modal -->
    <ProductDetail :product="product" />
  </div>
</template>

<script setup>
import ProductDetail from './ProductDetail.vue';
const props = defineProps({
  product: Object,
});
</script>

<style scoped>
/* =====================
   WATCH CARD BASE
===================== */
.watch-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
  border-radius: 1rem;
}
.watch-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  border-color: var(--color-accent);
}

/* =====================
   IMAGE AREA
===================== */
.image-wrapper img {
  height: 240px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.3s ease;
}
.image-wrapper:hover img {
  transform: scale(1.08);
  filter: brightness(1.08);
}

/* =====================
   OVERLAY (Hover Button)
===================== */
.overlay {
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-wrapper:hover .overlay {
  opacity: 1;
}
.btn-accent {
  background: var(--color-accent);
  color: #000;
  font-size: 0.85rem;
  padding: 0.4rem 1.1rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}
.btn-accent:hover {
  background: #f7d96e;
}

/* =====================
   BADGES
===================== */
.badge-bestseller {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--color-accent);
  color: #111;
  padding: 4px 10px;
  font-size: 0.7rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.badge-category {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
}

/* =====================
   TEXT / PRICE
===================== */
.card-body {
  padding: 1rem 0.75rem;
}
.card-body h5 {
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}
.price {
  margin-bottom: 0.6rem;
}
.price .fs-6 {
  font-size: 0.9rem !important;
}
.price .fs-5 {
  font-size: 1rem !important;
}
.text-accent {
  color: var(--color-accent);
}

/* =====================
   MOBILE OPTIMIZATION
===================== */
@media (max-width: 576px) {
  .image-wrapper img {
    height: 180px;
  }

  .card-body {
    padding: 0.8rem;
  }

  .card-body h5 {
    font-size: 0.9rem;
  }

  .price span {
    font-size: 0.9rem !important;
  }

  .btn-accent {
    font-size: 0.75rem;
    padding: 0.35rem 0.9rem;
  }

  .badge-bestseller {
    font-size: 0.65rem;
    padding: 3px 8px;
  }

  .badge-category {
    font-size: 0.7rem;
    padding: 3px 9px;
  }
}

</style>
