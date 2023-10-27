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

  const fetchFavoriteProducts = async () => {
    if (!isAuth()) return;

    try {
      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", authentication.token));

      favoriteProducts.value = fbBasketProductsStore.data()!.favoriteProducts;

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
    const NewFavoriteProduct = {
      id
    };

    if (isAuth()) {
      try {
        loading.value = true;

        favoriteProducts.value.push(NewFavoriteProduct);

        updateDoc(doc(db, "users", authentication.token), {
          favoriteProducts: arrayUnion(NewFavoriteProduct)
        }).then(async () => {
          loading.value = false;
          favoriteProductsData.value.push(
            (await getDoc(doc(db, "products", id))).data()! as IProduct
          );
        });
      } catch (err) {
        error.value = err;
      }
    } else {
      favoriteProducts.value.push(NewFavoriteProduct);

      favoriteProductsData.value.push((await getDoc(doc(db, "products", id))).data()! as IProduct);
    }
  };

  const removeFavoriteProduct = async (favoriteProductId: IFavoriteProduct["id"]) => {
    if (isAuth()) {
      try {
        favoriteProducts.value = favoriteProducts.value.filter(
          (favoriteProduct) => favoriteProduct.id !== favoriteProductId
        );

        favoriteProductsData.value = favoriteProductsData.value.filter(
          (favoriteProduct) => favoriteProduct.id !== favoriteProductId
        );

        await updateDoc(doc(db, "users", authentication.token), {
          favoriteProducts: favoriteProducts.value
        });
      } catch (err) {
        error.value = err;
      }
    } else {
      favoriteProducts.value = favoriteProducts.value.filter(
        (favoriteProduct) => favoriteProduct.id !== favoriteProductId
      );

      favoriteProductsData.value = favoriteProductsData.value.filter(
        (favoriteProduct) => favoriteProduct.id !== favoriteProductId
      );
    }
  };

  return {
    addFavoriteProduct,
    error,
    favoriteProducts,
    favoriteProductsData,
    fetchDataOfFavoriteProducts,
    fetchFavoriteProducts,
    loading,
    removeFavoriteProduct
  };
});
