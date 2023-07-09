import type { IFavoriteProduct, IUser } from "@/types";

import { db } from "@/services/vuefire";
import { useFavoritesStore } from "@/store/favorites";
import { useUserStore } from "@/store/user";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const SingInFirebase = async ({ email, password }: Pick<IUser, "email" | "password">) => {
  const { setUser } = useUserStore();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const auth = getAuth();
  const user = ref<IUser>();

  const addFavoriteProductsToFireBase = async (favoriteProducts: IFavoriteProduct[]) => {
    await updateDoc(doc(db, "users", email), {
      favoriteProducts: favoriteProducts
    });
  };

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const currentUser = userCredential.user;

      user.value = {
        email,
        id: currentUser.uid,
        password,
        token: currentUser.refreshToken
      };

      setUser({
        email,
        id: currentUser.uid,
        password,
        token: currentUser.refreshToken
      });
    })
    .then(() => addFavoriteProductsToFireBase(favoriteProducts.value!));
};
