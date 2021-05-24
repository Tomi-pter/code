import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hooks-helper";
import { Modal } from 'react-bootstrap';
import Input from "../shared/input";
import PasswordChangeIcon from '../../assets/img/Account/password-change.svg';
import { changePassword } from '../../actions/account';
import CheckGreen from '../../assets/icon/check-lgreen.svg';
import XGray from '../../assets/icon/x-gray.svg';

const defaultData = {
    oldPassword: "",
    newPassword: "",
};

export const Changepassword = () => {
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [emailPass, setEmaillPass] = useState(false);
    const [formData, setForm] = useForm(defaultData);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMess, setErrorOldPass] = useState("");
    const handleClose = () => setShowModal(false);
    const changePass = useSelector((state) => state.account.changePassword);
    const { oldPassword, newPassword } = formData;
    const checkPasswordLenght = newPassword.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(newPassword);
    const checkNumber = /^(?=.*[0-9])/.test(newPassword);
    const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(newPassword);
    const dispatch = useDispatch();

    const validation = useCallback(() => {
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(newPassword);
        oldPassword && newPassword && passwordCheck ? setDisabled(false) : setDisabled(true);
    }, [oldPassword, newPassword])

    const submit = () => {
        setIsLoading(true);
        dispatch(changePassword(user?.username, formData));
        if (changePass.success === true) {
            setEmaillPass(true);
            console.log('emailPass', emailPass)
        } else {
            setEmaillPass(false);
            setIsLoading(false);
            setErrorOldPass('Invalid Old Password');
        }
    }

    const resetSession = () => {
        localStorage.removeItem('profile')
        history.push('/');
    }

    useEffect(() => {
        if (changePass.success) {
            setEmaillPass(true);
        }
    }, [changePass]);

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
                        <button className="changePasswordButton" onClick={() => setShowModal(true)}>
                            Change Password
                        </button>
                    </div>
                </div>
                <Modal id="changePasswordModal" className="modalWrapper" show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        {emailPass ?
                            <div className="checkEmail-container d-flex align-items-center justify-content-center">
                                <div className="contentWrapper text-center">
                                    <img className="emailIcon" src={PasswordChangeIcon} />
                                    <h2>Password successfully updated</h2>
                                    <div className="emailSubmitWrapper">
                                        <button className="continueButton" onClick={resetSession}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
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
                                        <p className={"invalidPassword "}>{errorMess ? errorMess : ''}</p>

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
                                        <p className={"password-validation " + (checkPasswordLenght ? 'valid' : '')}>{checkPasswordLenght ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use 8 or more characters</p>
                                        <p className={"password-validation " + (checkLetters ? 'valid' : '')}>{checkLetters ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use upper and lower case letters</p>
                                        <p className={"password-validation " + (checkNumber ? 'valid' : '')}>{checkNumber ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use a number (e.g. 1234)</p>
                                        <p className={"password-validation " + (checkCharacter ? 'valid' : '')}>{checkCharacter ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} Use a symbol (e.g. !@#$)</p>

                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end nav">
                                    <button className="changePasswordButton" onClick={submit} disabled={isDisabled}>
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
                        }

                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
