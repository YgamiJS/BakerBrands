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

  const addFavoriteProduct = async (favoriteProduct: IProduct) => {
    const NewFavoriteProduct = {
      ...favoriteProduct,
      count: 1
    };

    if (isAuth()) {
      loading.value = true;
      updateDoc(doc(db, "users", user.email), {
        favoriteProducts: arrayUnion(NewFavoriteProduct)
      }).then(() => {
        favoriteProducts.value.push(NewFavoriteProduct);
        loading.value = false;
      });
    } else {
      favoriteProducts.value.push(NewFavoriteProduct);
    }
  };

  const isInStock = (favoriteProductId: IFavoriteProduct["id"]) => {
    const favoriteProduct = favoriteProducts.value.find(
      (favoriteProduct) => favoriteProduct.id === favoriteProductId
    );

    if (!favoriteProduct) return;

    return !!favoriteProduct.inStock;
  };

  const incrementFavoriteProductCount = async (favoriteProductId: IFavoriteProduct["id"]) => {
    const favoriteProduct = favoriteProducts.value.find(
      (favoriteProduct) => favoriteProduct.id === favoriteProductId
    );

    if (!favoriteProduct) return;

    if (!(favoriteProduct.count >= favoriteProduct.inStock)) {
      if (isAuth()) {
        let count = (await getDoc(
          doc(db, "users", user.email, "favoriteProducts", favoriteProductId!)
        ))!.data()!.count!;

        await updateDoc(doc(db, "users", user.email, "favoriteProducts", favoriteProductId), {
          count: ++count
        });

        favoriteProduct.count += 1;
      } else {
        favoriteProduct.count += 1;
      }
    }
  };

  const decrementFavoriteProductCount = async (favoriteProductId: IFavoriteProduct["id"]) => {
    const favoriteProduct = favoriteProducts.value.find(
      (favoriteProduct) => favoriteProduct.id === favoriteProductId
    );

    if (!favoriteProduct) return;

    if (!(favoriteProduct.count <= 1)) {
      if (isAuth()) {
        let count = (await getDoc(
          doc(db, "users", user.email, "favoriteProducts", favoriteProductId!)
        ))!.data()!.count!;

        await updateDoc(doc(db, "users", user.email, "favoriteProducts", favoriteProductId), {
          count: ++count
        });

        favoriteProduct.count -= 1;
      } else {
        favoriteProduct.count -= 1;
      }
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
    decrementFavoriteProductCount,
    favoriteProducts,
    incrementFavoriteProductCount,
    isInStock,
    removeFavoriteProduct
  };
});
