import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utility/firebaseConfig'
import App from './App.vue'
import router from './router/route'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

let app;

onAuthStateChanged(auth, async(user) => {
    if(!app){
app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
    }
})
