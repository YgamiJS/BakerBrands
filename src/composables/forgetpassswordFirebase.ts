import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ForgetPasswordFirebase = async (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};
