import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import useAuth from '../Hooks/useAuth';

const Login = () => {
    const { signInWithGoogle, logoutUser } = useAuth();
    const history = useHistory();
    const location = useLocation();
    console.log(history, location);

    //google login
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <>
            <Header/>
            <div className="login__page base">
                <div className="account__creation">
                    <h3 className="text--center reg--24">Sign in with google to enter the dashboard! 😃</h3>

                    <div className="social__login">
                        <button onClick={handleGoogleSignIn}>
                            <img src="https://rh-london.web.app/static/media/google.154ddb64.svg" alt="google"/>
                            <span className="reg--24">Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Login;