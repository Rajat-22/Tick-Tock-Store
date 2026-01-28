import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/route'
import './assets/styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useThemeStore } from './store/themeStore'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)

const themeStore = useThemeStore()
if(themeStore.theme){
    const bodyElement = document.body
    bodyElement.setAttribute('data-bs-theme', themeStore.theme)
}

app.mount('#app')
