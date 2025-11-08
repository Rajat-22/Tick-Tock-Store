<template>
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <div class="watch-card card border-0 shadow-lg h-100 position-relative overflow-hidden rounded-4">
      <!-- Product Image -->
      <div class="position-relative overflow-hidden">
        <img
          :src="product.image || `https://placehold.co/600x400?text=Watch+Preview`"
          class="card-img-top object-fit-cover"
          style="height: 300px; transition: transform 0.4s ease;"
        />

        <!-- Bestseller Tag -->
        <div
          v-if="product.isBestSeller"
          class="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill fw-semibold text-dark"
          style="background: var(--color-accent); font-size: 0.8rem;"
        >
          <i class="bi bi-star-fill me-1"></i> Bestseller
        </div>

        <!-- Hover Overlay -->
        <div
          class="overlay d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100"
        >
          <button
            class="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow-sm"
            data-bs-toggle="modal"
            :data-bs-target="`#productDetailModal-${product._id}`"
          >
            <i class="bi bi-eye me-1"></i> View Details
          </button>
        </div>
      </div>

      <!-- Card Body -->
      <div class="card-body text-center p-4 bg-white bg-opacity-75 backdrop-blur-sm">
        <h5 class="fw-bold mb-2 text-dark">{{ product.name }}</h5>

        <!-- Price -->
        <div class="mb-3">
          <span
            class="fw-semibold fs-5 text-muted"
            :style="{ textDecoration: product.salePrice ? 'line-through' : 'none' }"
          >
            ₹{{ product.price }}
          </span>
          <span
            v-if="product.salePrice"
            class="fw-bold fs-5 ms-2"
            style="color: var(--color-accent)"
          >
            ₹{{ product.salePrice }}
          </span>
        </div>

        <!-- Category -->
        <div>
          <span
            class="badge rounded-pill text-light px-3 py-2"
            style="background: var(--color-primary);"
          >
            {{ product.category }}
          </span>
        </div>
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
})

// console.log(props.product)
</script>

<style scoped>
.watch-card {
  background: var(--color-light);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-radius: 1rem;
}
.watch-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}
.watch-card img:hover {
  transform: scale(1.08);
}
.overlay {
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.watch-card:hover .overlay {
  opacity: 1;
}

</style>