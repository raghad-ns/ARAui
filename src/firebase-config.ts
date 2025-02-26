import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZdcUAWIoanxZKzVLj6qilV4028czM7I0",
  authDomain: "test-ara-aeeda.firebaseapp.com",
  projectId: "test-ara-aeeda",
  storageBucket: "test-ara-aeeda.firebasestorage.app",
  messagingSenderId: "690718081867",
  appId: "1:690718081867:web:0e1e3c701fd6ef28661ece",
  measurementId: "G-W1HNVXV7HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
