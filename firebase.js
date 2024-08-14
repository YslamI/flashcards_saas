// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvn8oHgW_TyJqCvssCy-zP7xxmLpctg3M",
  authDomain: "flashcards-saas-64b06.firebaseapp.com",
  projectId: "flashcards-saas-64b06",
  storageBucket: "flashcards-saas-64b06.appspot.com",
  messagingSenderId: "151470814234",
  appId: "1:151470814234:web:33a7ff4dea9ff63bcccda3",
  measurementId: "G-7B5YEPG8Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);