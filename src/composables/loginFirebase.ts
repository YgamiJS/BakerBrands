import type { IUser } from "@/types";

import { db } from "@/services/vuefire";
import { useUserStore } from "@/store/user";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref } from "vue";

export const LogInFirebase = async ({ email, password }: Pick<IUser, "email" | "password">) => {
  const { setUser } = useUserStore();
  const auth = getAuth();
  const user = ref<IUser>();

  const addUserToFirebase = async (user: IUser) => {
    await addDoc(collection(db, "users", email), {
      ...user,
      boughtProducts: [],
      favoriteProducts: []
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

      setUser(LogInUser);
    })
    .then(() => addUserToFirebase(user.value!));
};
