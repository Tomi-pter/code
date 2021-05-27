import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Input from "../shared/input";
import PasswordChangeIcon from '../../assets/img/Account/password-change.svg';
import { changePassword } from '../../actions/account';
import CheckGreen from '../../assets/icon/check-lgreen.svg';
import XGray from '../../assets/icon/x-gray.svg';
import { logOut } from '../../actions/auth';

const defaultData = {
    oldPassword: "",
    newPassword: "",
};

export const Changepassword = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const account = useSelector((state) => state.account);
    const [emailPass, setEmaillPass] = useState(false);
    const [formData, setFormData] = useState(defaultData);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMess, setErrorOldPass] = useState("");
    const checkPasswordLenght = formData.newPassword.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword);
    const checkNumber = /^(?=.*[0-9])/.test(formData.newPassword);
    const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(formData.newPassword);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => {
        setShowModal(false);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validation = useCallback(() => {
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(formData.newPassword);
        formData.oldPassword && formData.newPassword && passwordCheck ? setDisabled(false) : setDisabled(true);
    }, [formData])

    const submit = () => {
        setIsLoading(true);
        dispatch(changePassword(user?.username, formData));
    }

    const resetSession = () => {
        setErrorOldPass("");
        formData.oldPassword = "";
        formData.newPassword = "";
        var cartIFrame = document.getElementById('hidden-iframe');
        cartIFrame.contentWindow.postMessage(localStorage.removeItem('profile'), 'https://premierpharma.wpengine.com');
        dispatch(logOut(user?.username, history));
        // history.push('/login');
    }

    useEffect(() => {
        if (account?.changePassword && account?.changePassword?.success) {
            setEmaillPass(true);
            setShowModal(false);
            // var cartIFrame = document.getElementById('hidden-iframe');
            // cartIFrame.contentWindow.postMessage(localStorage.removeItem('profile'), 'https://premierpharma.wpengine.com');
            // localStorage.removeItem('profile');
        } 
        
        if (account?.errorOldPass) {
            setEmaillPass(false);
            if (account?.errorOldPass?.message === 'Incorrect username or password.') {
                setErrorOldPass('Invalid Old Password');
            } else {
                setErrorOldPass(account?.errorOldPass?.message);
            }
        }
        setIsLoading(false);
    }, [account]);

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
                        <div>
                            <h2 className="sub-title">Enter New Password</h2>
                            <div className="password-input form-group">
                                <label htmlFor="oldPassword">Old Password</label>
                                <Input
                                    label="Old Password"
                                    name="oldPassword"
                                    type="password"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                />
                                <p className={"invalidPassword "}>{errorMess ? errorMess : ''}</p>

                            </div>
                            <div className="password-input form-group">
                                <label htmlFor="confirmNewPassword">New Password</label>
                                <Input
                                    label="Password"
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
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
                    </Modal.Body>
                </Modal>
                {emailPass &&
                    <div className="checkEmail-container">
                        <div className="contentWrapper text-center">
                            <div>
                                <img className="emailIcon" src={PasswordChangeIcon} />
                                <h2>Password successfully updated</h2>
                                <div className="emailSubmitWrapper">
                                    <button className="continueButton" onClick={resetSession}>Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
