import type { IBasketProduct, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useBasketStore = defineStore("basket", () => {
  const basketProducts = useStorage<IBasketProduct[]>("basket", []);
  const currentProduct = ref<IProduct>();
  const loading = ref<boolean>(false);
  const { authentication, isAuth } = useAuthenticationStore();

  const fetchBasketProducts = async () => {
    loading.value = true;

    const fbBasketProductsStore = await getDoc(doc(db, "users", authentication.token));

    loading.value = false;

    basketProducts.value = fbBasketProductsStore.data()!.basketProducts;
  };

  const fetchCurrentBasketProduct = async (id: string) => {
    loading.value = true;

    const fbProduct = await getDoc(doc(db, "products", id));

    currentProduct.value = fbProduct.data() as IProduct;

    loading.value = false;
  };

  const addBasketProduct = async (id: IProduct["id"], selectedSizes: string[]) => {
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
  };

  const addBasketProductSize = async (basketProductId: IProduct["id"], size: string) => {
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
  };

  const removeBasketProductSize = async (basketProductId: IProduct["id"], currentSize: string) => {
    const basketProduct = basketProducts.value.find(
      (basketProduct) => basketProduct.id === basketProductId
    );

    if (!basketProduct) return;

    if (isAuth()) {
      basketProduct.sizes = basketProduct.sizes.filter((size) => size !== currentSize);

      await updateDoc(doc(db, "users", authentication.token), {
        basketProducts: basketProducts.value
      });
    } else {
      basketProduct.sizes = basketProduct.sizes.filter((size) => size !== currentSize);
    }
  };

  const isInStock = (basketProductId: IBasketProduct["id"]) => {
    fetchCurrentBasketProduct(basketProductId);

    return !!currentProduct!.value!.inStock;
  };

  const incrementBasketProductCount = async (basketProductId: IBasketProduct["id"]) => {
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
  };

  const decrementBasketProductCount = async (basketProductId: IBasketProduct["id"]) => {
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
  };

  const removeBasketProduct = async (basketProductId: IBasketProduct["id"]) => {
    if (isAuth()) {
      basketProducts.value = basketProducts.value.filter(
        (basketProduct) => basketProduct.id !== basketProductId
      );

      await updateDoc(doc(db, "users", authentication.token), {
        basketProducts: basketProducts.value
      });
    } else {
      basketProducts.value = basketProducts.value.filter(
        (basketProduct) => basketProduct.id !== basketProductId
      );
    }
  };

  return {
    addBasketProduct,
    addBasketProductSize,
    basketProducts,
    decrementBasketProductCount,
    fetchBasketProducts,
    fetchCurrentBasketProduct,
    incrementBasketProductCount,
    isInStock,
    removeBasketProduct,
    removeBasketProductSize
  };
});
