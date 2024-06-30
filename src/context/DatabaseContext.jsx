import { createContext, useContext } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const DatabaseContext = createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const { currentUser } = useAuth();

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
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
  };

  const updateExpense = async (id, updatedExpense) => {
    await updateDoc(doc(db, "expenses", id), updatedExpense);
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const value = {
    saveExpenses,
    getExpenses,
    updateExpense,
    deleteExpense
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
