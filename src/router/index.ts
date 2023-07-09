import { useUserStore } from "@/store/user";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import("@/pages/HomePage.vue"),
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
      component: () => import("@/pages/PaymentAndDeveliveryPage.vue"),
      path: "/PaymentAndDevelivery"
    },
    {
      beforeEnter: (to, from, next) => {
        const { isAuth } = useUserStore();
        if (!isAuth()) {
          next("/SingIn");
        } else {
          next();
        }
      },
      component: () => import("@/pages/UserProfilePage.vue"),
      path: "/Profile"
    },
    {
      component: () => import("@/pages/NotFoundPage.vue"),
      path: "/:catchAll(.*)"
    },
    {
      component: () => import("@/pages/ContactsPage.vue"),
      path: "/Contacts"
    },
    {
      component: () => import("@/pages/SingInPage.vue"),
      path: "/SingIn"
    },
    {
      component: () => import("@/pages/LogInPage.vue"),
      path: "/LogIn"
    },
    {
      component: () => import("@/pages/ForgetPasswordPage.vue"),
      path: "/ForgetPassword"
    }
  ]
});

export default router;
