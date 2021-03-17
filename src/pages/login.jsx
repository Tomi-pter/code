import React from 'react';
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";

export const Login = () => {
    const submit = (e) => {
        e.preventDefault();
        console.log(e.target.username.value);
    }
    return (
        <>
            <Header />
            <div className="container-fluid login">
                <div className="container d-flex align-items-center justify-content-end">
                    <div className="card mb-0">
                        <div className="card-body">
                            <h3 className="text-center">Log in</h3>
                            <h4 className="text-center">Lorem Ipsum</h4>
                            <form className="text-right" onSubmit={submit}>
                                <Input
                                    label="Username"
                                    name="username"
                                    type ="text"
                                    // value={}
                                    // onChange={}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type ="password"
                                    // value={}
                                    // onChange={}
                                />
                                <button type="submit" className="btn">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
