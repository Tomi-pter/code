import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/auth';
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";

import { useSelector } from 'react-redux';

const initialState = { email: '', password: '' };

export const LoginContainer = () => {
    const auth = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(logIn(formData, history));
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(()=>{
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        emailCheck && formData.password != '' ? setIsDisabled(null) : setIsDisabled(true);
    },[formData]);

    useEffect(()=>{
        setIsLoading(false);
    },[auth]);
   
    return (
        <>
            <Header />
            <div className="container-fluid d-flex align-items-center login">
                <div className="container d-flex align-items-center justify-content-end">
                    <div className="card mb-0">
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center">Log in</h3>
                                <h4 className="text-center">Lorem Ipsum</h4>
                                <p className={"text-center error "+(auth.authData?.message ? "alert-danger" : "")}>
                                    {auth.authData?.message}
                                </p>
                                <Input
                                    label="Username"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="signup-container d-flex align-items-center justify-content-between">
                                    <div className="d-none d-sm-block">
                                        <span className="signup-text">
                                            Don’t have an account? <Link to="/register">SIGN UP</Link>
                                        </span>
                                    </div>
                                    <button type="submit" className="btn submit-button" disabled={isDisabled}>
                                        {isLoading ?
                                            <div className="spinner-border text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <>
                                                Submit
                                            </>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
