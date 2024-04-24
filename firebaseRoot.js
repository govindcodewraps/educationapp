// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/compat/app';
import { initializeFirestore } from 'firebase/compat/firestore';
import { getAuth } from 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAap9CXG-OheslUQ4FURTAsQdxNn9PUHxw",
  authDomain: "education-39c9e.firebaseapp.com",
  projectId: "education-39c9e",
  storageBucket: "education-39c9e.appspot.com",
  messagingSenderId: "824944792248",
  appId: "1:824944792248:web:89a0a302e100afb596da4d",
  measurementId: "G-Q95GQF5SBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const MyFBAuth = getAuth(app);
const MyFBDB = initializeFirestore(app, {experimentalForceLongPolling: true});

export default {MyFBAuth, MyFBDB};