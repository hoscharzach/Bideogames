import { useContext, createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithRedirect, inMemoryPersistence } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const getRandomAnswer = async () => {
        const response = await fetch('https://golang-test.onrender.com/random')
        if (response.ok) {
            const data = await response.json()
            return data.response
        }
    }

    /// alskdjfklasdf
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, user, logOut, getRandomAnswer }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
