import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ For Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBZdcUAWIoanxZKzVLj6qilV4028czM7I0",
  authDomain: "test-ara-aeeda.firebaseapp.com",
  databaseURL: "https://test-ara-aeeda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-ara-aeeda",
  storageBucket: "test-ara-aeeda.firebasestorage.app",
  messagingSenderId: "690718081867",
  appId: "1:690718081867:web:0e1e3c701fd6ef28661ece",
  measurementId: "G-W1HNVXV7HF"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);            // For Firestore
const auth = getAuth(app);               // For Authentication
const realTimeDB = getDatabase(app);           // ✅ For Realtime Database (correct URL)

export { db, auth, realTimeDB };
