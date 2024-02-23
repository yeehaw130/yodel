// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlzUmRlKVkG3jfxALCXgpWylaP-Yq56ZA",
  authDomain: "yodel-ddf77.firebaseapp.com",
  databaseURL: "https://yodel-ddf77-default-rtdb.firebaseio.com",
  projectId: "yodel-ddf77",
  storageBucket: "yodel-ddf77.appspot.com",
  messagingSenderId: "996360640691",
  appId: "1:996360640691:web:83848df00b44f26452f8c6",
  measurementId: "G-FGDYMB9BR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;