<template>
      <div>
    <div
      class="w-100 position-relative overflow-hidden mb-4 py-2 d-flex align-items-center"
      style="
        background-image: url('');
        background-size: cover;
        background-position: center;
        min-height: 320px;
      "
    >
      <div
        class="position-absolute top-0 start-0 w-100 h-100 opacity-50"
      ></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 fw-bold text-white mb-4">
              Timeless Style, Perfectly Crafted.
               </h1>
              <!-- <br class="d-none d-lg-block" /> -->
              <h4 class="display-8 text-light fst-italic">
              "Discover watches that blend elegance, precision, and durability. From classic designs to modern smartwatches — find your perfect timepiece today." 
              </h4>
            <div
              class="input-group mt-3 mx-auto shadow-lg rounded-4"
              style="max-width: 700px"
            >
              <input v-model="searchValue"
                type="text"
                class="form-control border-0 py-3 px-4 fs-5"
                placeholder="Search your favorite watch..."
              />
            </div>
          </div>
        </div>
      </div>
       <video autoplay muted loop playsinline class="bg-video">
    <source src="/src/assets//vecteezy_time-lapse-of-clock-time-passing_34635599.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
    </div>

    <div id="product-list" class="container-lg">
      <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-auto">
          <div class="d-flex flex-wrap gap-3">
            <button @click="selectedCategory = category"
            v-for="(category, index) in categoryList" :key="index"
             class="btn px-4 py-2"
             :class="{
                'btn-primary text-white': category === selectedCategory,
                'btn-outline-primary': category !== selectedCategory
             }"
             >{{ category }}</button>
          </div>
        </div>
        <div class="col-md-auto ms-md-auto">
          <div class="dropdown">
            <button
              class="btn btn-outline-info d-flex align-items-center gap-2 px-4 py-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down"></i>
              <span class="text-capitalize">{{ sortOption }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li v-for="(sort, index) in SORT_OPTIONS" :key="index">
                <button @click="sortOption = sort"
                  class="dropdown-item py-2 d-flex align-items-center gap-2"
                >
                  <i class="bi"></i>
                  <span class="text-capitalize"> {{ sort }} </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div v-if="filteredProductList.length > 0" class="row g-4 pb-4">
            <ProductCard v-for="product in filteredProductList" :key="product.id" :product="product"></ProductCard>
        </div>
        <div v-else> No product found!</div>
      </div>
    </div>
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
#product-list {
   /* background: linear-gradient(135deg, #d4fc79, #96e6a1);  */
}

.bg-video {
  position: absolute;
  top: 0;
  left: 50;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* ensures video covers area */
  z-index: -1;        /* sends video behind content */
}
</style>