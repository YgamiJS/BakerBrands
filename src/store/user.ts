import type { IUser } from "@/types";

import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = useStorage<IUser>("user", {
    email: "",
    id: "",
    password: "",
    token: ""
  });

  function $reset() {
    user.value = {
      email: "",
      id: "",
      password: "",
      token: ""
    };
  }

  function setUser(newUser: IUser) {
    user.value = newUser;
  }

  return { $reset, setUser, user };
});
