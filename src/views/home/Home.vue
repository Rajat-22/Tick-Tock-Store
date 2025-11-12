<template>
  <div class="home-page">
    <!-- 🌟 HERO SECTION (Compact, Elegant) -->
   <section class="hero container-fluid py-5 px-3 px-md-5">
  <div class="row align-items-center g-4 flex-column-reverse flex-lg-row text-center text-lg-start">
    <!-- 🎥 Video Section (hidden on xs, visible on md+) -->
    <div class="col-lg-6 position-relative mb-4 mb-lg-0 d-flex justify-content-center d-none d-md-block">
      <div class="video-wrapper rounded-4 overflow-hidden shadow-lg w-100" style="max-width: 480px;">
        <video autoplay muted loop playsinline class="w-100">
          <source src="/src/assets/vecteezy_time-lapse-of-clock-time-passing_34635599.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="video-overlay"></div>
      </div>
    </div>

    <!-- 🕰️ Text Section -->
    <div class="col-lg-6">
      <h1 class="fw-bold display-6 display-md-5 mb-3 text-gradient">
        Timeless Style. <br class="d-md-none"/>Modern Precision.
      </h1>
      <p class="lead text-light opacity-75 mb-4 px-2 px-md-0">
        Explore our exclusive collection of luxury watches — where every second tells a story of craftsmanship and elegance.
      </p>

      <div class="search-bar input-group shadow rounded-pill overflow-hidden mx-auto mx-lg-0" style="max-width: 500px;">
        <span class="input-group-text bg-transparent border-0 ps-3 text-accent">
          <i class="bi bi-search fs-5"></i>
        </span>
        <input
          v-model="searchValue"
          type="text"
          class="form-control border-0 py-3 bg-transparent text-light fs-6"
          placeholder="Search your favorite watch..."
        />
      </div>
    </div>
  </div>
</section>


    <!-- 🕰️ PRODUCT COLLECTION -->
    <section id="product-list" class="container-lg py-5">
      <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <h2 class="display-6 fw-bold text-light mb-3 mb-md-0">Discover Our Collection</h2>

        <div class="d-flex flex-wrap align-items-center gap-3">
          <!-- Category Buttons -->
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="(category, i) in categoryList"
              :key="i"
              @click="selectedCategory = category"
              class="btn category-btn fw-semibold px-3 py-2 rounded-pill"
              :class="{ active: selectedCategory === category }"
            >
              {{ category }}
            </button>
          </div>

          <!-- Sort Dropdown -->
          <div class="dropdown">
            <button
              class="btn sort-btn px-3 py-2 rounded-pill d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down-alt"></i>
              <span class="text-capitalize">{{ sortOption }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow">
              <li v-for="(sort, index) in SORT_OPTIONS" :key="index">
                <button
                  class="dropdown-item py-2 text-capitalize"
                  @click="sortOption = sort"
                >
                  {{ sort }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Product List -->
      <div v-if="filteredProductList.length > 0" class="row g-4">
        <ProductCard
          v-for="product in filteredProductList"
          :key="product.id"
          :product="product"
        />
      </div>
     <div v-else class="text-center py-5 my-5">
  <div class="d-flex justify-content-center align-items-center flex-column">
    <div class="spinner-border text-accent mb-3" style="width: 3rem; height: 3rem;" role="status"></div>
    <h6 class="text-light-50 fw-semibold">Loading products...</h6>
  </div>
</div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import  productService  from '../../services/productService'
import { getProducts } from '@/apiEndpoints/apiEndpoints'
import ProductCard from '@/components/product/ProductCard.vue';
import { PRODUCT_CATEGORIES, SORT_NAME_A_Z, SORT_NAME_Z_A, SORT_OPTIONS, SORT_PRICE_HIGH_LOW, SORT_PRICE_LOW_HIGH } from '@/constants/productConstant';


const products = ref([])
const loading = ref(false)
const selectedCategory = ref("ALL")
const categoryList = ref(["ALL", ...PRODUCT_CATEGORIES])
const searchValue = ref('')
const sortOption = ref(SORT_OPTIONS[0])

onMounted(() =>{
fetchProducts()
})

const fetchProducts = async() => {
   try{
    loading.value = true
        products.value = await getProducts()
        // console.log('product',products.value)
   }catch(err){
   console.log(err)
   }
   finally{
    loading.value = false
   }
}

const filteredProductList = computed(() =>{
    let tempArray = selectedCategory.value === 'ALL' ? [...products.value] 
                   : products.value.filter((item) => item.category.toUpperCase() === selectedCategory.value.toUpperCase())

    
    if(searchValue.value){
        tempArray = tempArray.filter((item) =>{
           return item.name.toUpperCase().includes(searchValue.value.toUpperCase())
        })
    }

    if(sortOption.value === SORT_NAME_A_Z){
        tempArray.sort((a,b) => a.name.localeCompare(b.name))
    }
    if(sortOption.value === SORT_NAME_Z_A){
        tempArray.sort((a,b) => b.name.localeCompare(a.name))
    }
    if(sortOption.value === SORT_PRICE_HIGH_LOW){
        tempArray.sort((a,b) => b.price - a.price)
    }
    if(sortOption.value === SORT_PRICE_LOW_HIGH){
        tempArray.sort((a,b) => a.price - b.price)
    }
    
    return tempArray
})
</script>

<style scoped>
.home-page {
  background: linear-gradient(180deg, #0e1116, #161a21);
  color: var(--text-light);
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #0e1116, #161a21);
}
.text-gradient {
  background: linear-gradient(90deg, var(--color-accent), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.video-wrapper {
  position: relative;
  border: 2px solid rgba(212, 175, 55, 0.3);
  transition: transform 0.4s ease;
}
.video-wrapper:hover {
  transform: scale(1.03);
}
.video-overlay {
  position: absolute;
  inset: 0;
 background: rgba(0, 0, 0, 0.25);
}

/* SEARCH BAR */
.search-bar {
  max-width: 500px;
}
.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.input-group-text i {
  color: var(--color-accent);
}
.search-bar:focus-within {
  box-shadow: 0 0 10px var(--color-accent);
}

/* CATEGORY BUTTONS */
.category-btn {
  background: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  transition: all 0.3s ease;
}
.category-btn.active,
.category-btn:hover {
  background: var(--color-accent);
  color: #000;
}

/* SORT BUTTON */
.sort-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.sort-btn:hover {
  background: var(--color-accent);
  color: #000;
}
.text-light-50 {
  color: rgba(255, 255, 255, 0.6);
}

.text-accent {
  color: var(--color-accent) !important;
}

.spinner-border {
  animation-duration: 1s;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .hero {
    text-align: center;
  }
  .video-wrapper {
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.9rem;
    line-height: 1.3;
  }

  .hero p {
    font-size: 1rem;
  }

  .search-bar input {
    font-size: 0.95rem;
    padding: 0.8rem 1rem;
  }
}
</style>