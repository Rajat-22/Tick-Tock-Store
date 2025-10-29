<template>
     <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form v-on:submit.prevent="handleSubmit">
          <div class="h2 text-center text-success">{{ productIdForUpdate ? "Update": "Create" }} Product</div>
          <hr />
          <div v-if="errorList.length>0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input type="text" class="form-control" v-model.trim="productObj.name" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea type="text" class="form-control" v-model="productObj.description"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input type="number" class="form-control" v-model.number="productObj.price" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input type="number" class="form-control" v-model.number="productObj.salePrice" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g., analog, automatic, luxury"
              v-model="productObj.tags"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input class="form-check-input" type="checkbox" role="switch" v-model="productObj.isBestSeller" />

            <label class="form-check-label" for="bestseller">
              Bestseller
            </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category">
              <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" @change="handleImageUpload" :disabled="isImageloading" />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading">
              <span v-if="loading || isImageloading" class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <router-link :to="{name:APP_ROUTE_NAMES.PRODUCT_LIST}" class="btn btn-secondary m-2 w-25"> Cancel </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="productObj.image ||`https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
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
      const productData = {
        ...productObj,
        price: Number(productObj.price),
        salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
        tags: productObj.tags.length>0 ? productObj.tags.split(',').map((tag) => tag.trim()) : [],
        bestseller: Boolean(productObj.isBestSeller),
      }
    //   await new Promise((resolve) => setTimeout(resolve, 2000))

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
  const file = event.target.files[0]
  if(!file) return
  try {
    isImageloading.value = true
    const imageUrl = await uploadImageCloudinary(file)
    productObj.image = imageUrl
  } catch (err) {
    console.log(err)
    throw err
  } finally{
    isImageloading.value = false
  }
}

</script>