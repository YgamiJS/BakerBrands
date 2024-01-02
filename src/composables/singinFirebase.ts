import type { IBasketProduct, IFavoriteProduct, ISingInForm, IWatchedProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useAuthenticationStore } from "@/store/authentication";
import { useBasketStore } from "@/store/basket";
import { useOrdersStore } from "@/store/bought";
import { useFavoritesStore } from "@/store/favorites";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { storeToRefs } from "pinia";

export const SingInFirebase = async ({ email, password }: ISingInForm) => {
  const { setAuthentication } = useAuthenticationStore();
  const { lastWathed } = useWatchedProductsStore();
  const { watchedProducts } = storeToRefs(useWatchedProductsStore());
  const { fetchBoughtProducts } = useOrdersStore();
  const { fetchFavoriteProducts } = useFavoritesStore();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());
  const { basketProducts } = storeToRefs(useBasketStore());
  const auth = getAuth();

  const addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase = async (
    favoriteProducts: IFavoriteProduct[],
    basketProducts: IBasketProduct[],
    wathedProducts: IWatchedProduct[]
  ) => {
    const token = await (
      await getDocs(await query(collection(db, "users"), where("email", "==", email)))
    ).docs[0].data();

    setAuthentication({ token: token.token });

    await updateDoc(doc(db, "users", token.token), {
      basketProducts: arrayUnion(...basketProducts),
      favoriteProducts: arrayUnion(...favoriteProducts),
      wathedProducts: arrayUnion(...wathedProducts)
    });

    await fetchFavoriteProducts();
    await fetchBoughtProducts();
    await lastWathed();
  };

  return signInWithEmailAndPassword(auth, email, password).then(() =>
    addFavoriteProductsAndBasketProductsAndWathcedProductsToFireBase(
      favoriteProducts.value,
      basketProducts.value,
      watchedProducts.value
    )
  );
};
