import type { IAuthentication, ILogInForm } from "@/types";

import { db } from "@/services/vuefire";
import { useAuthenticationStore } from "@/store/authentication";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";

export const LogInFirebase = async ({ email, name, password, surname }: ILogInForm) => {
  const { setAuthentication } = useAuthenticationStore();
  const auth = getAuth();
  const user = ref<IAuthentication>();

  const addUserToFirebase = async (user: IAuthentication) => {
    return await setDoc(doc(db, "users", user.token), {
      ...user,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/bakerbrands-a4259.appspot.com/o/profileImages%2F%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8.jpg?alt=media&token=a70795a5-f832-424c-ad3c-e89cf0bd062d",
      basketProducts: [],
      boughtProducts: [],
      favoriteProducts: [],
      name,
      surname,
      wathedProducts: []
    });
  };

  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const currentUser = userCredential.user;

      const LogInUser = {
        email,
        id: currentUser.uid,
        password,
        token: currentUser.refreshToken
      };

      user.value = LogInUser;

      setAuthentication({ token: LogInUser.token });
    })
    .then(() => addUserToFirebase(user.value!));
};
