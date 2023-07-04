import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY || "mock_key",
  appId: import.meta.env.VITE_APP_APP_ID,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  experimentalForceLongPolling: true,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  useFetchStreams: false
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
