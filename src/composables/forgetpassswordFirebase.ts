import type { IBasketProduct, IFavoriteProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";

export const ForgetPasswordFirebase = async (email: string) => {
  const auth = getAuth();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const { basketProducts } = storeToRefs(useBasketStore());

  const addFavoriteProductsAndBasketProductsToFireBase = async (
    favoriteProducts: IFavoriteProduct[],
    basketProducts: IBasketProduct[]
  ) => {
    await updateDoc(doc(db, "users", email), {
      basketProducts: arrayUnion(basketProducts),
      favoriteProducts: arrayUnion(favoriteProducts)
    });
  };

  return sendPasswordResetEmail(auth, email).then(() =>
    addFavoriteProductsAndBasketProductsToFireBase(favoriteProducts.value, basketProducts.value)
  );
};
