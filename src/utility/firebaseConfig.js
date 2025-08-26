// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU31HjwIIzSXZuzpQF_8DNexWxvRs6BJQ",
  authDomain: "tick-tock-store.firebaseapp.com",
  projectId: "tick-tock-store",
  storageBucket: "tick-tock-store.firebasestorage.app",
  messagingSenderId: "812067682178",
  appId: "1:812067682178:web:62a3ac8ced454ddc78c19b",
  measurementId: "G-1TVZ8SCNWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export { app as firebaseApp, db, auth}