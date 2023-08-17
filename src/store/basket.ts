import type { IBasketProduct, IProduct } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useUserStore } from "./user";

export const useBasketStore = defineStore("basket", () => {
  const basketProducts = useStorage<IBasketProduct[]>("basket", []);
  const loading = ref<boolean>(false);
  const { isAuth, user } = useUserStore();

  const fetchBasketProducts = async () => {
    console.log(14);

    loading.value = true;

    const fbBasketProductsStore = await getDoc(doc(db, "users", user.email));

    loading.value = false;

    basketProducts.value = fbBasketProductsStore.data()!.basketProducts;
  };

  const addBasketProduct = async (basketProduct: IProduct) => {
    console.log(13);

    const NewbasketProduct = {
      ...basketProduct,
      count: 1
    };

    if (isAuth()) {
      loading.value = true;
      updateDoc(doc(db, "users", user.email), {
        basketProducts: arrayUnion(NewbasketProduct)
      }).then(() => {
        basketProducts.value.push(NewbasketProduct);
        loading.value = false;
      });
    } else {
      basketProducts.value.push(NewbasketProduct);
    }
  };

  const isInStock = (basketProductId: IBasketProduct["id"]) => {
    const basketProduct = basketProducts.value.find(
      (basketProduct) => basketProduct.id === basketProductId
    );

    if (!basketProduct) return;

    return !!basketProduct.inStock;
  };

  const incrementBasketProductCount = async (basketProductId: IBasketProduct["id"]) => {
    const basketProduct = basketProducts.value.find(
      (basketProduct) => basketProduct.id === basketProductId
    );

    if (!basketProduct) return;

    if (basketProduct.count <= basketProduct.inStock) {
      if (isAuth()) {
        const currentProductIndex = basketProducts.value.findIndex(
          (basketProduct) => basketProduct.id === basketProductId
        );

        basketProducts.value[currentProductIndex].count += 1;

        await updateDoc(doc(db, "users", user.email), {
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

        await updateDoc(doc(db, "users", user.email), {
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

      await updateDoc(doc(db, "users", user.email), {
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
    basketProducts,
    decrementBasketProductCount,
    fetchBasketProducts,
    incrementBasketProductCount,
    isInStock,
    removeBasketProduct
  };
});
