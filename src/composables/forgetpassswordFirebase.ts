import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ForgetPasswordFirebase = async (email: string) => {
  const auth = getAuth();
  const { favoriteProducts } = storeToRefs(useFavoritesStore());

  const addFavoriteProductsToFireBase = async (favoriteProducts: IFavoriteProduct[]) => {
    await updateDoc(doc(db, "users", email), {
      favoriteProducts: favoriteProducts
    });
  };

  return sendPasswordResetEmail(auth, email).then(() =>
    addFavoriteProductsToFireBase(favoriteProducts.value!)
  );
};
