import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import {
  loginAdminUser,
  confirmUser,
  createSubAccount,
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
  productName: "",
  price: "",
  productID: "",
};

export const CustomPrice = ({ mainCompany }) => {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  //   const [mainCompany, setMainCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  //   const [selectedUser, setSelectedUser] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  //   const [errorMsg, setErrorMsg] = useState("");
  //   const [showError, setShowError] = useState(false);
  //   const [alertType, setAlertType] = useState("error");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isDisabled, setDisabled] = useState(true);

  //   const checkPasswordLenght = formData.password.length >= 8 ? true : false;
  //   const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  //   const checkNumber = /^(?=.*[0-9])/.test(formData.password);
  //   const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
  //     formData.password
  //   );
  //   const confirmPasswordCheck =
  //     formData.password !== "" && formData.password === formData.confirm_password;

  //   const history = useHistory;
  //   const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const contactChange = (value) => {
  //     setFormData({ ...formData, phoneNumber: value });
  //   };

  const handleSubmit = () => {
    let finalForm = {
      ...formData,
      parent: mainCompany.username,
      netsuiteCustomerId: mainCompany.netsuiteId,
    };
    setActionLoading(true);
    // dispatch(createSubAccount(finalForm));
  };

  //   const handleConfirmUser = (user) => {
  //     setConfirmLoading(true);
  //     setSelectedUser(user.username);
  //     const formData = { username: user.username };
  //     dispatch(confirmUser(formData, user));
  //   };

  //   const handleLoginUser = (user) => {
  //     const formData = { username: user.username };
  //     const profile = JSON.parse(localStorage.getItem("profile"));
  //     setLoginLoading(true);
  //     setSelectedUser(user.username);
  //     dispatch(loginAdminUser(formData, profile));
  //   };

  //   const handleAlert = (msg, type) => {
  //     setErrorMsg(msg);
  //     setShowError(true);
  //     setAlertType(type);
  //     setTimeout(function () {
  //       setShowError(false);
  //     }, 3000);
  //   };

  const handleSetData = (users) => {
    // let mainCompany = users.filter(
    //   (user) => user.awsNetsuiteId === id && !user.subAccount
    // );
    let subCompanies = users.filter(
      (user) => user.awsNetsuiteId === id && user.subAccount
    );
    // setMainCompany(mainCompany[0]);
    setCompanies(subCompanies);
  };

  useEffect(() => {
    // const {
    //   givenName,
    //   familyName,
    //   email,
    //   password,
    //   confirm_password,
    //   phoneNumber,
    //   company,
    // } = formData;
    // const phoneCheck =
    //   formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber)
    //     ? true
    //     : false;
    // const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const passwordCheck =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(
    //     password
    //   );
    // const passwordConfirm = password === confirm_password ? true : false;
    // givenName &&
    // familyName &&
    // company &&
    // phoneNumber &&
    // phoneCheck &&
    // email &&
    // password &&
    // emailCheck &&
    // passwordCheck &&
    // passwordConfirm
    //   ? setDisabled(false)
    //   : setDisabled(true);
  }, [formData]);

  useEffect(() => {
    // if (
    //   (loginLoading && admin.loginError) ||
    //   (confirmLoading && admin.confirmError)
    // ) {
    //   let msg = admin.loginError
    //     ? "Let the user login atleast once!"
    //     : "Error Confirming User!";
    //   handleAlert(msg, "error");
    // }
    // if (actionLoading && !admin.createSubAccountError) {
    //   document.getElementById("closeImportUserModal").click();
    //   setFormData(initialState);
    // }
    setActionLoading(false);
    setConfirmLoading(false);
    setLoginLoading(false);
    handleSetData(admin.users);
  }, [admin]);

  //   useEffect(() => {
  //     admin?.users ? handleSetData(admin.users) : history.push("/admin");
  //   }, [location]);

  //   useEffect(() => {
  //     !admin.users && history.push("/admin");
  //   }, []);

  // useEffect(
  //   () => () => {
  //     window.onunload = () => {
  //       localStorage.removeItem("admin");
  //     };
  //   },
  //   []
  // );

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-4 header">
          <h2 className="m-0">Custom Prices</h2>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#customPriceModal"
          >
            Add Cutom Price
          </button>
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Product name</th>
                <th scope="col">ID</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project name</td>
                <td>123455</td>
                <td>$123</td>
                <td>
                  <button
                    className="btn btn-primary"
                    //   onClick={() => handleLoginUser(user)}
                    //   disabled={user.status === "CONFIRMED" ? null : true}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-4"
                    //   onClick={() => handleLoginUser(user)}
                    //   disabled={user.status === "CONFIRMED" ? null : true}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div
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
      </div> */}
      <div
        className="modal fade"
        id="customPriceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userTitle">
                Custom Price
              </h5>
              <button
                id="closeCustomPriceModal"
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
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="fname">Product Name</label>
                    <input
                      type="text"
                      name="givenName"
                      value={formData.givenName}
                      className="form-control"
                      id="fname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="lname">ID</label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      className="form-control"
                      id="lname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="lname">Price</label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      className="form-control"
                      id="lname"
                      onChange={handleChange}
                    />
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
    </>
  );
};
