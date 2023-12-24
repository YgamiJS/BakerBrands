import { useAuthenticationStore } from "@/store/authentication";
import { Routes } from "@/types";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const count = ref<number>(-1);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import("@/pages/HomePage.vue"),
      name: Routes.HOME,
      path: "/"
    },
    {
      component: () => import("@/pages/ShopPage.vue"),
      path: `/Shop/`
    },
    {
      component: () => import("@/pages/ProductPage.vue"),
      path: `/Shop/:id`
    },
    {
      name: Routes.SHOPNEW,
      path: "/ShopNew/",
      redirect: "/Shop/"
    },
    {
      component: () => import("@/pages/SearchPage.vue"),
      name: Routes.SEARCH,
      path: "/Search/"
    },
    {
      component: () => import("@/pages/PaymentAndDeveliveryPage.vue"),
      name: Routes.PAYMENT_AND_DEVELIVERY,
      path: "/PayAndDevelivery"
    },
    {
      component: () => import("@/pages/BasketPage.vue"),
      name: Routes.BASKET,
      path: "/Basket/"
    },
    {
      component: () => import("@/pages/FavoritesPage.vue"),
      name: Routes.FAVORITES,
      path: "/Favorites/"
    },
    {
      beforeEnter: (to, from, next) => {
        const { isAuth } = useAuthenticationStore();
        if (!isAuth()) {
          next("/SingIn");
        } else {
          next();
        }
      },
      component: () => import("@/pages/PlacingOrder.vue"),
      name: Routes.PLACINGORDER,
      path: "/PlacingOrder/"
    },
    {
      beforeEnter: (to, from, next) => {
        const { isAuth } = useAuthenticationStore();
        if (!isAuth()) {
          next("/SingIn");
        } else {
          next();
        }
      },
      component: () => import("@/pages/UserProfilePage.vue"),
      name: Routes.PROFILE,
      path: "/Profile"
    },
    {
      component: () => import("@/pages/NotFoundPage.vue"),
      name: Routes.NOT_FOUND,
      path: "/:catchAll(.*)"
    },
    {
      component: () => import("@/pages/ContactsPage.vue"),
      name: Routes.CONTACTS,
      path: "/Contacts"
    },
    {
      component: () => import("@/pages/SingInPage.vue"),
      name: Routes.SING_IN,
      path: "/SingIn"
    },
    {
      component: () => import("@/pages/LogInPage.vue"),
      name: Routes.LOG_IN,
      path: "/LogIn"
    },
    {
      component: () => import("@/pages/CompletedOrder.vue"),
      name: Routes.COMPLETED_ORDER,
      path: "/CompletedOrder"
    },
    {
      component: () => import("@/pages/AboutUsPage.vue"),
      name: Routes.ABOUT_US,
      path: "/AboutUs"
    },
    {
      beforeEnter: (to, from, next) => {
        const { isAuth } = useAuthenticationStore();
        if (!isAuth()) {
          next("/SingIn");
        } else {
          next();
        }
      },
      component: () => import("@/pages/BoughtPage.vue"),
      name: Routes.BOUGHTPAGE,
      path: "/Bought"
    },
    {
      component: () => import("@/pages/ForgetPasswordPage.vue"),
      name: Routes.FORGET_PASSWORD,
      path: "/ForgetPassword"
    }
  ]
});

router.afterEach(() => {
  count.value++;
});

export { count };
export default router;
