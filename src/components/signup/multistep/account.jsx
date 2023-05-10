import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../../actions/auth";

import {
    formatPhoneNumberIntl,
    isPossiblePhoneNumber,
} from "react-phone-number-input";

import Input from "../../shared/input";

import CheckGreen from "../../../assets/icon/check-lgreen.svg";
import XGray from "../../../assets/icon/x-gray.svg";

import moment from "moment";

export default function Account ({ formData, setFormData, navigation, onChange }) {
    const auth = useSelector((state) => state.auth);

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    
    const checkPasswordLength = formData.password.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
    const checkNumber = /^(?=.*[0-9])/.test(formData.password);
    const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(formData.password);
    const checkConfirmation = formData.password !== "" && formData.confirm_password.includes(formData.password);

    const dispatch = useDispatch();

    const submit = () => {
        setIsLoading(true);
        setSubmitted(true);
        //State License Number & Expiration is required
        let form = {
            ...formData,
            stateLicenseExpirationDate: moment(
                formData.stateLicenseExpirationDate
            ).format("YYYY-MM-DD"),
        };
        //DEA Number & Expiration is optional
        if (formData.deaExpiry !== "") {
            form.deaExpiry = moment(formData.stateLicenseExpirationDate).format(
                "YYYY-MM-DD"
            );
        }
    
        dispatch(signUp(form));
    };

    const validation = useCallback(() => {
		// const phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phoneNumber);
		const phoneCheck =
			formatPhoneNumberIntl(formData.phoneNumber) &&
			isPossiblePhoneNumber(formData.phoneNumber)
				? true
				: false;
        
        const checkState = formData.state === "" ? false : true;
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const passwordCheck =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(
            formData.password
        );
        const passwordConfirm = formData.password === formData.confirm_password ? true : false;

		formData.givenName &&
		formData.familyName &&
		formData.phoneNumber &&
		phoneCheck &&
		formData.company &&
		formData.address &&
		formData.city &&
		formData.postalCode &&
		formData.country &&
        checkState &&
		formData.state &&
		formData.apEmail &&
		formData.apContact &&
		formData.apPhone &&
		formData.methodOfCollection &&
        formData.email &&
        formData.password &&
        emailCheck &&
        passwordCheck &&
        passwordConfirm
			? setDisabled(false)
			: setDisabled(true);
	}, [formData]);

    useEffect(() => {
        validation();
    }, [validation])

    return (
		<div className="card mb-0">
			<div className="signup-header d-flex flex-column align-items-center justify-content-center">
				<h2 className="mb-0">Create Login</h2>
			</div>
			<div className="account-info d-flex flex-column">
				<div className="input-wrapper">
					<label>Email</label>
					<Input
						type="email"
						name="email"
						label="Enter your Email"
						value={formData.email}
						onChange={onChange}
					/>
				</div>
				<div className="input-wrapper">
					<label>Set Password</label>
					<Input
						type="password"
						name="password"
						label="Password"
						value={formData.password}
						onChange={onChange}
					/>
					<p className={ "password-validation " + (checkPasswordLength ? "valid" : "")}>
						{
                            checkPasswordLength
                                ? <img src={CheckGreen} alt="" />
                                : <img src={XGray} alt="" />
                        }{" "}
						Use 8 or more characters
					</p>
					<p className={ "password-validation " + (checkLetters ? "valid" : "") }>
						{
                            checkLetters
                                ? <img src={CheckGreen} alt="" />
                                : <img src={XGray} alt="" />
						}{" "}
						Use upper and lower case letters
					</p>
					<p className={"password-validation " + (checkNumber ? "valid" : "")}>
						{
                            checkNumber
                                ? <img src={CheckGreen} alt="" />
                                : <img src={XGray} alt="" />
						}{" "}
						Use a number (e.g. 1234)
					</p>
					<p className={"password-validation " + (checkCharacter ? "valid" : "")}>
						{
                            checkCharacter
                            ? <img src={CheckGreen} alt="" />
						    : <img src={XGray} alt="" />
						}{" "}
						Use a symbol (e.g. !@#$)
					</p>
				</div>
				<div className="input-wrapper">
					<label>Confirm Password</label>
					<Input
						type="password"
						name="confirm_password"
						label="Confirm Password"
						value={formData.confirm_password}
                        onChange={onChange}
					/>
                    <p className={"password-validation " + (checkConfirmation ? "valid" : "")}>
                        {
                            checkConfirmation
                            ? <>
                                <img src={CheckGreen} alt="" />
                                    Input password matched
                                </>
                            : <>
                                <img src={XGray} alt="" />
                                Input password does not matched
                            </>
                        }{" "}
                    </p>
				</div>
			</div>
			<div className="checkbox-container d-flex align-items-center">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    I accept{" "}
                    <a
                        target="_blank"
                        href="https://www.premierpharma.com/privacy-policy/"
                    >
                        Terms and Conditions
                    </a>
                </label>
			</div>
            <p
                className={
                    "text-center error " +
                    (auth.authData?.message ? "alert-danger" : "")
                }
            >
                {auth.authData?.message}
            </p>
			<div className="d-flex align-items-center justify-content-end nav">
                <button
                    className="next-btn"
                    onClick={submit}
                    disabled={isDisabled || !acceptTerms}
                >
                    {
                        isLoading
                        ? <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        : <>{"Complete Registration"}</>
                    }
                </button>
            </div>
		</div>
	);
}
