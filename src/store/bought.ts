import type { IBoughtProduct, IOrder, IOrderData, IReviewOrder } from "@/types";
import type { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";

import { db, storageRef } from "@/services/vuefire";
import { uuid } from "@/utils";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as firebaseRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";
import { useBasketStore } from "./basket";
import { useCurrentOrderStore } from "./currentOrder";
import { useUserStore } from "./user";

export const useOrdersStore = defineStore("boughts", () => {
  const orderProducts = useStorage<IOrder[]>("order", []);
  const { clearBasketProducts } = useBasketStore();
  const orderProductsData = ref<IOrderData[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<any | null>(null);
  const auth = useAuthenticationStore();
  const { setCurrentOrder } = useCurrentOrderStore();
  const { changeUserDataField, getUserIntelligence } = useUserStore();

  const addBoughtProducts = async (
    deliveryOrganization: deliveryOrganizations,
    boughtProducts: IBoughtProduct[]
  ) => {
    try {
      const NewPlacingOrder: IOrder = {
        boughtProducts,
        deliveryOrganization,
        id: uuid(),
        startDate: new Date().toString(),
        status: 0,
        transferDate: new Date(
          new Date().setDate(new Date().getDate() >= 31 ? 1 : new Date().getDate() + 1)
        ).toString()
      };

      if (auth.isAuth()) {
        loading.value = true;

        updateDoc(doc(db, "users", auth.authentication.token), {
          boughtProducts: arrayUnion(NewPlacingOrder)
        });

        loading.value = false;
      }

      orderProducts.value.push(NewPlacingOrder);

      setCurrentOrder(NewPlacingOrder);

      boughtProducts.forEach(async (item) => {
        let inStock = await (await getDoc(doc(db, "products", item.id))).data()!.inStock;

        inStock -= item.count;

        await updateDoc(doc(db, "products", item.id), {
          inStock
        });
      });

      await clearBasketProducts();
    } catch (err) {
      error.value = err;
    }
  };

  const addReview = async (review: IReviewOrder, id: string) => {
    const images: string[] = await Promise.all(
      review.images.map(async (file) => {
        const profileImagesRef = firebaseRef(storageRef, `productsReviesImages/${file.name}`);

        await uploadBytes(profileImagesRef, file);

        return await getDownloadURL(profileImagesRef);
      })
    );

    const reviewerid = await (await getUserIntelligence()).id;

    await updateDoc(doc(db, "products", id), {
      reviews: arrayUnion({
        ...review,
        id: uuid(),
        images,
        reviewerid
      })
    });
  };

  const changeDevilieryStatus = async () => {
    try {
      [...orderProductsData.value, ...orderProducts.value].forEach((item) => {
        if (item.status >= 3) return;

        item.status += 1;
      });

      await updateDoc(doc(db, "users", auth.authentication.token), {
        boughtProducts: orderProducts.value
      });
    } catch (err) {
      error.value = err;
    }
  };

  const fetchBoughtProducts = async () => {
    try {
      const fbBoughtProducts = await getDoc(doc(db, "users", auth.authentication.token));

      orderProducts.value = (await fbBoughtProducts.data()!.boughtProducts) as IOrder[];
    } catch (err) {
      error.value = err;
    }
  };

  const removeBougthtProduct = async (id: string) => {
    try {
      orderProductsData.value = orderProductsData.value.filter((item) => item.id !== id);
      orderProducts.value = orderProducts.value.filter((item) => item.id !== id);

      loading.value = true;

      await changeUserDataField("boughtProducts", orderProducts.value);

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const getBoughtProducts = async () => {
    try {
      if (!auth.isAuth()) return;

      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", auth.authentication.token));

      const data: IOrder[] = (await fbBasketProductsStore.data()!.boughtProducts) as IOrder[];

      const newData: any[] = data;

      for (const elem of newData) {
        const some = await Promise.all(
          elem.boughtProducts.map(async (item: IBoughtProduct) => {
            const data1 = await (await getDoc(doc(db, "products", item.id))).data();

            return { ...data1, ...item };
          })
        );

        elem.boughtProducts = some;
      }

      orderProductsData.value = newData;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const clearBoughtData = () => {
    orderProducts.value = [];
  };

  return {
    addBoughtProducts,
    addReview,
    changeDevilieryStatus,
    clearBoughtData,
    error,
    fetchBoughtProducts,
    getBoughtProducts,
    loading,
    orderProducts,
    orderProductsData,
    removeBougthtProduct
  };
});
