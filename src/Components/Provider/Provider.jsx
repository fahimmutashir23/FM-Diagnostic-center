import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";



export const AuthContext = createContext(null);

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const signUpUser = (email, password) => {
        setLoading();
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading();
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOutUser = () => {
        setLoading();
        return signOut(auth);
    }

    const updateUser = (profile) => {
        setLoading();
        return updateProfile(auth.currentUser, profile)
    }

    const userDelete = () => {
        setLoading();
        const deletedUser = auth.currentUser;
        return deleteUser(deletedUser)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return ()=> {
            unsubscribe()
        }
    }, [])

    const userInfo = {user, loading, signInUser, signUpUser, logOutUser, updateUser, userDelete}
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node
};

export default Provider;