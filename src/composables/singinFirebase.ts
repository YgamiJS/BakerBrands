import type {
  IAuthentication,
  IBasketProduct,
  IFavoriteProduct,
  ISingInForm,
  IWatchedProduct
} from "@/types";

import { db } from "@/services/vuefire";
import { useAuthenticationStore } from "@/store/authentication";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const SingInFirebase = async ({ email, password }: ISingInForm) => {
  const { setAuthentication } = useAuthenticationStore();
  const { watchedProducts } = storeToRefs(useWatchedProductsStore());
  const { fetchFavoriteProducts } = useFavoritesStore();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const { basketProducts } = storeToRefs(useBasketStore());
  const auth = getAuth();
  const user = ref<IAuthentication>();

  const addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase = async (
    favoriteProducts: IFavoriteProduct[],
    basketProducts: IBasketProduct[],
    wathedProducts: IWatchedProduct[]
  ) => {
    await updateDoc(doc(db, "users", email), {
      basketProducts: arrayUnion(...basketProducts),
      favoriteProducts: arrayUnion(...favoriteProducts),
      wathedProducts: arrayUnion(...wathedProducts)
    });

    await fetchFavoriteProducts();
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

      setAuthentication(SingInUser);
    })
    .then(() =>
      addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase(
        favoriteProducts.value,
        basketProducts.value,
        watchedProducts.value
      )
    );
};
