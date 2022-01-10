import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
	const { loggedInUser, isFetching } = useAuth();
	console.log(isFetching);

    return (
        <Route
			{...rest}
			render={({ location }) =>
				loggedInUser.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/playlist',
							state: { from: location }
						}}
					/>
				)}
		/>
    );
};

export default PrivateRoute;