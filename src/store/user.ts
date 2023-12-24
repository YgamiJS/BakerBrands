import type { IProfileForm, IReview, IUser } from "@/types";

import { db, storageRef } from "@/services/vuefire";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref as firebaseRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useUserStore = defineStore("user", () => {
  const userData = ref<IUser>({ avatar: "", id: "", name: "", surname: "" });
  const { authentication } = useAuthenticationStore();
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

  async function changeUserInfo(data: IProfileForm) {
    await changeUserDataField("name", data.name);
    await changeUserDataField("surname", data.surname);
    await getUserInfo();
  }

  async function changeUserDataField(field: string, data: any) {
    await updateDoc(doc(db, "users", authentication.token), {
      [field]: data
    });
  }

  async function getUserInfo() {
    try {
      loading.value = true;

      const data = await (await getDoc(doc(db, "users", authentication.token))).data()!;

      userData.value = {
        avatar: data.avatar,
        id: data.id,
        name: data.name,
        surname: data.surname
      } as IUser;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  }

  async function changeAvatar(file: File) {
    try {
      loading.value = true;

      const profileImagesRef = firebaseRef(storageRef, `profileImages/${file.name}`);

      await uploadBytes(profileImagesRef, file);

      const url = await getDownloadURL(profileImagesRef);

      await changeUserDataField("avatar", url);

      await getUserInfo();

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  }

  return { changeAvatar, changeUserInfo, error, getUserData, getUserInfo, loading, userData };
});
