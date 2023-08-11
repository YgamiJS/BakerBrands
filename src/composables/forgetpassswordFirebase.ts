import type { IFavoriteProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useFavoritesStore } from "@/store/favorites";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";

export const ForgetPasswordFirebase = async (email: string) => {
  const auth = getAuth();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());

  const addFavoriteProductsToFireBase = async (favoriteProducts: IFavoriteProduct[]) => {
    await updateDoc(doc(db, "users", email), {
      favoriteProducts: arrayUnion(favoriteProducts)
    });
  };

  return sendPasswordResetEmail(auth, email).then(() =>
    addFavoriteProductsToFireBase(favoriteProducts.value!)
  );
};
