import type { IBasketProduct, IFavoriteProduct, IWatchedProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";

export const ForgetPasswordFirebase = async (email: string) => {
  const auth = getAuth();
  const { fetchFavoriteProducts } = useFavoritesStore();
  const { watchedProducts } = storeToRefs(useWatchedProductsStore());
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const { basketProducts } = storeToRefs(useBasketStore());

  const addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase = async (
    favoriteProducts: IFavoriteProduct[],
    basketProducts: IBasketProduct[],
    wathedProducts: IWatchedProduct[]
  ) => {
    await updateDoc(doc(db, "users", email), {
      basketProducts: arrayUnion(basketProducts),
      favoriteProducts: arrayUnion(favoriteProducts),
      wathedProducts: arrayUnion(wathedProducts)
    });

    await fetchFavoriteProducts();
  };

  return sendPasswordResetEmail(auth, email).then(() =>
    addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase(
      favoriteProducts.value,
      basketProducts.value,
      watchedProducts.value
    )
  );
};
