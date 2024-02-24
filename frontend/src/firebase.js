import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


