import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, forgotPassword, confirmForgotPassword } from "../actions/auth";
import { AccountVerification } from "../components/login/AccountVerification";
import { HeaderNav } from "../components/partials/HeaderNav";
import { Footer } from "../components/partials/Footer";
import { useForm } from "react-hooks-helper";
import { Helmet } from "react-helmet";

import Input from "../components/shared/input";
import decode from "jwt-decode";
import PasswordChangeIcon from "../assets/img/Account/password-change.svg";

const initialState = { email: "", password: "", code: "" };
const initialForgotState = {
  fEmail: "",
  password: "",
  passwordConfirmation: "",
  code: "",
};

export const LoginContainer = () => {
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const [forgotFormData, setforgotFormData] = useForm(initialForgotState);
  const { fEmail, password, passwordConfirmation, code } = forgotFormData;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPass, setForgotpass] = useState(false);
  const [continueButton, setContinueButton] = useState(false);
  const [successForgot, setSuccessForgot] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(logIn(formData, history));
  };
  const submit = () => {
    setIsLoading(true);
    dispatch(
      confirmForgotPassword(fEmail, {
        code: code,
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
    );
  };
  const handFotgotPassword = () => {
    dispatch(forgotPassword(fEmail));
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const forgotEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      forgotFormData.fEmail
    );
    emailCheck && formData.password !== ""
      ? setIsDisabled(null)
      : setIsDisabled(true);
    forgotEmailCheck && forgotFormData.fEmail != ""
      ? setContinueButton(null)
      : setContinueButton(true);
  }, [formData, forgotFormData]);

  useEffect(() => {
    setIsLoading(false);
    if (
      auth.sendOTP?.message ===
      "Attempt limit exceeded, please try after some time."
    ) {
      setOTP(false);
      setErrorMessage(auth.sendOTP?.message);
    }
    if (auth.sendOTP?.CodeDeliveryDetails) {
      setOTP(true);
    }
    if (auth.forgotPasswordData?.success) {
      setSuccessForgot(true);
    }
  }, [auth]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user?.accessToken;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 > new Date().getTime())
        history.push("/account");
    }
    if (auth.authData?.accountStatus === "UNCONFIRMED") {
      history.push("/account");
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>
          {forgotPass ? "Forgot Password" : "Log In"} | Premier Pharmaceuticals
        </title>
      </Helmet>
      {/* <HeaderNav /> */}
      {auth.authData?.accountStatus === "UNCONFIRMED" ? (
        history.push("/approval-page")
      ) : (
        <div className="container-fluid d-flex login">
          <div className="container d-flex align-items-center justify-content-center">
            <div className="card mb-0">
              <div className="card-body d-flex align-items-center justify-content-center">
                {forgotPass ? (
                  <div>
                    <div className="forgotPassWrapper">
                      {successForgot ? (
                        <div className="checkEmail-container d-flex align-items-center justify-content-center">
                          <div className="contentWrapper text-center">
                            <img
                              className="emailIcon"
                              src={PasswordChangeIcon}
                            />
                            <h2>Password successfully updated</h2>
                            <div className="emailSubmitWrapper">
                              <button
                                className="continueButton"
                                onClick={() => {
                                  setForgotpass(false);
                                  setSuccessForgot(false);
                                  setOTP(false);
                                }}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : OTP ? (
                        <div>
                          <h2>Verification</h2>
                          <p className="">
                            Please verify your account so you can reset your
                            password. We’ve sent a confirmation code to {fEmail}
                          </p>
                          <div className="form-group">
                            <Input
                              label="Confirmation Code"
                              name="code"
                              type="text"
                              value={code}
                              onChange={setforgotFormData}
                              required
                            />
                          </div>
                          <h2>Enter New Password</h2>
                          <div className="form-group">
                            <label>New Password</label>
                            <Input
                              label="New Password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={setforgotFormData}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <Input
                              label="Confirm New Password"
                              name="passwordConfirmation"
                              type="password"
                              value={passwordConfirmation}
                              onChange={setforgotFormData}
                              required
                            />
                          </div>
                          <p
                            className={
                              "text-center error " +
                              (auth.forgotPasswordData?.message
                                ? "alert-danger"
                                : "")
                            }
                          >
                            {auth.forgotPasswordData == "Passwords do not match"
                              ? auth.forgotPasswordData
                              : auth.forgotPasswordData?.message}
                          </p>
                          <div className="emailSubmitWrapper">
                            <button
                              className="continueButton"
                              disabled={continueButton}
                              onClick={submit}
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                          <h3>Forgot Password</h3>
                          <p className="emailDesc">
                          Don’t worry sometimes people can forget too, enter your email and we will send you a password reset link.
                          </p>
                          <div className="form-group">
                            <div className="input-wrapper">
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
                            </div>
                            <div className="emailSubmitWrapper">
                              <button
                                className="continueButton w-100"
                                disabled={continueButton}
                                onClick={handFotgotPassword}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                          <p
                            className={
                              "text-center error " +
                              (errorMessage ? "alert-danger" : "")
                            }
                          >
                            {errorMessage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Welcome Back!</h3>

                    <p
                      className={
                        "text-center error " +
                        (auth.authData?.message ? "alert-danger" : "")
                      }
                    >
                      {auth.authData?.message}
                    </p>
                    <div className="input-wrapper">
                        <label>Email</label>
                        <Input
                            label="Enter your email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="input-wrapper">
                        <label>Password</label>
                        <Input
                            label="Enter your password"
                            name="password"
                            type="password"
                            className="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="forgot-pass d-flex justify-content-end mb-4">
                      <a href="#" onClick={() => setForgotpass(true)}>
                        Forgot Password?
                      </a>
                    </div>
                    <button className="login-button w-100">
                      Sign in
                    </button>
                    <div className="signup-container d-flex align-items-center justify-content-between">
                      <div className="container d-flex align-items-center justify-content-center">
                        <span className="signup-text">
                          Don’t have an account?{" "}
                          <Link to="/register">Become a Partner</Link>
                        </span>
                      </div>
                      {/* <button
                        type="submit"
                        className="btn submit-button"
                        disabled={isDisabled}
                      >
                        {isLoading ? (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <>Submit</>
                        )}
                      </button> */}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};
