import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKiDVSnhtlgBLLj_F0Zq9dzyaINzCW6RQ",
  authDomain: "luminaglow-318a8.firebaseapp.com",
  projectId: "luminaglow-318a8",
  storageBucket: "luminaglow-318a8.firebasestorage.app",
  messagingSenderId: "107433981546",
  appId: "1:107433981546:web:4a12c0b8bcf26986b6fc13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app, auth, provider };
export { createUserWithEmailAndPassword } from "firebase/auth";



