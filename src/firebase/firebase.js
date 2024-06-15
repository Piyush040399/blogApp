// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrzQW8R2y9HtmAB2Xugm_YRi2BacqbF0U",
    authDomain: "blog-app-29294.firebaseapp.com",
    projectId: "blog-app-29294",
    storageBucket: "blog-app-29294.appspot.com",
    messagingSenderId: "603429610825",
    appId: "1:603429610825:web:92096151b3159ddacce698"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
