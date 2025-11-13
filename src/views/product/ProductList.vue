<template>
  <div class="container py-4">
    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-border text-accent" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Product Table -->
    <div v-else class="admin-products-wrapper p-4 rounded-4 shadow-sm">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 class="fw-bold text-gradient mb-1">Product Management</h2>
          <p class="text-muted small mb-0">View, edit or remove your watch listings</p>
        </div>
        <router-link
          :to="APP_ROUTE_NAMES.PRODUCT_CREATE"
          class="btn btn-accent d-flex align-items-center gap-2 rounded-pill px-4 py-2"
        >
          <i class="bi bi-plus-circle"></i>
          <span>Add Product</span>
        </router-link>
      </div>

      <!-- Search -->
      <div class="mb-3">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control form-control-sm rounded-pill px-3 shadow-sm"
          placeholder="🔍 Search products..."
        />
      </div>

      <!-- Table -->
      <div class="table-responsive rounded-3 shadow-sm bg-white">
        <table class="table align-middle table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th @click="sortBy('name')" class="sortable">
                Product <i class="bi" :class="getSortIcon('name')"></i>
              </th>
              <th @click="sortBy('category')" class="sortable">
                Category <i class="bi" :class="getSortIcon('category')"></i>
              </th>
              <th @click="sortBy('price')" class="sortable">
                Price <i class="bi" :class="getSortIcon('price')"></i>
              </th>
              <th>Tags</th>
              <th>Bestseller</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedProducts" :key="product._id">
              <td>
                <div class="d-flex align-items-center">
                  <img
                    :src="product.image || 'https://placehold.co/60x60'"
                    alt="Product"
                    class="rounded me-2 object-fit-cover"
                    style="width: 50px; height: 50px;"
                  />
                  <div>
                    <div class="fw-semibold small">{{ product.name }}</div>
                    <small class="text-muted d-block text-truncate" style="max-width: 200px;">
                      {{ product.description }}
                    </small>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge bg-light text-secondary border small">
                  {{ product.category }}
                </span>
              </td>
              <td>
                <span class="text-danger text-decoration-line-through small ms-1">₹{{ product.price }}</span>
                <span
                  v-if="product.salePrice"
                  class="fw-semibold"
                >
                  ₹{{ product.salePrice }}
                </span>
              </td>
              <td>
                <div class="d-flex flex-wrap gap-1">
                  <span
                    v-for="tag in product.tags"
                    :key="tag"
                    class="badge bg-accent bg-opacity-10 small"
                  >
                    {{ tag }}
                  </span>
                </div>
              </td>
              <td>
                <span
                  v-if="product.isBestSeller"
                  class="badge bg-warning text-dark small"
                >
                  Bestseller
                </span>
                <span v-else class="text-muted">---</span>
              </td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-primary rounded-pill me-2"
                  @click="router.push({ name: APP_ROUTE_NAMES.PRODUCT_UPDATE, params: { id: product._id } })"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger rounded-pill"
                  @click="handleProductDelete(product._id)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
     <nav aria-label="Product pagination" class="mt-4">
  <ul class="pagination justify-content-center align-items-center flex-wrap gap-2 mb-0">
    <!-- Previous Button -->
    <li class="page-item" :class="{ disabled: currentPage === 1 }">
      <button 
        class="page-link px-3 py-2 rounded-pill border-0 shadow-sm fw-semibold d-flex align-items-center"
        @click="prevPage"
        style="background: var(--color-dark); color: var(--color-light); transition: all 0.3s ease;"
        @mouseover="(e) => e.target.style.opacity = '0.9'"
        @mouseleave="(e) => e.target.style.opacity = '1'"
      >
        <i class="bi bi-chevron-left me-1"></i> Prev
      </button>
    </li>

    <!-- Page Numbers -->
    <li
      v-for="page in totalPages"
      :key="page"
      class="page-item"
      :class="{ active: page === currentPage }"
    >
      <button
        class="page-link border-0 rounded-circle fw-semibold shadow-sm"
        :style="page === currentPage
          ? 'background: var(--color-accent); color: white; box-shadow: 0 0 10px rgba(252,176,69,0.4);'
          : 'background: #f8f9fa; color: #333; transition: all 0.3s ease;'"
        @click="goToPage(page)"
        @mouseover="(e) => e.target.style.background = page !== currentPage ? '#e9ecef' : e.target.style.background"
      >
        {{ page }}
      </button>
    </li>

    <!-- Next Button -->
    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
      <button 
        class="page-link px-3 py-2 rounded-pill border-0 shadow-sm fw-semibold d-flex align-items-center"
        @click="nextPage"
        style="background: var(--color-dark); color: var(--color-light); transition: all 0.3s ease;"
        @mouseover="(e) => e.target.style.opacity = '0.9'"
        @mouseleave="(e) => e.target.style.opacity = '1'"
      >
        Next <i class="bi bi-chevron-right ms-1"></i>
      </button>
    </li>
  </ul>
</nav>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed  } from 'vue';
import  productService  from '../../services/productService'
import { getProducts, deleteProduct } from '@/apiEndpoints/apiEndpoints'
import { alerts } from '@/utility/alert';
import { APP_ROUTE_NAMES } from '@/constants/routerName';
import { useRouter } from 'vue-router';

const { showSuccess, showError, showConfirm} = alerts()
const products = ref([])
const loading = ref(false)
const router = useRouter()
const searchQuery = ref("")
const currentPage = ref(1)
const pageSize = 10

onMounted(() =>{
fetchProducts()
})

const fetchProducts = async() => {
   try{
    loading.value = true
        // products.value = await productService.getProducts()
        products.value = await getProducts()
   }catch(err){
   console.log(err)
   }
   finally{
    loading.value = false
   }
}

const handleProductDelete = async(productId) => {
  try {
    loading.value = true
    const confirmResult = await showConfirm('Are you sure, you wan to delete this product?')
    if(confirmResult.isConfirmed){
      // await productService.deleteProduct(productId);
      await deleteProduct(productId)
      await showSuccess('Product deleted successfully')
      fetchProducts()
    }
  } catch (error) {
    console.log(error)
  }finally{
loading.value = false
  }
}

// Sorting
const sortKey = ref("")
const sortOrder = ref(1)

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}

function getSortIcon(key) {
  if (sortKey.value !== key) return "bi-arrow-down-up"
  return sortOrder.value === 1 ? "bi-arrow-up" : "bi-arrow-down"
}
// Filter & Sort
const filteredProducts = computed(() => {
  let list = products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  if (sortKey.value) {
    list.sort((a, b) => {
      const valA = a[sortKey.value]
      const valB = b[sortKey.value]
      return (valA > valB ? 1 : -1) * sortOrder.value
    })
  }
  return list
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function goToPage(page) {
  currentPage.value = page
}
</script>

<style scoped>
.admin-products-wrapper {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-gradient {
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-accent {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border: none;
  color: white;
  transition: 0.3s ease;
}

.btn-accent:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.table thead th {
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
  transition: background-color 0.2s ease;
}

.pagination .page-link {
  border-radius: 50rem;
  color: var(--color-primary);
}

.pagination .page-item.active .page-link {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
</style>