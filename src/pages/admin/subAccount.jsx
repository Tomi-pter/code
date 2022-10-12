import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  loginAdminUser,
  confirmUser,
  enableUser,
  disableUser,
  createSubAccount,
  getUser,
} from "../../actions/admin";

import { useSelector, useDispatch } from "react-redux";

import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import InputContact from "react-phone-number-input/input";

import CheckGreen from "../../assets/icon/check-lgreen.svg";
import XGray from "../../assets/icon/x-gray.svg";

const initialState = {
  company: "",
  givenName: "",
  familyName: "",
  email: "",
  password: "",
  confirm_password: "",
  phoneNumber: "",
  parent: "",
  netsuiteCustomerId: "",
};

export const SubAccount = ({ mainCompany }) => {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [companies, setCompanies] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isDisabled, setDisabled] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const checkPasswordLenght = formData.password.length >= 8 ? true : false;
  const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  const checkNumber = /^(?=.*[0-9])/.test(formData.password);
  const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
    formData.password
  );
  const confirmPasswordCheck =
    formData.password !== "" && formData.password === formData.confirm_password;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = () => {
    let finalForm = {
      ...formData,
      parent: mainCompany.username,
      netsuiteCustomerId: mainCompany.netsuiteId,
    };
    setActionLoading(true);
    dispatch(createSubAccount(finalForm));
  };

  const handleConfirmUser = (user) => {
    setConfirmLoading(true);
    setSelectedUser(user.username);
    const formData = { username: user.username };
    dispatch(confirmUser(formData, user));
  };

  const handleEnableUser = (user) => {
    dispatch(enableUser(user));
    handleAlert("User Updated successfully!", "success");
  };

  const handleDisableUser = (user) => {
    dispatch(disableUser(user));
    handleAlert("User Updated successfully!", "success");
  };

  const handleUpdateUser = (user, e) => {
    e.target.checked ? handleEnableUser(user) : handleDisableUser(user);
  };

  const handleLoginUser = (user) => {
    const formData = { username: user.username };
    const profile = JSON.parse(localStorage.getItem("profile"));
    setLoginLoading(true);
    setSelectedUser(user.username);
    dispatch(loginAdminUser(formData, profile));
  };

  const handleGetInfo = (user) => {
    setUserInfo(null);
    setInfoLoading(true);
    setSelectedUser(user.username);
    dispatch(getUser(user));
  };

  const handleAlert = (msg, type) => {
    setErrorMsg(msg);
    setShowError(true);
    setAlertType(type);
    setTimeout(function () {
      setShowError(false);
    }, 3000);
  };

  const handleSetData = (users) => {
    let subCompanies = users.filter(
      (user) => user.awsNetsuiteId === id && user.subAccount
    );
    setCompanies(subCompanies);
  };

  useEffect(() => {
    const {
      givenName,
      familyName,
      email,
      password,
      confirm_password,
      phoneNumber,
      company,
    } = formData;

    const phoneCheck =
      formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber)
        ? true
        : false;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordCheck =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(
        password
      );
    const passwordConfirm = password === confirm_password ? true : false;
    givenName &&
    familyName &&
    company &&
    phoneNumber &&
    phoneCheck &&
    email &&
    password &&
    emailCheck &&
    passwordCheck &&
    passwordConfirm
      ? setDisabled(false)
      : setDisabled(true);
  }, [formData]);

  useEffect(() => {
    if (
      (loginLoading && admin.loginError) ||
      (confirmLoading && admin.confirmError)
    ) {
      let msg = admin.loginError
        ? "Let the user login atleast once!"
        : "Error Confirming User!";
      handleAlert(msg, "error");
    }
    if (actionLoading && !admin.createSubAccountError) {
      document.getElementById("closeImportUserModal").click();
      setFormData(initialState);
    }
    if (infoLoading && selectedUser !== "") {
      const selectedUserInfo = admin.users.find(
        (u) => u.username === selectedUser
      );

      setUserInfo(selectedUserInfo);
      setInfoLoading(false);
    }
    setActionLoading(false);
    setConfirmLoading(false);
    setLoginLoading(false);
    handleSetData(admin.users);
  }, [admin]);

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-4 header">
          <h2 className="m-0">Sub accounts</h2>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#userModal"
          >
            Add Sub Account
          </button>
        </div>
        <div className="table-container custom">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Database ID</th>
                <th scope="col">Enable</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((user, index) => (
                <tr key={`user-key-${index}`}>
                  <td>{user.company}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.status === "CONFIRMED" ||
                    user.status === "RESET_REQUIRED" ? (
                      user.status
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => handleConfirmUser(user)}
                        disabled={confirmLoading ? true : null}
                      >
                        {confirmLoading && user.username === selectedUser ? (
                          <div
                            className="spinner-border text-light spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    )}
                  </td>
                  <td>{user.awsNetsuiteId}</td>
                  <td>
                    <input
                      type="checkbox"
                      aria-label="Enable User"
                      defaultChecked={user.isEnabled}
                      onChange={(e) => handleUpdateUser(user, e)}
                    />
                  </td>
                  <td className="no-wrap">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleLoginUser(user)}
                      disabled={
                        user.isEnabled && user.status === "CONFIRMED"
                          ? null
                          : true
                      }
                    >
                      {loginLoading && user.username === selectedUser ? (
                        <div
                          className="spinner-border text-light spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </button>
                    <button
                      className="btn btn-success ml-3"
                      onClick={() => handleGetInfo(user)}
                      data-toggle="modal"
                      data-target="#infoModal"
                    >
                      Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="toast"
        className={
          "toast alert " +
          (alertType === "error" ? "alert-danger " : "alert-success ") +
          (showError ? "show" : "")
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        {errorMsg}
      </div>
      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userTitle">
                Sub account
              </h5>
              <button
                id="closeImportUserModal"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                      type="text"
                      name="givenName"
                      value={formData.givenName}
                      className="form-control"
                      id="fname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      className="form-control"
                      id="lname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Contact Number</label>
                    <InputContact
                      country="US"
                      international
                      withCountryCallingCode
                      value={formData.phoneNumber}
                      onChange={contactChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      name="company"
                      step="any"
                      value={formData.company}
                      className="form-control"
                      id="company"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="form-control"
                      id="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      className="form-control"
                      id="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      step="any"
                      value={formData.confirm_password}
                      className="form-control"
                      id="confirm_password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <p
                      className={
                        "col-5 password-validation " +
                        (checkPasswordLenght
                          ? "text-success"
                          : "text-secondary")
                      }
                    >
                      {checkPasswordLenght ? (
                        <img src={CheckGreen} alt="" />
                      ) : (
                        <img src={XGray} alt="" />
                      )}{" "}
                      min 8 characters
                    </p>
                    <p
                      className={
                        "col-7 password-validation " +
                        (checkLetters ? "text-success" : "text-secondary")
                      }
                    >
                      {checkLetters ? (
                        <img src={CheckGreen} alt="" />
                      ) : (
                        <img src={XGray} alt="" />
                      )}{" "}
                      upper & lower case letters
                    </p>
                    <p
                      className={
                        "col-5 password-validation " +
                        (checkNumber && checkCharacter
                          ? "text-success"
                          : "text-secondary")
                      }
                    >
                      {checkNumber && checkCharacter ? (
                        <img src={CheckGreen} alt="" />
                      ) : (
                        <img src={XGray} alt="" />
                      )}{" "}
                      number & symbol
                    </p>
                    <p
                      className={
                        "col-7 password-validation " +
                        (confirmPasswordCheck
                          ? "text-success"
                          : "text-secondary")
                      }
                    >
                      {confirmPasswordCheck ? (
                        <img src={CheckGreen} alt="" />
                      ) : (
                        <img src={XGray} alt="" />
                      )}{" "}
                      confirm password
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <p className="text-danger text-small error-msg mb-3">
                    {admin?.createSubAccountError?.message}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center justify-content-center w-100"
                    onClick={handleSubmit}
                    disabled={isDisabled || actionLoading}
                  >
                    {actionLoading && (
                      <div
                        className="spinner-border text-light spinner-border-sm mr-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="infoModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userName"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {!infoLoading ? (
              <>
                <div className="modal-header">
                  <h3 className="modal-title" id="userName">
                    {userInfo?.company}
                  </h3>
                  <button
                    id="closeInfoModal"
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-5">
                      <p>
                        Name:{" "}
                        {`${userInfo?.information?.given_name} ${userInfo?.information?.family_name}`}
                      </p>
                      <p>Email: {userInfo?.information?.email} </p>
                      <p>
                        Phone Number: {userInfo?.information?.phone_number}{" "}
                      </p>
                    </div>
                    <div className="col-7">
                      <p>
                        State License:{" "}
                        {userInfo?.information?.stateLicenseNumber}
                      </p>
                      <p>
                        State License Expiration Date:{" "}
                        {userInfo?.information?.stateLicenseExpirationDate}
                      </p>
                      <p>DEA: {userInfo?.information?.dea} </p>
                      <p>
                        DEA Expiration Date: {userInfo?.information?.deaExpiry}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="modal-body d-flex align-items-center justify-content-center"
                style={{ minHeight: "400px" }}
              >
                <div
                  className="spinner-border text-light spinner-border-lg"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
