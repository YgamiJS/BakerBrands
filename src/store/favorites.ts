import type { IFavoriteProduct, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";

import { useUserStore } from "./user";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteProducts = useStorage<IFavoriteProduct[]>("favorites", []);
  const { isAuth, user } = useUserStore();

  const addFavoriteProduct = async (favoriteProduct: IProduct) => {
    if (isAuth()) {
      setDoc(doc(db, "users", user.email, "favoriteProducts"), favoriteProduct).then(() =>
        favoriteProducts.value.push({
          ...favoriteProduct,
          count: 1
        })
      );
    } else {
      favoriteProducts.value.push({
        ...favoriteProduct,
        count: 1
      });
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
      favoriteProducts.value.filter((favoriteProduct) => favoriteProduct.id !== favoriteProductId);
    } else {
      favoriteProducts.value.filter((favoriteProduct) => favoriteProduct.id !== favoriteProductId);
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
