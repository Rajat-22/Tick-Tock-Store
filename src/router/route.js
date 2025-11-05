import { createRouter, createWebHistory } from "vue-router";
import { APP_ROUTE_NAMES } from "@/constants/routerName";
import { useAuthStore } from "@/store/authStore";

import AccessDenied from "@/views/auth/AccessDenied.vue";
import NotFound from "@/views/auth/NotFound.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";

import ContactUs from "@/views/home/ContactUs.vue";
import Home from "@/views/home/Home.vue";

import ProductList from "@/views/product/ProductList.vue";
import ProductUpdate from "@/views/product/ProductUpdate.vue";

const router = createRouter({
    history: createWebHistory(import.meta.url.BASE_URL),
    routes:[
      {
        path : '/',
        name: APP_ROUTE_NAMES.HOME,
        component: Home,
      },
      {
        path : '/access-denied',
        name: APP_ROUTE_NAMES.ACCESS_DENIED,
        component: AccessDenied,
      },
      {
        path : '/not-found',
        name: APP_ROUTE_NAMES.NOT_FOUND,
        component: NotFound,
      },
      {
        path : '/sign-in',
        name: APP_ROUTE_NAMES.SIGN_IN,
        component: SignIn,
      },
      {
        path : '/sign-up',
        name: APP_ROUTE_NAMES.SIGN_UP,
        component: SignUp,
      },
      {
        path : '/product-list',
        name: APP_ROUTE_NAMES.PRODUCT_LIST,
        component: ProductList,
      },
      {
        path : '/product-create',
        name: APP_ROUTE_NAMES.PRODUCT_CREATE,
        component: ProductUpdate,
      },
      {
        path : '/product-update/:id',
        name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
        component: ProductUpdate,
      },
      {
        path : '/contact-us',
        name: APP_ROUTE_NAMES.CONTACT_US,
        component: ContactUs,
      }
    ]
})

const adminRoutes = [
  APP_ROUTE_NAMES.PRODUCT_LIST,
  APP_ROUTE_NAMES.PRODUCT_CREATE,
  APP_ROUTE_NAMES.PRODUCT_UPDATE,
];

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Admin-protected routes
  if (adminRoutes.includes(to.name)) {
    if (!authStore.isAuthenticated) {
      // Not logged in → redirect to Sign In
      return next({ name: APP_ROUTE_NAMES.SIGN_IN });
    }

    if (!authStore.isAdmin) {
      // Logged in but not admin → redirect to Access Denied
      return next({ name: APP_ROUTE_NAMES.ACCESS_DENIED });
    }
  }

  // Add other auth-only routes here if needed
  // e.g., const authRoutes = [APP_ROUTE_NAMES.DASHBOARD];
  // if (authRoutes.includes(to.name) && !authStore.isAuthenticated) return next({ name: APP_ROUTE_NAMES.SIGN_IN });

  next();
});

export default router