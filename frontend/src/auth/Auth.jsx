import { auth } from "../firebase";
import {
    getAuth,
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
        const auth = getAuth();
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/validateusername", {
                username
            });
        } catch (error) {
            throw new Error("Username validation failed: " + (error.response?.data || error.message));
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/signup", {
                token,
                email,
                username
            });
        }
        catch (error){
            throw new Error("Signup failed: " + (error.response?.data || error.message));
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