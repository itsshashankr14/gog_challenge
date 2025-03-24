// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrPiNnflSwnAStk8yzJPt7tXCmzmoLALs",
  authDomain: "dharmadarshan-a5b3f.firebaseapp.com",
  projectId: "dharmadarshan-a5b3f",
  storageBucket: "dharmadarshan-a5b3f.firebasestorage.app",
  messagingSenderId: "249004209474",
  appId: "1:249004209474:web:6bbedc440c8b9e79e684db",
  measurementId: "G-BGFZ3205VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
