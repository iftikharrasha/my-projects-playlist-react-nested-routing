import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import useAuth from '../Hooks/useAuth';
import Lottie from 'react-lottie';
import animationData from '../Image/loading.json';

const Login = () => {
    const { signInWithGoogle, isFetching } = useAuth();
    const history = useHistory();
    const location = useLocation();

    //google login
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    const defaultOptions = {
		loop: true,
		autoplay: true, 
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: 'xMidYMid slice'
		}
	};

	if (isFetching) { return <div className="loading">
								<div>
									<Lottie options={defaultOptions}
											height={100}
											width={100}/>
									<h2 className="bar--18 text--center">
										RASHA'21
									</h2>
								</div>
								</div> }

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