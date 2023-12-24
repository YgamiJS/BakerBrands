import type { IBoughtProduct, IOrder, IOrderData, IProduct } from "@/types";
import type { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";

import { db } from "@/services/vuefire";
import { uuid } from "@/utils";
import { useStorage } from "@vueuse/core";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";
import { useBasketStore } from "./basket";
import { useCurrentOrderStore } from "./currentOrder";

export const useOrdersStore = defineStore("boughts", () => {
  const orderProducts = useStorage<IOrder[]>("order", []);
  const { clearBasketProducts } = useBasketStore();
  const orderProductsData = ref<IOrderData[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);
  const { authentication, isAuth } = useAuthenticationStore();
  const { setCurrentOrder } = useCurrentOrderStore();

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
        transferDate: new Date()
          .setDate(new Date().getDate() >= 31 ? 1 : new Date().getDate() + 1)
          .toString()
      };

      if (isAuth()) {
        loading.value = true;

        updateDoc(doc(db, "users", authentication.token), {
          boughtProducts: arrayUnion(NewPlacingOrder)
        });

        loading.value = false;
      }

      orderProducts.value.push(NewPlacingOrder);

      setCurrentOrder(NewPlacingOrder);

      boughtProducts.forEach(async (item) => {
        let count = await (await getDoc(doc(db, "products", item.id))).data()!.count;

        count -= item.count;

        await updateDoc(doc(db, "products", item.id), {
          count
        });
      });

      await clearBasketProducts();
    } catch (err) {
      error.value = err;
    }
  };

  const fetchBoughtProducts = async () => {
    try {
      const fbBoughtProducts = await getDoc(doc(db, "users", authentication.token));

      orderProducts.value = (await fbBoughtProducts.data()!.boughtProducts) as IOrder[];
    } catch (err) {
      error.value = err;
    }
  };

  const getBoughtProducts = async () => {
    try {
      if (!isAuth()) return;

      loading.value = true;

      const fbBasketProductsStore = await getDoc(doc(db, "users", authentication.token));

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
    clearBoughtData,
    fetchBoughtProducts,
    getBoughtProducts,
    loading,
    orderProducts,
    orderProductsData
  };
});
