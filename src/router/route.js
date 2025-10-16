import { createRouter, createWebHistory } from "vue-router";
import { APP_ROUTE_NAMES } from "@/constants/routerName";
// import { useAuthStore } from "@/store/authStore";
import { isAuthenticated, isAdmin } from "@/utility/auth";

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
        beforeEnter: () => (isAdmin() ? true : { name: APP_ROUTE_NAMES.ACCESS_DENIED }),
      },
      {
        path : '/product-create',
        name: APP_ROUTE_NAMES.PRODUCT_CREATE,
        component: ProductUpdate,
        beforeEnter: () => (isAdmin() ? true : { name: APP_ROUTE_NAMES.ACCESS_DENIED }),
      },
      {
        path : '/product-update/:id',
        name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
        component: ProductUpdate,
        beforeEnter: () => (isAdmin() ? true : { name: APP_ROUTE_NAMES.ACCESS_DENIED }),
      },
      {
        path : '/contact-us',
        name: APP_ROUTE_NAMES.CONTACT_US,
        component: ContactUs,
      }
    ]
})

// Global guard: redirect unauthenticated users from protected routes
router.beforeEach((to, from, next) => {
  const protectedRoutes = [
    APP_ROUTE_NAMES.PRODUCT_CREATE,
    APP_ROUTE_NAMES.PRODUCT_UPDATE,
    APP_ROUTE_NAMES.PRODUCT_LIST,
  ];

  if (protectedRoutes.includes(to.name) && !isAuthenticated()) {
    return next({ name: APP_ROUTE_NAMES.SIGN_IN });
  }

  next();
});

export default router