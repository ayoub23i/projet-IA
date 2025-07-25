// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3CVWyUfaBONDr-pREqc3bovfwZDIFZg8",
  authDomain: "test-606ba.firebaseapp.com",
  projectId: "test-606ba",
  storageBucket: "test-606ba.firebasestorage.app",
  messagingSenderId: "715786532295",
  appId: "1:715786532295:web:373475a8b97c79fe3055e2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
