import Contacts from "@/pages/Contacts.vue";
import ForgetPassword from "@/pages/ForgetPasswordPage.vue";
import Home from "@/pages/Home.vue";
import LogIn from "@/pages/LogIn.vue";
import NotFound from "@/pages/NotFound.vue";
import PaymentAndDevelivery from "@/pages/PaymentAndDevelivery.vue";
import Product from "@/pages/Product.vue";
import Shop from "@/pages/Shop.vue";
import SingIn from "@/pages/SingIn.vue";
import UserProfile from "@/pages/UserProfile.vue";
import { useUserStore } from "@/store/user";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Home,
      path: "/"
    },
    {
      component: Shop,
      path: `/Shop/`
    },
    {
      component: Product,
      path: `/Shop/:id`
    },
    {
      component: PaymentAndDevelivery,
      path: "/PaymentAndDevelivery"
    },
    {
      component: UserProfile,
      path: "/UserProfile",
      redirect: () => {
        const userStore = useUserStore();
        if (!userStore.user.email) return { path: "/SingIn" };
      }
    },
    {
      component: NotFound,
      path: "/:catchAll(.*)"
    },
    {
      component: Contacts,
      path: "/Contacts"
    },
    {
      component: SingIn,
      path: "/SingIn"
    },
    {
      component: LogIn,
      path: "/LogIn"
    },
    {
      component: ForgetPassword,
      path: "/ForgetPassword"
    }
  ]
});

export default router;
