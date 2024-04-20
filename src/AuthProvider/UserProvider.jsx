import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types'


export const UserContext = createContext(null)

const UserProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleSignOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const resetPassword = (email) =>{
        console.log(email)
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
    }

    const GoogleSignIn = () =>{
        setLoading(true)
        signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])
    console.log(loading);
    const data = {
        user,
        createUser,
        LoginUser,
        handleSignOut,
        resetPassword,
        GoogleSignIn,
        loading
    }

    
    return (
        <UserContext.Provider value={data}>
            {
                children
            }
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;