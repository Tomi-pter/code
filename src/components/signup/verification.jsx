import React, {useState, useCallback, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from "../shared/input";
import { verifyAccount, resendCode } from "../../actions/auth";
import { useSelector } from 'react-redux';

const Verification = ({  setForm, formData }) => {
    const auth = useSelector((state) => state.auth);
    const { email, code } = formData;
    const [resendLoading, setResendLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(verifyAccount(formData, history));
    }

    const handleResendCode = () => {
        setResendLoading(true);
        dispatch(resendCode(email));
    }

    const validation = useCallback(() => {
       code !== "" ? setDisabled(false) : setDisabled(true);
    }, [code])

    useEffect(() => {
        validation();
    }, [validation]);

    useEffect(()=>{
        setIsLoading(false);
        setResendLoading(false);
    },[auth]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <h4>Account Verification</h4>
                <p>Please verify your account so you can sign in. We’ve sent a confirmation code to {email}</p>
                <Input
                    label="Confirmation Code"
                    name="code"
                    type="text"
                    value={code}
                    onChange={setForm}
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
    );
};

export default Verification;