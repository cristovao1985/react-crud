// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAee5PYBkvyg1Tv_LpVYDesxY4zul3oVZA",
  authDomain: "condominio-c6613.firebaseapp.com",
  projectId: "condominio-c6613",
  storageBucket: "condominio-c6613.appspot.com",
  messagingSenderId: "868190587744",
  appId: "1:868190587744:web:23116c6c2d8a5a11bb2c05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

