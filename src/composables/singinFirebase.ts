import type { IBasketProduct, IFavoriteProduct, IUser } from "@/types";

import { db } from "@/services/vuefire";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { useUserStore } from "@/store/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const SingInFirebase = async ({ email, password }: Pick<IUser, "email" | "password">) => {
  const { setUser } = useUserStore();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const { basketProducts } = storeToRefs(useBasketStore());
  const auth = getAuth();
  const user = ref<IUser>();

  const addFavoriteProductsAndBasketProductsToFireBase = async (
    favoriteProducts: IFavoriteProduct[],
    basketProducts: IBasketProduct[]
  ) => {
    await updateDoc(doc(db, "users", email), {
      basketProducts: arrayUnion(basketProducts),
      favoriteProducts: arrayUnion(favoriteProducts)
    });
  };

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const currentUser = userCredential.user;
      const SingInUser = {
        email,
        id: currentUser.uid,
        password,
        token: currentUser.refreshToken
      };

      user.value = SingInUser;

      setUser(SingInUser);
    })
    .then(() =>
      addFavoriteProductsAndBasketProductsToFireBase(favoriteProducts.value, basketProducts.value)
    );
};
