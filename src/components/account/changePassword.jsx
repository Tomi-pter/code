import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hooks-helper";
import Input from "../shared/input";
import CheckEmailIcon from '../../assets/img/Account/check-email.svg';
import { changePassword } from '../../actions/account';

const defaultData = {
    oldPassword: "",
    newPassword: "",
};
export const Changepassword = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [emailPass, setEmaillPass] = useState(false);
    const [formData, setForm] = useForm(defaultData);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { oldPassword, newPassword } = formData;
    const dispatch = useDispatch();
    // const passwordRequest = () => {
    //     setEmaillPass(true);
    // }
    const validation = useCallback(() => {
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(newPassword);
        passwordCheck ? setDisabled(false) : setDisabled(true);
    }, [oldPassword, newPassword])
    const submit = () => {
        setIsLoading(true);
        setSubmitted(true);
        dispatch(changePassword(user?.username, formData));
        console.log(formData);
    }
    useEffect(() => {
        validation();
    }, [validation]);
    return (
        <>
            <div className="changePasswordWrapper">
                <h2 className="sub-title">Login Details</h2>
                <div className="password-wrapper d-flex align-items-center justify-content-between">
                    <div className="pl-5">
                        Password
                    </div>
                    <div>
                        <button className="changePasswordButton" data-toggle="modal" data-target="#changePasswordModal">
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div>
                                    <h2 className="sub-title">Enter New Password</h2>
                                    <div className="password-input form-group">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <Input
                                            label="Old Password"
                                            name="oldPassword"
                                            type="password"
                                            value={oldPassword}
                                            onChange={setForm}
                                        />
                                    </div>
                                    <div className="password-input form-group">
                                        <label htmlFor="confirmNewPassword">New Password</label>
                                        <Input
                                            label="Password"
                                            name="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={setForm}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end nav">
                                    <button className="submit" onClick={submit} disabled={isDisabled}>
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
                                {/* request change password */}
                                {/* {emailPass ?
                                    <div className="checkEmail-container d-flex align-items-center justify-content-center">
                                        <div className="contentWrapper text-center">
                                            <img className="emailIcon" src={CheckEmailIcon} />
                                            <h2>Please check your email</h2>
                                            <p>Instructions to reset your password was sent to your email. </p>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <h2 className="sub-title">Change Password</h2>
                                        <p className="emailDesc">Enter the email address associated with your account and we’ll send you a link to reset your password.</p>
                                        <div className="email-input form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" id="email" type="email" name="email" placeholder="Email" />
                                        </div>
                                        <div className="emailSubmitWrapper">
                                            <button className="continueButton" onClick={passwordRequest}>Continue</button>
                                        </div>
                                    </div>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
