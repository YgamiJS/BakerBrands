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
import { useOrdersStore } from "@/store/bought";
import { useFavoritesStore } from "@/store/favorites";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const SingInFirebase = async ({ email, password }: ISingInForm) => {
  const { setAuthentication } = useAuthenticationStore();
  const { lastWathed } = useWatchedProductsStore();
  const { watchedProducts } = storeToRefs(useWatchedProductsStore());
  const { fetchBoughtProducts } = useOrdersStore();
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
    const token = (await getDocs(await query(collection(db, "users"), where("email", "==", email))))
      .docs[0].id;

    await updateDoc(doc(db, "users", token), {
      basketProducts: arrayUnion(...basketProducts),
      favoriteProducts: arrayUnion(...favoriteProducts),
      wathedProducts: arrayUnion(...wathedProducts)
    });

    await fetchFavoriteProducts();
    await fetchBoughtProducts();
    await lastWathed();
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

      setAuthentication({ token: SingInUser.token });
    })
    .then(() =>
      addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase(
        favoriteProducts.value,
        basketProducts.value,
        watchedProducts.value
      )
    );
};
