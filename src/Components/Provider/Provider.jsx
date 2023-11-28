import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



export const AuthContext = createContext(null);

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()


    const signUpUser = (email, password) => {
        setLoading();
        return createUserWithEmailAndPassword(auth, email, password);
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
            const info = {email : currentUser?.email}
            if(currentUser){
                axiosPublic.post('/jwt', info)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access', res.data.token)
                    }
                })
            }
            else{
               localStorage.removeItem('access')
            }
        });
        return ()=> {
            unsubscribe()
        }
    }, [axiosPublic])

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