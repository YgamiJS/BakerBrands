import type { IAuthentication, IReview, IUser } from "@/types";

import { db } from "@/services/vuefire";
import { useStorage } from "@vueuse/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticationStore = defineStore("authentication", () => {
  const authentication = useStorage<IAuthentication>("authentication", {
    token: ""
  });
  const loading = ref<boolean>(false);
  const error = ref<any | null>(null);

  function $reset() {
    authentication.value = {
      token: ""
    };
  }

  function isAuth() {
    return !!authentication.value.token;
  }

  function setAuthentication(newAuthentication: IAuthentication) {
    authentication.value = newAuthentication;
  }

  return { $reset, authentication, error, isAuth, setAuthentication };
});
