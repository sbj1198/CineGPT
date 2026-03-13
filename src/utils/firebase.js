// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "cinegpt-a3e47.firebaseapp.com",
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: "cinegpt-a3e47.firebasestorage.app",
  messagingSenderId: "751104506617",
  appId: "1:751104506617:web:5862f53280b5092a290028",
  measurementId: "G-F1LQ944T0L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
