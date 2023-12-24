import type { IAuthentication } from "@/types";

import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import { useBasketStore } from "./basket";
import { useOrdersStore } from "./bought";

export const useAuthenticationStore = defineStore("authentication", () => {
  const authentication = useStorage<IAuthentication>("authentication", {
    token: ""
  });

  const { clearBasketData } = useBasketStore();
  const { clearBoughtData } = useOrdersStore();

  function $reset() {
    authentication.value = {
      token: ""
    };
  }

  function logout() {
    clearBasketData();
    clearBoughtData();
    $reset();
  }

  function isAuth() {
    return !!authentication.value.token;
  }

  function setAuthentication(newAuthentication: IAuthentication) {
    authentication.value = newAuthentication;
  }

  return { $reset, authentication, isAuth, logout, setAuthentication };
});
