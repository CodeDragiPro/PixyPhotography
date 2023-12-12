import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "pixie-photography.firebaseapp.com",
    projectId: "pixie-photography",
    storageBucket: "pixie-photography.appspot.com",
    messagingSenderId: "448301660308",
    appId: "1:448301660308:web:0d6206c823a779273c9c81"
};

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, setUser, setError);
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={{ user, error }} {...props} />;
}

export const useAuthState = () => {
    const auth = useContext(AuthContext);
    return { ...auth, isAuthenticated: auth.user != null };
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Erreur lors de la connexion avec Google:", error);
    }
}

export default app;
