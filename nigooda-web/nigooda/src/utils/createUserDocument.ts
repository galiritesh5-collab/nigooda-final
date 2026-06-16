import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { User } from "firebase/auth";

export const createUserDocument = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(
    userRef,
    {
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      credits: 5,
      plan: "free",
      totalScans: 0,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};