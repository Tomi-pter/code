import React, {useState, useCallback, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from "../shared/input";
import PrevIcon from "../../assets/icon/prev-green.svg";
import { signUp } from "../../actions/auth";

import { useSelector } from 'react-redux';

const Document = ({  setForm, formData, navigation }) => {
    const auth = useSelector((state) => state.auth);
    const { email, password } = formData;
    const { previous } = navigation;
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const submit = () => {
        setIsLoading(true);
        dispatch(signUp(formData, history));
    }

    const validation = useCallback(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        email && password && emailCheck && passwordCheck ? setDisabled(false) : setDisabled(true);
    }, [email, password])

    useEffect(() => {
        validation();
    }, [validation]);

    useEffect(()=>{
        setIsLoading(auth.Loading);
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
        <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={setForm}
        />
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

export default Document;