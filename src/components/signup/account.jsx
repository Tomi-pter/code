import React, {useState, useCallback, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from "../shared/input";
import PrevIcon from "../../assets/icon/prev-green.svg";
import { signUp } from "../../actions/auth";
import { useSelector } from 'react-redux';

import CheckGreen from '../../assets/icon/check-lgreen.svg';
import XGray from '../../assets/icon/x-gray.svg';

const Account = ({  setForm, formData, navigation }) => {
    const auth = useSelector((state) => state.auth);
    const { email, password, confirm_password } = formData;
    const { previous, next } = navigation;
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const checkPasswordLenght = password.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
    const checkNumber = /^(?=.*[0-9])/.test(password);
    const checkCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    
    const submit = () => {
        setIsLoading(true);
        setSubmitted(true);
        dispatch(signUp(formData, history));
    }

    const validation = useCallback(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/.test(password);
        const passwordConfirm = password === confirm_password ? true : false;
        email && password && emailCheck && passwordCheck && passwordConfirm ? setDisabled(false) : setDisabled(true);
    }, [email, password, confirm_password])

    useEffect(() => {
        validation();
    }, [validation]);

    useEffect(()=>{
        setIsLoading(false);
        if(!auth.authData?.message && submitted) { 
            next() 
        } else {
            setSubmitted(false);
        };
    },[auth]);

    return (
        <div className="form">
            <h4>Account</h4>
            <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setForm}
            />
            <div className="password-container">
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={setForm}
                />
                <p className={"password-validation " + (checkPasswordLenght ? 'valid' : '')}>{checkPasswordLenght ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use 8 or more characters</p>
                <p className={"password-validation " + (checkLetters ? 'valid' : '')}>{checkLetters ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use upper and lower case letters</p>
                <p className={"password-validation " + (checkNumber ? 'valid' : '')}>{checkNumber ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use a number (e.g. 1234)</p>
                <p className={"password-validation " + (checkCharacter ? 'valid' : '')}>{checkCharacter ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use a symbol (e.g. !@#$)</p>
                <Input
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    value={confirm_password}
                    onChange={setForm}
                />
            </div>
            <p className={"text-center error "+(auth.authData?.message ? "alert-danger" : "")}>
                {auth.authData?.message}
            </p>
            <div className="d-flex align-items-center justify-content-end nav">
                <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
                <button className="submit" onClick={submit} disabled={isDisabled}>
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
        </div>
    );
};

export default Account;