<template>
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
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
/* Card container */
.watch-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.5s ease;
}
.watch-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  border-color: var(--color-accent);
}

/* Image styling */
.image-wrapper img {
  height: 300px;
  width: 100%;
  transition: transform 0.5s ease, filter 0.4s ease;
}
.image-wrapper:hover img {
  transform: scale(1.1);
  filter: brightness(1.1);
}

/* Overlay */
.overlay {
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  transition: opacity 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image-wrapper:hover .overlay {
  opacity: 1;
}

/* Bestseller badge */
.badge-bestseller {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--color-accent);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* Buttons */
.btn-accent {
  background: var(--color-accent);
  color: #000;
  transition: all 0.3s ease;
}
.btn-accent:hover {
  background: #ffda6a;
  color: #000;
}
.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Price */
.price .text-accent {
  color: var(--color-accent) !important;
}

/* Category badge */
.badge-category {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 50px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

/* Text */
.text-accent {
  color: var(--color-accent);
}
</style>
