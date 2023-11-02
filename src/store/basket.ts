import type { IBasketProduct, IBasketProductData, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useBasketStore = defineStore("basket", () => {
  const basketProducts = useStorage<IBasketProduct[]>("basket", []);
  const basketProductsData = ref<IBasketProductData[]>([]);
  const currentProduct = ref<IProduct>();
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);
  const { authentication, isAuth } = useAuthenticationStore();

  const fetchBasketProducts = async () => {
    try {
      if (!isAuth()) return;

      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", authentication.token));

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
      const NewbasketProduct = {
        count: 1,
        id,
        sizes: selectedSizes
      };

      if (isAuth()) {
        loading.value = true;
        updateDoc(doc(db, "users", authentication.token), {
          basketProducts: arrayUnion(NewbasketProduct)
        }).then(() => {
          basketProducts.value.push(NewbasketProduct);
          loading.value = false;
        });
      } else {
        basketProducts.value.push(NewbasketProduct);
      }
    } catch (err) {
      error.value = err;
    }
  };

  const addBasketProductSize = async (basketProductId: IProduct["id"], size: string) => {
    try {
      const basketProduct = basketProducts.value.find(
        (basketProduct) => basketProduct.id === basketProductId
      );

      if (!basketProduct) return;

      if (isAuth()) {
        basketProduct.sizes.push(size);

        await updateDoc(doc(db, "users", authentication.token), {
          basketProducts: basketProducts.value
        });
      } else {
        basketProduct.sizes.push(size);
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

      if (isAuth()) {
        basketProduct.sizes = basketProduct.sizes.filter((size) => size !== currentSize);

        await updateDoc(doc(db, "users", authentication.token), {
          basketProducts: basketProducts.value
        });

        const currentBasketProductDataIndex = basketProductsData.value.findIndex(
          (basketProduct) => basketProduct.id == basketProductId
        );

        if (currentBasketProductDataIndex === -1) return;

        (basketProductsData.value[currentBasketProductDataIndex].sizes as string[]) =
          basketProductsData.value[currentBasketProductDataIndex].sizes.filter(
            (size) => size !== currentSize
          );
      } else {
        basketProduct.sizes = basketProduct.sizes.filter((size) => size !== currentSize);

        const currentBasketProductDataIndex = basketProductsData.value.findIndex(
          (basketProduct) => basketProduct.id == basketProductId
        );

        if (currentBasketProductDataIndex === -1) return;

        (basketProductsData.value[currentBasketProductDataIndex].sizes as string[]) =
          basketProductsData.value[currentBasketProductDataIndex].sizes.filter(
            (size) => size !== currentSize
          );
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
        if (isAuth()) {
          const currentProductIndex = basketProducts.value.findIndex(
            (basketProduct) => basketProduct.id === basketProductId
          );

          basketProducts.value[currentProductIndex].count += 1;

          await updateDoc(doc(db, "users", authentication.token), {
            basketProducts: basketProducts.value
          });
        } else {
          basketProduct.count += 1;
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
        if (isAuth()) {
          const currentProductIndex = basketProducts.value.findIndex(
            (basketProduct) => basketProduct.id === basketProductId
          );

          basketProducts.value[currentProductIndex].count -= 1;

          await updateDoc(doc(db, "users", authentication.token), {
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
      if (isAuth()) {
        basketProducts.value = basketProducts.value.filter(
          (basketProduct) => basketProduct.id !== basketProductId
        );

        basketProductsData.value = basketProductsData.value.filter(
          (basketProduct) => basketProduct.id !== basketProductId
        );

        await updateDoc(doc(db, "users", authentication.token), {
          basketProducts: basketProducts.value
        });
      } else {
        basketProducts.value = basketProducts.value.filter(
          (basketProduct) => basketProduct.id !== basketProductId
        );

        basketProductsData.value = basketProductsData.value.filter(
          (basketProduct) => basketProduct.id !== basketProductId
        );
      }
    } catch (err) {
      error.value = err;
    }
  };

  return {
    addBasketProduct,
    addBasketProductSize,
    basketProducts,
    basketProductsData,
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
