import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZDUkihGMHtCnNJslxDgqjAGAXfcCewhw",
    authDomain: "ticketing-d66b7.firebaseapp.com",
    projectId: "ticketing-d66b7",
    storageBucket: "ticketing-d66b7.appspot.com",
    messagingSenderId: "612482612820",
    appId: "1:612482612820:web:4dfb3656babd8f7d10f7c1",
    measurementId: "G-6DKB1E90BV"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);