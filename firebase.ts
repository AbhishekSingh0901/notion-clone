// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJh6qZQrp038dTqRIS3YV-PWzOZvFvywg",
  authDomain: "notion-clone-c93eb.firebaseapp.com",
  projectId: "notion-clone-c93eb",
  storageBucket: "notion-clone-c93eb.appspot.com",
  messagingSenderId: "868978512911",
  appId: "1:868978512911:web:441fc3c9f3bf451c907f7a",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
