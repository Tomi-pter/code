import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export const LoginContainer = ({ setToken }) => {
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
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
                                    name="username"
                                    type="text"
                                    onChange={e => setUserName(e.target.value)}
                                // value={}
                                // onChange={}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                // value={}
                                // onChange={}
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
LoginContainer.propTypes = {
    setToken: PropTypes.func.isRequired
}
