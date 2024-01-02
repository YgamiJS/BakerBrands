import type { IFavoriteProduct, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteProducts = useStorage<IFavoriteProduct[]>("favorites", []);
  const favoriteProductsData = ref<IProduct[]>([]);
  const error = ref<any | null>(null);
  const loading = ref<boolean>(false);
  const { authentication, isAuth } = useAuthenticationStore();

  const clearFavoritesData = () => {
    favoriteProducts.value = [];
  };

  const fetchFavoriteProducts = async () => {
    if (!isAuth()) return;

    try {
      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", authentication.token));

      favoriteProducts.value = await fbBasketProductsStore.data()!.favoriteProducts;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchDataOfFavoriteProducts = async () => {
    try {
      loading.value = true;

      const fbProducts: IProduct[] = [];

      await Promise.all(
        favoriteProducts.value.map(async ({ id }) =>
          fbProducts.push((await getDoc(doc(db, "products", id))).data()! as IProduct)
        )
      );

      favoriteProductsData.value = fbProducts;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const addFavoriteProduct = async (id: IProduct["id"]) => {
    try {
      loading.value = true;

      const NewFavoriteProduct = {
        id
      };

      favoriteProducts.value.push(NewFavoriteProduct);

      favoriteProductsData.value.push((await getDoc(doc(db, "products", id))).data()! as IProduct);

      if (isAuth()) {
        await updateDoc(doc(db, "users", authentication.token), {
          favoriteProducts: arrayUnion(NewFavoriteProduct)
        });
      }

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const removeFavoriteProduct = async (favoriteProductId: IFavoriteProduct["id"]) => {
    favoriteProducts.value = favoriteProducts.value.filter(
      (favoriteProduct) => favoriteProduct.id !== favoriteProductId
    );

    favoriteProductsData.value = favoriteProductsData.value.filter(
      (favoriteProduct) => favoriteProduct.id !== favoriteProductId
    );

    if (isAuth()) {
      try {
        await updateDoc(doc(db, "users", authentication.token), {
          favoriteProducts: favoriteProducts.value
        });
      } catch (err) {
        error.value = err;
      }
    }
  };

  return {
    addFavoriteProduct,
    clearFavoritesData,
    error,
    favoriteProducts,
    favoriteProductsData,
    fetchDataOfFavoriteProducts,
    fetchFavoriteProducts,
    loading,
    removeFavoriteProduct
  };
});
