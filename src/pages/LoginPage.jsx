import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, forgotPassword, confirmForgotPassword } from '../actions/auth';
import { AccountVerification } from '../components/login/AccountVerification';
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import { useForm } from "react-hooks-helper";

import Input from "../components/shared/input";
import decode from 'jwt-decode';

import CheckGreen from '../assets/icon/check-lgreen.svg';
import XGray from '../assets/icon/x-gray.svg';

const initialState = { email: '', password: '', code: '' };
const initialForgotState = { fEmail: '', password: '', passwordConfirmation: '', code: "" };


export const LoginContainer = () => {
    const auth = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(initialState);
    const [forgotFormData, setforgotFormData] = useForm(initialForgotState);
    const { fEmail, password, passwordConfirmation, code } = forgotFormData;
    const [submitted, setSubmitted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPass, setForgotpass] = useState(false);
    const [continueButton, setContinueButton] = useState(false);
    const [OTPButton, setOTPButton] = useState(false);
    const [OTP, setOTP] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    // const checkPasswordLenght = fNewPassword.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
    const checkNumber = /^(?=.*[0-9])/.test(password);
    const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(logIn(formData, history));
    }
    const submit = () => {
        setIsLoading(true);
        setSubmitted(true);
        dispatch(confirmForgotPassword(fEmail, {
            code: code,
            password: password,
            passwordConfirmation: passwordConfirmation
        }));
        // if (changePass.success == true) {
        //     setEmaillPass(true);
        //     console.log('emailPass', emailPass)
        // } else {
        //     setEmaillPass(false);
        //     setIsLoading(false);
        //     setErrorOldPass('Invalid Old Password');
        // }
    }
    const handFotgotPassword = () => {
        dispatch(forgotPassword(fEmail));
        setOTP(true);
        console.log(fEmail);
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleResetPassword = () => {
        setResetPassword(true);
        console.log(resetPassword);
    }
    useEffect(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const forgotEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotFormData.fEmail);
        emailCheck && formData.password !== '' ? setIsDisabled(null) : setIsDisabled(true);
        forgotEmailCheck && forgotFormData.fEmail != '' ? setContinueButton(null) : setContinueButton(true);
        forgotFormData.fCode != '' ? setOTPButton(null) : setOTPButton(true)

    }, [formData, forgotFormData]);

    useEffect(() => {
        setIsLoading(false);
        console.log(auth);
    }, [auth]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const token = user?.accessToken;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 > new Date().getTime()) history.push("/account");
        }

    }, [location]);

    return (
        <>
            <Header />
            {auth.authData?.accountStatus === "UNCONFIRMED" ?
                <AccountVerification formData={formData} setFormData={setFormData} />
                :
                <div className="container-fluid d-flex align-items-center login">
                    <div className="container d-flex align-items-center justify-content-end">
                        <div className="card mb-0">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                {
                                    forgotPass ? <div>
                                        <div className="forgotPassWrapper">
                                            {OTP ?
                                                <div className="codeWrapper">
                                                    <p>We’ve sent a confirmation code to {fEmail}</p>
                                                    <Input
                                                        label="Confirmation Code"
                                                        name="code"
                                                        type="text"
                                                        value={code}
                                                        onChange={setforgotFormData}
                                                        required
                                                    />
                                                    <div>
                                                        <div>
                                                            <h2 className="sub-title">Enter New Password</h2>
                                                            <div className="password-input form-group">
                                                                <label htmlFor="confirmNewPassword">New Password</label>
                                                                <Input
                                                                    label="Password"
                                                                    name="password"
                                                                    type="password"
                                                                    value={password}
                                                                    onChange={setforgotFormData}
                                                                />
                                                            </div>
                                                            <div className="password-input form-group">
                                                                <label htmlFor="confirmNewPassword">Confirm Password</label>
                                                                <Input
                                                                    label="Password"
                                                                    name="passwordConfirmation"
                                                                    type="password"
                                                                    value={passwordConfirmation}
                                                                    onChange={setforgotFormData}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-end emailSubmitWrapper">
                                                            <button className="continueButton" onClick={submit} disabled={isDisabled}>
                                                                {isLoading ?
                                                                    <div className="spinner-border text-light" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        Reset Password
                                            </>
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* <div className="emailSubmitWrapper">
                                                        <button className="continueButton" onClick={handleResetPassword} >Continue</button>
                                                    </div> */}
                                                </div> : <div>
                                                    <h2> Change Password</h2>
                                                    <p className="emailDesc">Enter the email address associated with your account and we’ll send you a code to confirm your password reset request.</p>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <Input
                                                            className="email-input "
                                                            label="Email"
                                                            name="fEmail"
                                                            type="email"
                                                            value={fEmail}
                                                            onChange={setforgotFormData}
                                                            required
                                                        />
                                                        <div className="emailSubmitWrapper">
                                                            <button className="continueButton" disabled={continueButton} onClick={handFotgotPassword}>Continue</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div> :
                                        <form onSubmit={handleSubmit}>
                                            <h3 className="text-center">Log in</h3>
                                            <h4 className="text-center">Lorem Ipsum</h4>
                                            <p className={"text-center error " + (auth.authData?.message ? "alert-danger" : "")}>
                                                {auth.authData?.message}
                                            </p>
                                            <Input
                                                label="Username"
                                                name="email"
                                                type="email"
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="forgot-pass d-flex justify-content-end">
                                                <a href="#" onClick={() => setForgotpass(true)}>Forgot Password?</a>
                                            </div>
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
                                }


                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    );
};
