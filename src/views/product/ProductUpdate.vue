<template>
  <div class="container py-5">
    <div class="row shadow-lg rounded-4 overflow-hidden bg-light border-0">
      <!-- ✅ Left Form Section -->
      <div class="col-lg-8 p-5 bg-white">
        <h3 class="text-gradient text-center fw-bold mb-4">
          {{ productIdForUpdate ? "Update Product" : "Create Product" }}
        </h3>
        <hr class="mb-4"/>

        <div v-if="errorList.length > 0" class="alert alert-danger rounded-3 shadow-sm">
          <strong>Please fix the following errors:</strong>
          <ul class="mb-0 ps-3">
            <li v-for="error in errorList" :key="error">{{ error }}</li>
          </ul>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <div class="mb-3">
            <label class="form-label text-muted fw-semibold">Product Name</label>
            <input
              type="text"
              class="form-control form-control-lg border-0 shadow-sm"
              v-model.trim="productObj.name"
              placeholder="Enter watch name"
            />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label text-muted fw-semibold">Description</label>
            <textarea
              class="form-control border-0 shadow-sm"
              rows="3"
              placeholder="Write a short description..."
              v-model="productObj.description"
            ></textarea>
          </div>

          <!-- Price -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label text-muted fw-semibold">Price</label>
              <input
                type="number"
                class="form-control border-0 shadow-sm"
                v-model.number="productObj.price"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label text-muted fw-semibold">Sale Price</label>
              <input
                type="number"
                class="form-control border-0 shadow-sm"
                v-model.number="productObj.salePrice"
              />
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-3">
            <label class="form-label text-muted fw-semibold">Tags</label>
            <input
              type="text"
              class="form-control border-0 shadow-sm"
              placeholder="e.g., analog, automatic, luxury"
              v-model="productObj.tags"
            />
          </div>

          <!-- Bestseller -->
          <div class="form-check form-switch mb-4 ps-2">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              v-model="productObj.isBestSeller"
              id="bestseller"
            />
            <label class="form-check-label text-muted" for="bestseller">Mark as Bestseller</label>
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label class="form-label text-muted fw-semibold">Category</label>
            <select class="form-select border-0 shadow-sm" v-model="productObj.category">
              <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <!-- Image -->
          <div class="mb-4">
            <label class="form-label text-muted fw-semibold">Product Image</label>
            <input type="file" class="form-control border-0 shadow-sm" @change="handleImageUpload" />
          </div>

          <!-- Buttons -->
          <div class="text-center pt-3">
            <button class="btn btn-primary-gradient px-4 me-2" :disabled="loading">
              <span v-if="loading || isImageloading" class="spinner-border spinner-border-sm me-2"></span>
              Submit
            </button>
            <router-link
              :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
              class="btn btn-outline-secondary px-4"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>

      <!-- ✅ Right Image Preview Section -->
      <div class="col-lg-4 d-flex align-items-center justify-content-center bg-gradient-blue p-4">
        <img
          :src="productObj.imagePreview || productObj.image || `https://placehold.co/400x400?text=Watch+Preview`"
          class="img-fluid rounded-4 shadow-lg"
          alt="Product preview"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted, onBeforeUnmount  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PRODUCT_CATEGORIES } from '../../constants/productConstant'
import { alerts } from '@/utility/alert';
import  productService  from '../../services/productService'
import { getProductById, updateProduct, createProduct } from '@/apiEndpoints/apiEndpoints'
import { APP_ROUTE_NAMES } from '@/constants/routerName';
import { uploadImageCloudinary } from '@/utility/cloudImage';

const { showSuccess, showError, showConfirm} = alerts()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const isImageloading = ref(false)
const errorList = reactive([])
const productIdForUpdate = route.params.id
const productObj = reactive({
    name: '',
    description: '',
    price: 0,
    salePrice: 0,
    tags: [],
    isBestSeller: false,
    category: '',
    image: 'https://placehold.co/600x400',
})

onMounted(async () =>{
   if(!productIdForUpdate) return
   loading.value = true

   try {
    // const product = await productService.getProductById(productIdForUpdate)
    const product = await getProductById(productIdForUpdate)
    Object.assign(productObj, {...product, tags: product.tags.join(', ')})
   } catch (error) {
    console.log(error)
   } finally{
    loading.value = false
   }

})

onBeforeUnmount(() => {
  if (productObj.imagePreview) {
    URL.revokeObjectURL(productObj.imagePreview);
  }
});

async function handleSubmit(){
    try {
      loading.value = true  
      errorList.length = 0

      if(productObj.name.length < 3){
        errorList.push('Name should be atleast 3 character long.')
      }
      if(productObj.price <= 0){
        errorList.push('Price should be greater then 0.')
      }
      if(productObj.category === ''){
        errorList.push('Please select a category.')
      }
     
     if(!errorList.length){   
      // const productData = {
      //   ...productObj,
      //   price: Number(productObj.price),
      //   salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
      //   tags: productObj.tags.length>0 ? productObj.tags.split(',').map((tag) => tag.trim()) : [],
      //   bestseller: Boolean(productObj.isBestSeller),
      // }
    //   await new Promise((resolve) => setTimeout(resolve, 2000))

    const productData = new FormData();

      productData.append('name', productObj.name);
      productData.append('description', productObj.description || '');
      productData.append('price', Number(productObj.price));
      productData.append('salePrice', productObj.salePrice ? Number(productObj.salePrice) : '');
      productData.append('tags', productObj.tags || '');
      productData.append('isBestSeller', productObj.isBestSeller ? 'true' : 'false');
      productData.append('category', productObj.category);

      // 👇 append the file if user uploaded one
      if (productObj.image && productObj.image instanceof File) {
        productData.append('image', productObj.image);
      }

    if(productIdForUpdate){
      // if update the product
        await updateProduct(productIdForUpdate ,productData)
      showSuccess('Product updated successfully.')
    } else {
      await createProduct(productData)
      showSuccess('Product created successfully.')
    }

      router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST})
    }
    } catch (error) {
        
    } finally{
      loading.value = false
    }
}

async function handleImageUpload(event){
  // const file = event.target.files[0]
  // if(!file) return
  // try {
  //   isImageloading.value = true
  //   const imageUrl = await uploadImageCloudinary(file)
  //   productObj.image = imageUrl
  // } catch (err) {
  //   console.log(err)
  //   throw err
  // } finally{
  //   isImageloading.value = false
  // }

  const file = event.target.files[0];
  if (!file) return;
  // Save the file for upload
  productObj.image = file;

  // Generate a temporary preview URL
  const previewUrl = URL.createObjectURL(file);
  productObj.imagePreview = previewUrl; // store for preview
}

</script>

<style scoped>
.bg-gradient-blue {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

.text-gradient {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-primary-gradient {
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.btn-primary-gradient:hover {
  background: linear-gradient(90deg, var(--color-secondary), var(--color-accent));
  transform: translateY(-2px);
}

.form-control,
.form-select {
  border-radius: 10px;
  transition: 0.3s ease;
}
.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(252, 176, 69, 0.25);
}

.shadow-lg {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
}
</style>