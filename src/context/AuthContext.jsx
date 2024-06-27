import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const saveExpenses = async (expenses) => {
    if (currentUser) {
      await addDoc(collection(db, "expenses"), {
        ...expenses,
        userId: currentUser.uid,
        createdAt: new Date()
      });
    }
  };

  const getExpenses = async () => {
    if (currentUser) {
      const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    }
    return [];
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    saveExpenses,
    getExpenses
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
