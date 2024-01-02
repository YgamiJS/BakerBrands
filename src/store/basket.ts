import type { IBasketProduct, IBasketProductData, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useBasketStore = defineStore("basket", () => {
  const auth = useAuthenticationStore();
  const basketProducts = useStorage<IBasketProduct[]>("basket", []);
  const basketProductsData = ref<IBasketProductData[]>([]);
  const currentProduct = ref<IProduct>();
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);

  const fetchBasketProducts = async () => {
    try {
      if (!auth.isAuth()) return;

      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", auth.authentication.token));

      loading.value = false;

      basketProducts.value = fbBasketProductsStore.data()!.basketProducts;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchDataOfBasketProducts = async () => {
    try {
      loading.value = true;

      const fbProducts: IBasketProductData[] = [];

      await Promise.all(
        basketProducts.value.map(async ({ id }) =>
          fbProducts.push({
            ...((await getDoc(doc(db, "products", id))).data()! as IProduct),
            ...basketProducts.value.find((basketProduct) => basketProduct.id == id)
          } as IBasketProductData)
        )
      );

      basketProductsData.value = fbProducts;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchCurrentBasketProduct = async (id: string) => {
    try {
      loading.value = true;

      const fbProduct = await getDoc(doc(db, "products", id));

      currentProduct.value = fbProduct.data() as IProduct;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const addBasketProduct = async (id: IProduct["id"], selectedSizes: string[]) => {
    try {
      loading.value = true;

      const NewbasketProduct = {
        count: 1,
        id,
        sizes: selectedSizes
      };

      basketProducts.value.push(NewbasketProduct);

      if (auth.isAuth()) {
        await updateDoc(doc(db, "users", auth.authentication.token), {
          basketProducts: arrayUnion(NewbasketProduct)
        });
      }

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const clearBasketProducts = async () => {
    basketProducts.value = [];
    basketProductsData.value = [];

    if (auth.isAuth()) {
      loading.value = true;
      updateDoc(doc(db, "users", auth.authentication.token), {
        basketProducts: []
      }).then(() => (loading.value = false));
    }
  };

  const addBasketProductSize = async (basketProductId: IProduct["id"], size: string) => {
    try {
      const basketProduct = basketProducts.value.find(
        (basketProduct) => basketProduct.id === basketProductId
      );

      if (!basketProduct) return;

      basketProduct.sizes.push(size);

      if (auth.isAuth()) {
        await updateDoc(doc(db, "users", auth.authentication.token), {
          basketProducts: basketProducts.value
        });
      }
    } catch (err) {
      error.value = err;
    }
  };

  const removeBasketProductSize = async (basketProductId: IProduct["id"], currentSize: string) => {
    try {
      const basketProduct = basketProducts.value.find(
        (basketProduct) => basketProduct.id === basketProductId
      );

      if (!basketProduct) return;

      basketProduct.sizes = basketProduct.sizes.filter((size) => size !== currentSize);

      const currentBasketProductDataIndex = basketProductsData.value.findIndex(
        (basketProduct) => basketProduct.id == basketProductId
      );

      if (currentBasketProductDataIndex === -1) return;

      (basketProductsData.value[currentBasketProductDataIndex].sizes as string[]) =
        basketProductsData.value[currentBasketProductDataIndex].sizes.filter(
          (size) => size !== currentSize
        );

      if (auth.isAuth()) {
        await updateDoc(doc(db, "users", auth.authentication.token), {
          basketProducts: basketProducts.value
        });
      }
    } catch (err) {
      error.value = err;
    }
  };

  const isInStock = (basketProductId: IBasketProduct["id"]) => {
    fetchCurrentBasketProduct(basketProductId);

    return !!currentProduct!.value!.inStock;
  };

  const incrementBasketProductCount = async (basketProductId: IBasketProduct["id"]) => {
    try {
      const basketProduct = basketProducts.value.find(
        (basketProduct) => basketProduct.id === basketProductId
      );

      if (!basketProduct) return;

      if (basketProduct.count < currentProduct!.value!.inStock) {
        basketProduct.count += 1;

        const currentProductIndex = basketProducts.value.findIndex(
          (basketProduct) => basketProduct.id === basketProductId
        );

        const currentBasketProductData = basketProductsData.value.findIndex(
          (basketProduct) => basketProduct.id === basketProductId
        );

        if (currentBasketProductData == -1) return;

        basketProductsData.value[currentBasketProductData].count += 1;

        if (auth.isAuth()) {
          basketProducts.value[currentProductIndex].count += 1;

          await updateDoc(doc(db, "users", auth.authentication.token), {
            basketProducts: basketProducts.value
          });
        }
      }
    } catch (err) {
      error.value = err;
    }
  };

  const decrementBasketProductCount = async (basketProductId: IBasketProduct["id"]) => {
    try {
      const basketProduct = basketProducts.value.find(
        (basketProduct) => basketProduct.id === basketProductId
      );

      if (!basketProduct) return;

      if (!(basketProduct.count < 2)) {
        const currentProductIndex = basketProducts.value.findIndex(
          (basketProduct) => basketProduct.id === basketProductId
        );

        const currentBasketProductData = basketProductsData.value.findIndex(
          (basketProduct) => basketProduct.id === basketProductId
        );

        if (currentBasketProductData == -1) return;

        basketProducts.value[currentProductIndex].count -= 1;

        basketProductsData.value[currentBasketProductData].count -= 1;

        if (auth.isAuth()) {
          await updateDoc(doc(db, "users", auth.authentication.token), {
            basketProducts: basketProducts.value
          });
        } else {
          basketProduct.count -= 1;
        }
      } else {
        removeBasketProduct(basketProductId);
      }
    } catch (err) {
      error.value = err;
    }
  };

  const removeBasketProduct = async (basketProductId: IBasketProduct["id"]) => {
    try {
      basketProducts.value = basketProducts.value.filter(
        (basketProduct) => basketProduct.id !== basketProductId
      );

      basketProductsData.value = basketProductsData.value.filter(
        (basketProduct) => basketProduct.id !== basketProductId
      );

      if (auth.isAuth()) {
        await updateDoc(doc(db, "users", auth.authentication.token), {
          basketProducts: basketProducts.value
        });
      }
    } catch (err) {
      error.value = err;
    }
  };

  const clearBasketData = () => {
    basketProducts.value = [];
  };

  return {
    addBasketProduct,
    addBasketProductSize,
    basketProducts,
    basketProductsData,
    clearBasketData,
    clearBasketProducts,
    decrementBasketProductCount,
    error,
    fetchBasketProducts,
    fetchCurrentBasketProduct,
    fetchDataOfBasketProducts,
    incrementBasketProductCount,
    isInStock,
    loading,
    removeBasketProduct,
    removeBasketProductSize
  };
});
