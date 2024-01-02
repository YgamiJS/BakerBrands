import type { IProduct, IWatchedProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useWatchedProductsStore = defineStore("watchedProducts", () => {
  const watchedProducts = useStorage<IWatchedProduct[]>("watchedProducts", []);
  const watchedProductsData = ref<IProduct[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);
  const auth = useAuthenticationStore();

  const addWatchedProduct = async (id: IWatchedProduct["id"]) => {
    try {
      const NewWatchedProduct = { id };

      if (watchedProducts.value.find((watchedProduct) => watchedProduct.id == NewWatchedProduct.id))
        return;

      if (auth.isAuth()) {
        loading.value = true;
        updateDoc(doc(db, "users", auth.authentication.token), {
          wathedProducts: arrayUnion(NewWatchedProduct)
        }).then(() => {
          loading.value = false;
        });
      }

      watchedProducts.value.push(NewWatchedProduct);
    } catch (err) {
      error.value = err;
    }
  };

  const lastWathed = async () => {
    try {
      if (auth.isAuth()) {
        loading.value = true;

        const fbWatchedProducts = await getDoc(doc(db, "users", auth.authentication.token));

        watchedProducts.value = (await fbWatchedProducts.data()!
          .wathedProducts) as IWatchedProduct[];

        console.log((await fbWatchedProducts.data()!.wathedProducts) as IWatchedProduct[], "tyt");

        const fbProducts: IProduct[] = [];

        await Promise.all(
          watchedProducts.value.map(async ({ id }) =>
            fbProducts.push((await getDoc(doc(db, "products", id))).data()! as IProduct)
          )
        );

        watchedProductsData.value = fbProducts.slice(0, 15);

        loading.value = false;
      } else {
        const fbProducts: IProduct[] = [];

        await Promise.all(
          watchedProducts.value.map(async ({ id }) =>
            fbProducts.push((await getDoc(doc(db, "products", id))).data()! as IProduct)
          )
        );
        watchedProductsData.value = fbProducts.slice(0, 15);
      }
    } catch (err) {
      error.value = err;
    }
  };

  return {
    addWatchedProduct,
    error,
    lastWathed,
    loading,
    watchedProducts,
    watchedProductsData
  };
});
