import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDDDE6Vxsa-C15nKGvM4dKJaOd9nN5n8-I",
    authDomain: "dharma-darshana-ab7ad.firebaseapp.com",
    projectId: "dharma-darshana-ab7ad",
    storageBucket: "dharma-darshana-ab7ad.firebasestorage.app",
    messagingSenderId: "539617365592",
    appId: "1:539617365592:web:c4a2db3e8b4802798ec42d",
    measurementId: "G-X1MBD4PKTQ"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);



