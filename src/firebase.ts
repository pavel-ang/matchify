// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjHRw...QeIQx-9XQ...FZDs", // от твоята конфигурация
  authDomain: "matchify-35df8.firebaseapp.com",
  projectId: "matchify-35df8",
  storageBucket: "matchify-35df8.appspot.com",
  messagingSenderId: "152451532884",
  appId: "1:152451532884:web:620f481eec1ca1a92245c1",
  measurementId: "G-ESYBVSBYGM"
};

export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);

