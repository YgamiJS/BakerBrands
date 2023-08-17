import type { IFavoriteProduct, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useUserStore } from "./user";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteProducts = useStorage<IFavoriteProduct[]>("favorites", []);
  const loading = ref<boolean>(false);
  const { isAuth, user } = useUserStore();

  const fetchFavoriteProducts = async () => {
    loading.value = true;

    const fbBasketProductsStore = await getDoc(doc(db, "users", user.email));

    loading.value = false;

    favoriteProducts.value = fbBasketProductsStore.data()!.favoriteProducts;
  };

  const addFavoriteProduct = async (favoriteProduct: IProduct) => {
    if (isAuth()) {
      loading.value = true;
      updateDoc(doc(db, "users", user.email), {
        favoriteProducts: arrayUnion(favoriteProduct)
      }).then(() => {
        favoriteProducts.value.push(favoriteProduct);
        loading.value = false;
      });
    } else {
      favoriteProducts.value.push(favoriteProduct);
    }
  };

  const removeFavoriteProduct = async (favoriteProductId: IFavoriteProduct["id"]) => {
    if (isAuth()) {
      await deleteDoc(doc(db, "users", user.email, "favoriteProducts", favoriteProductId!));
      favoriteProducts.value = favoriteProducts.value.filter(
        (favoriteProduct) => favoriteProduct.id !== favoriteProductId
      );
    } else {
      favoriteProducts.value = favoriteProducts.value.filter(
        (favoriteProduct) => favoriteProduct.id !== favoriteProductId
      );
    }
  };

  return {
    addFavoriteProduct,
    favoriteProducts,
    fetchFavoriteProducts,
    removeFavoriteProduct
  };
});
