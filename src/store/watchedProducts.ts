import type { IProduct, IWatchedProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useUserStore } from "./user";

export const useWatchedProductsStore = defineStore("watchedProducts", () => {
  const watchedProducts = useStorage<IWatchedProduct[]>("watchedProducts", []);
  const watchedProductsData = ref<IProduct[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);
  const { isAuth, user } = useUserStore();

  const addWatchedProduct = async (id: IWatchedProduct["id"]) => {
    try {
      const NewWatchedProduct = { id };

      if (watchedProducts.value.find((watchedProduct) => watchedProduct.id == NewWatchedProduct.id))
        return;

      if (isAuth()) {
        loading.value = true;
        updateDoc(doc(db, "users", user.email), {
          wathedProducts: arrayUnion(NewWatchedProduct)
        }).then(() => {
          watchedProducts.value.push(NewWatchedProduct);
          loading.value = false;
        });
      } else {
        watchedProducts.value.push(NewWatchedProduct);
      }
    } catch (err) {
      error.value = err;
    }
  };

  const lastWathed = async () => {
    try {
      if (isAuth()) {
        loading.value = true;

        const fbWatchedProducts = await getDoc(doc(db, "users", user.email));

        const products = fbWatchedProducts.data()!.wathedProducts as IWatchedProduct[];

        watchedProducts.value = products;

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
