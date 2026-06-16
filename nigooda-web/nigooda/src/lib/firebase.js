import { initializeApp } from "firebase/app";
import {
getAuth,
GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyCWXe3Ro00BmsM0f3HfxzuGZMkKIemcuGA",
authDomain: "nigoodafinal.firebaseapp.com",
projectId: "nigoodafinal",
storageBucket: "nigoodafinal.firebasestorage.app",
messagingSenderId: "974026384342",
appId: "1:974026384342:web:cc294cde27da670354ba77",
};

const app = initializeApp(firebaseConfig);

/* AUTH */
export const auth = getAuth(app);

/* GOOGLE PROVIDER */
export const googleProvider = new GoogleAuthProvider();

/* FIRESTORE */
export const db = getFirestore(app);

export default app;
