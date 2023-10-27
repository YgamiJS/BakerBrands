import type { IReview, IUser } from "@/types";

import { db } from "@/services/vuefire";
import { collection, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);

  async function getUserData(reviewerid: IReview["reviewerid"]) {
    try {
      loading.value = true;

      const fbProduct = await query(collection(db, "users"), where("id", "==", reviewerid));

      const data = await (await getDocs(fbProduct)).docs[0].data();

      loading.value = false;

      return { avatar: data.avatar, id: data.id, name: data.name, surname: data.surname } as IUser;
    } catch (err) {
      error.value = err;
    }
  }

  return { error, getUserData };
});
