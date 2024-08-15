// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.process.FIREBASE_API_KEY,
  authDomain: env.process.FIREBASE_DOMAIN,
  projectId: env.process.PROJECT,
  storageBucket: env.process.STORAGE,
  messagingSenderId: env.process.FIREBASE_SENDER_ID,
  appId: env.process.FIREBASE_APP_ID,
  measurementId: env.process.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app)

export {db}