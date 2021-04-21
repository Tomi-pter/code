import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { verifyAccount, resendCode } from '../actions/auth';

import Input from "../components/shared/input";

const initialState = { code: '' };

export default props => {
    const auth = useSelector((state) => state.auth);
    const email = auth.authData?.email ? auth.authData?.email : auth.authData?.user?.username;
    const [formData, setFormData] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(verifyAccount({...formData, email}, history));
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
        if (!auth.authData?.email && !auth.authData?.user?.username) {
            history.push('/login')
        }
        setIsLoading(false);
        setResendLoading(false);
    },[auth]);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center account-verification-container">
            <div className="card w-50">
                {/* <div className="card-header">
                    Account verification
                </div> */}
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h2>Account verification...</h2>
                        <p>Please verify your account so you can sign in. We've sent a confirmation code to {email}</p>
                        <p className={"text-center error "+(auth.verifyData?.message ? "alert-danger" : "")}>
                            {auth.verifyData?.message}
                        </p>
                        <Input
                            label="Confirmation Code"
                            name="code"
                            type="text"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="w-100 btn btn-primary" disabled={isDisabled}>
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
                    </form>
                </div>
                <div className="card-footer text-right">
                    <a href="#!" onClick={handleResendCode} >
                        {resendLoading ?
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <>
                                Resend Code
                            </>
                        }
                    </a>
                </div>
            </div>
        </div>
    )
}