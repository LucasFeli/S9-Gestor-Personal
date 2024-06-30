import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhzDc6YpJBLZPC0OpJABahC-FkLbddnKE",
  authDomain: "gestor-gastos-personales.firebaseapp.com",
  projectId: "gestor-gastos-personales",
  storageBucket: "gestor-gastos-personales.appspot.com",
  messagingSenderId: "646846571673",
  appId: "1:646846571673:web:b24e1788c3a164c5dec408"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };