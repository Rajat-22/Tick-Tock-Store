<template>
  <div class="modal fade" tabindex="-1" :id="`productDetailModal-${product._id}`">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden modal-glass">
        
        <!-- Header -->
        <div class="modal-header border-0 bg-gradient-dark text-light py-3 px-4">
          <h5 class="modal-title fw-bold fs-4">
            <i class="bi bi-watch me-2 text-accent"></i> {{ product.name }}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-5 text-light">
          <div class="row g-5 align-items-center">
            
            <!-- Left: Image -->
            <div class="col-md-6 text-center position-relative">
              <div class="image-frame mx-auto">
                <img
                  :src="product.image || `https://placehold.co/600x400?text=Watch+Preview`"
                  class="img-fluid rounded-4 shadow-lg product-image"
                  alt="Product image"
                />
              </div>
            </div>

            <!-- Right: Info -->
            <div class="col-md-6">
              <!-- Category & Bestseller -->
              <div class="mb-3 d-flex flex-wrap gap-2">
                <span v-if="product.isBestSeller" class="badge badge-glow bg-warning text-dark px-3 py-2">
                  <i class="bi bi-star-fill me-1"></i> Bestseller
                </span>
                <span class="badge bg-accent text-dark px-3 py-2">
                  <i class="bi bi-tag-fill me-1"></i> {{ product.category }}
                </span>
              </div>

              <!-- Description -->
              <p class="lead text-light-50 mb-4">{{ product.description }}</p>

              <!-- Price -->
              <div class="h3 fw-bold mb-4">
                <span
                  class="me-2"
                  :class="{ 'text-decoration-line-through text-muted': product.salePrice }"
                >
                  ₹{{ product.price }}
                </span>
                <span v-if="product.salePrice" class="text-accent fw-bold">₹{{ product.salePrice }}</span>
              </div>

              <!-- Tags -->
              <div v-if="product.tags?.length" class="d-flex flex-wrap gap-2 mt-3">
                <span
                  v-for="(tag, index) in product.tags"
                  :key="index"
                  class="badge tag-badge text-light px-3 py-2"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="mt-5 d-flex flex-wrap gap-3">
                <button class="btn btn-buy px-5 py-2">
                  <i class="bi bi-cart2 me-2"></i>Buy Now
                </button>
                <a
                  href="mailto:rajatsharma221098@gmail.com"
                  class="btn btn-outline-light px-4 py-2"
                >
                  <i class="bi bi-envelope-fill me-2"></i>Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 bg-gradient-dark text-center justify-content-center py-3">
          <button type="button" class="btn btn-outline-light rounded-pill px-4" data-bs-dismiss="modal">
            <i class="bi bi-x-circle me-1"></i>Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    product: Object,
})

</script>

<style scoped>
/* === Theme Colors === */
/* :root {
  --color-primary: #0a192f;
  --color-secondary: #1e3c72;
  --color-accent: #fcb045;
} */

/* === Background & Glow === */
.modal-glass {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  color: #fff;
}

.bg-gradient-dark {
  background: linear-gradient(135deg, var(--color-primary), #152942);
}

.text-light-50 {
  color: rgba(255, 255, 255, 0.7);
}

/* === Image Frame === */
.image-frame {
  position: relative;
  border-radius: 1rem;
  padding: 10px;
  background: radial-gradient(circle at center, rgba(255,255,255,0.05), transparent);
}
.image-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.product-image {
  border-radius: 1rem;
  transition: transform 0.4s ease;
}
.product-image:hover {
  transform: scale(1.05);
}

/* === Badges === */
.badge-glow {
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.8);
}
.bg-accent {
  background: var(--color-accent) !important;
}
.tag-badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

/* === Buttons === */
.btn-buy {
  background: linear-gradient(90deg, var(--color-accent), #f9a826);
  color: #000;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
}
.btn-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(252, 176, 69, 0.4);
}

/* === Close Button === */
.btn-outline-light:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #000 !important;
}
</style>