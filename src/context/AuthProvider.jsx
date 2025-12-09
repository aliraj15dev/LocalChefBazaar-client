import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const createUser=(email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const forgotPassword=(email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    const logoutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile=(profile)=>{
      return updateProfile(auth.currentUser, profile)
    }

    const handleProfileUpdate = (name, photo) =>{
        const profile = {
            displayName: name,
            photoURL: photo
        };
        setUser(profile)
        const currentUser = auth.currentUser
        return updateProfile(currentUser, profile).then(() => {
            setUser({ ...auth.currentUser });
        });
  };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        setLoading(false)
    })
    return ()=>{unsubscribe()}
    },[])

    const authInfo = {
        user, setUser, handleProfileUpdate, createUser, signInUser,logoutUser, loading, setLoading, forgotPassword,updateUserProfile
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;