// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDEjd_7d347iiIGADsVflTykiybtNZhKU",
  authDomain: "shelfdeck-7d7a6.firebaseapp.com",
  projectId: "shelfdeck-7d7a6",
  storageBucket: "shelfdeck-7d7a6.firebasestorage.app",
  messagingSenderId: "734242297145",
  appId: "1:734242297145:web:ce1d6560951b25558084e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
