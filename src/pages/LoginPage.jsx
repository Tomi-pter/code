import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/auth';
import { Link } from "react-router-dom";
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";

const initialState = { email: '', password: '' };

export const LoginContainer = () => {
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(logIn(formData, history));
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
   
    return (
        <>
            <Header />
            <div className="container-fluid login">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="card mb-0">
                        <div className="card-body">
                            <h3 className="text-center">Log in</h3>
                            <h4 className="text-center">Lorem Ipsum</h4>
                            <form className="text-right" onSubmit={handleSubmit}>
                                <Input
                                    label="Username"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                <div className="signup-container d-flex align-items-center justify-content-center justify-content-md-between">
                                    <div className="d-none d-sm-block">
                                        <span className="signup-text">
                                            Don’t have an account? <Link to="/register">SIGN UP</Link>
                                        </span>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn submit-button">Submit</button>
                                    </div>
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
