import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWXe3Ro00BmsM0f3HfxzuGZMkKIemcuGA",
  authDomain: "nigoodafinal.firebaseapp.com",
  projectId: "nigoodafinal",
  storageBucket: "nigoodafinal.firebasestorage.app",
  messagingSenderId: "974026384342",
  appId: "1:974026384342:web:cc294cde27da670354ba77",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export async function createUserDocument(user: User): Promise<void> {
  try {
    console.log("START createUserDocument", user.uid);

    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        name: user.displayName ?? "",
        email: user.email ?? "",
        photoURL: user.photoURL ?? "",
        credits: 5,
        plan: "free",
        totalScans: 0,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    console.log("END createUserDocument");
  } catch (error) {
    console.error("CREATE USER DOC FAILED", error);
  }
}

export default app;