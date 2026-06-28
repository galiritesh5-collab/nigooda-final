import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, createUserDocument } from "../lib/firebase";

interface UserData {
  name: string;
  email: string;
  photoURL: string;
  credits: number;
  plan: string;
  totalScans: number;
  createdAt: any;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      try {
        if (user) {
          const userRef = doc(db, "users", user.uid);

          let snap = await getDoc(userRef);

          // Auto-create user document if missing
          if (!snap.exists()) {
            console.log("User document missing. Creating...");

            await createUserDocument(user);

            snap = await getDoc(userRef);
          }

          console.log("AUTH USER:", user.uid);
          console.log("USER DOC EXISTS:", snap.exists());

          setUserData(
            snap.exists() ? (snap.data() as UserData) : null
          );
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("AuthContext: failed to load user data", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;