import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    async function logIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function signUp(email, username, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/validateusername", {
                username
            });
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/signup", {
                userRecord: auth.currentUser,
                username
            });
        }
        catch (error){
            //TODO: better error handling
            console.error("Failed to sign up: " + error);
        }

    }
    async function logOut() {
        await signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, logOut, loading }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}