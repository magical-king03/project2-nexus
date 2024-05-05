// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE-UbiEITCPPChkYzrhPwH6llXU0IxGOU",
  authDomain: "social-media-users-47cdd.firebaseapp.com",
  databaseURL: "https://social-media-users-47cdd-default-rtdb.firebaseio.com",
  projectId: "social-media-users-47cdd",
  storageBucket: "social-media-users-47cdd.appspot.com",
  messagingSenderId: "781380431896",
  appId: "1:781380431896:web:93616b1ac8b3b98185136d",
  measurementId: "G-2LX0QM340C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const email_auth = getAuth();
const provider = new GoogleAuthProvider();
export { app, auth, provider }