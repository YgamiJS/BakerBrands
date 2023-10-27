import type { IAuthentication, ILogInForm } from "@/types";

import { db } from "@/services/vuefire";
import { useAuthenticationStore } from "@/store/authentication";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref } from "vue";

export const LogInFirebase = async ({ email, name, password, surname }: ILogInForm) => {
  const { setAuthentication } = useAuthenticationStore();
  const auth = getAuth();
  const user = ref<IAuthentication>();

  const addUserToFirebase = async (user: IAuthentication, token: string) => {
    await addDoc(collection(db, "users", token), {
      ...user,
      avatar: "",
      basketProducts: [],
      boughtProducts: [],
      favoriteProducts: [],
      name,
      surname,
      wathedProducts: []
    });
  };

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const currentUser = userCredential.user;
      const LogInUser = {
        email,
        id: currentUser.uid,
        password,
        token: currentUser.refreshToken
      };

      user.value = LogInUser;

      setAuthentication(LogInUser);

      return LogInUser.token;
    })
    .then((token) => addUserToFirebase(user.value!, token));
};
