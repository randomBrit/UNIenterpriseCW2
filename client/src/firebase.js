import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW1sCSW91kAIFdIvS70oy0ibLFfRYWZTY",
  authDomain: "microfiction-library-cls-cw.firebaseapp.com",
  projectId: "microfiction-library-cls-cw",
  storageBucket: "microfiction-library-cls-cw.firebasestorage.app",
  messagingSenderId: "763481741706",
  appId: "1:763481741706:web:318b28ae72c462e0b55073"
};

//this stopped working at some point
//#const firebaseConfig = {
//#    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//#    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//#    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//#    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//#    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//#    appId: process.env.REACT_APP_FIREBASE_APP_ID,
//#  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };