import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import toast from 'react-hot-toast';
import initializeFirebase from "../Firebase/firebase.init";
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

initializeFirebase();
const useFirebase = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isFetching, setFetching] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = (location, history) => {
        setFetching(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            // console.log(user);
            const {displayName, email, photoURL, accessToken} = user;

            //upset to database for new user
            saveUser(user.email, user.displayName, user.photoURL, user.accessToken, 'PUT');

            localStorage.setItem('token', accessToken);
            setAuthError('');
            const signedInUser = {
                isSignedIn: true,
                email: email,
                photo: photoURL,
                success: true,
                name: displayName
            };
            // setAuthToken();
            setLoggedInUser(signedInUser);
            const destination = location?.state?.from || '/playlist';
            history.replace(destination);
            toast.success("Successfully signed in!", {
                position: "bottom-center"
            });
        }).catch((error) => {
            setAuthError(error.message);
        })
        .finally(() => setFetching(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (loggedInUser) => {
            const token = localStorage.getItem('token');
            if(token) {
                const {name, email, picture} = jwt_decode(token);
                const decodedUser = {
                    isSignedIn: true,
                    email: email,
                    photo: picture,
                    success: true,
                    name: name
                }
                setLoggedInUser(decodedUser);
            } else {
                setLoggedInUser({})
            }
            setFetching(false);
        });
        return () => unsubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://still-peak-02811.herokuapp.com/subscribers/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [loggedInUser.email])

    const logoutUser = () => {
        setFetching(true);
        signOut(auth).then((res) => {
            localStorage.removeItem('token');
            setLoggedInUser({});
            toast.success("Successfully signed out!", {
                position: "bottom-center"
            });
        }).catch((error) => {
            console.log(error);
        })
        .finally(() => setFetching(false));
    }

    const saveUser = (email, displayName, photoURL, accessToken, method) => {
        const user = { email, displayName, photoURL, accessToken };
        fetch('https://still-peak-02811.herokuapp.com/subscribers', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    } 

    return {
        admin,
        isFetching,
        loggedInUser,
        logoutUser,
        signInWithGoogle,
        authError,
    }
}

export default useFirebase;