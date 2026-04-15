import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp4MdQR6qfTDg5LXfKuXrwpwF_gxBho5I",
  authDomain: "espacio-seguro-promart.firebaseapp.com",
  projectId: "espacio-seguro-promart",
  storageBucket: "espacio-seguro-promart.firebasestorage.app",
  messagingSenderId: "580081527194",
  appId: "1:580081527194:web:f74623b8bd85563f0fb223",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
