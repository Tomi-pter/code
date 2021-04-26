import React, { useState, useEffect } from 'react';
import { Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { logOut } from '../actions/auth';

export const ProtectedRoutes = ({ component: Component, path, ...rest }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch(logOut(user?.email, history));
        setUser(null);
    };
    
    useEffect(() => {
        const token = user?.accessToken;
    
        if (token) {
          const decodedToken = decode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Route
            {...rest}
            render={(props) => {
                    return (
                        user ? <Component /> : <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
                    );
                }
            }
        />
    )
}