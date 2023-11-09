// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDyF2IwHq7HFTGu4fuCzw1PlznQ8quz4S0",
  authDomain: "brewerie-626a6.firebaseapp.com",
  projectId: "brewerie-626a6",
  storageBucket: "brewerie-626a6.appspot.com",
  messagingSenderId: "876698064079",
  appId: "1:876698064079:web:ab811f7addd3f4f752d3ba",
  measurementId: "G-SSRFYFMZ5M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);