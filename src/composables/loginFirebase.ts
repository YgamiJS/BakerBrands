import type { IUser } from "@/types";

import { useUserStore } from "@/store/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LogInFirebase = async ({ email, password }: Pick<IUser, "email" | "password">) => {
  const userStore = useUserStore();
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    userStore.setUser({
      email: user.email,
      id: user.id,
      password,
      token: user.token
    });
  });
};
