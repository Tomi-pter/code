import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { verifyAccount, resendCode } from '../../actions/auth';
import { Header } from '../partials/Header';
import { Footer } from '../partials/Footer';
import SignupImage from '../../assets/img/signup-img.png';

import Input from "../shared/input";

const initialState = { code: '' };

export const AccountVerification = ({ formData, setFormData }) => {
    const auth = useSelector((state) => state.auth);
    const email = formData.email;
    // const [formData, setFormData] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(verifyAccount(formData, history));
    }

    const handleResendCode = () => {
        setResendLoading(true);
        setFormData(initialState);
        dispatch(resendCode(email));
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(()=>{
        formData.code !== '' ? setIsDisabled(null) : setIsDisabled(true);
    },[formData]);

    useEffect(()=>{
        setIsLoading(false);
        setResendLoading(false);
    },[auth]);

    return (
        <div className="container-fluid d-flex align-items-center signup">
            <div className="container signup-wrapper">
                <div className="card mb-0">
                    <div className="d-flex">
                        <div className="form-container">
                            <h3>Sign Up</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form">
                                    <h4>Account Verification</h4>
                                    <p>Please verify your account so you can sign in. We’ve sent a confirmation code to {email}</p>
                                    <Input
                                        label="Confirmation Code"
                                        name="code"
                                        type="text"
                                        value={formData.code}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className={"text-center error "+(auth.verifyData?.message ? "alert-danger" : "")}>
                                        {auth.verifyData?.message}
                                    </p>
                                    <div className="d-flex align-items-center justify-content-end nav verify">
                                        <a href="#!" className="resend mr-5" onClick={handleResendCode}>
                                            {resendLoading ?
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <>
                                                    Resend Code
                                                </>
                                            }
                                        </a>
                                        <button className="submit" disabled={isDisabled}>
                                            {isLoading ?
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <>
                                                    Verify
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <img className="signup-img" src={SignupImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}