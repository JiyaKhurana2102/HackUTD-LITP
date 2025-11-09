//firebase-config.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZEcbt8jsnI0omKt-56rEjXXWDsRZybU4",
  authDomain: "cashquest-d4aec.firebaseapp.com",
  projectId: "cashquest-d4aec",
  storageBucket: "cashquest-d4aec.firebasestorage.app",
  messagingSenderId: "704348931797",
  appId: "1:704348931797:web:2120d180119329e986445c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
