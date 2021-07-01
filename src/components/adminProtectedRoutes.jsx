import React, { useState, useEffect } from 'react';
import { Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { logOut } from '../actions/auth';

export const AdminProtectedRoutes = ({ component: Component, path, ...rest }) => {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // const logout = () => {
    //     dispatch(logOut(user?.username, history));
    //     setAdmin(null);
    // };
    
    useEffect(() => {
        // const token = user?.accessToken;
    
        // if (token) {
        //   const decodedToken = decode(token);
        //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        // }
    
        setAdmin(JSON.parse(localStorage.getItem('admin')));
    }, [location]);

    return (
        <Route
            {...rest}
            render={(props) => {
                    return (
                        admin ? <Component {...rest} /> : <Redirect to={{ pathname: "/admin/login", state: { from: props.location }}} />
                    );
                }
            }
        />
    )
}