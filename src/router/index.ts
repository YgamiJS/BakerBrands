import { useUserStore } from "@/store/user";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import("@/pages/Home.vue"),
      path: "/"
    },
    {
      component: () => import("@/pages/Shop.vue"),
      path: `/Shop/`
    },
    {
      component: () => import("@/pages/Product.vue"),
      path: `/Shop/:id`
    },
    {
      component: () => import("@/pages/PaymentAndDevelivery.vue"),
      path: "/PaymentAndDevelivery"
    },
    {
      component: () => import("@/pages/UserProfile.vue"),
      path: "/UserProfile",
      redirect: () => {
        const userStore = useUserStore();
        if (!userStore.user.email) return { path: "/SingIn" };
      }
    },
    {
      component: () => import("@/pages/NotFound.vue"),
      path: "/:catchAll(.*)"
    },
    {
      component: () => import("@/pages/Contacts.vue"),
      path: "/Contacts"
    },
    {
      component: () => import("@/pages/SingIn.vue"),
      path: "/SingIn"
    },
    {
      component: () => import("@/pages/LogIn.vue"),
      path: "/LogIn"
    },
    {
      component: () => import("@/pages/ForgetPasswordPage.vue"),
      path: "/ForgetPassword"
    }
  ]
});

export default router;
