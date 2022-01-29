import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Lottie from 'react-lottie';
import animationData from '../../Image/loading.json';

const PrivateRoute = ({ children, ...rest }) => {
	const { loggedInUser, isFetching } = useAuth();

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
        <Route
			{...rest}
			render={({ location }) =>
				loggedInUser.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
    );
};

export default PrivateRoute;