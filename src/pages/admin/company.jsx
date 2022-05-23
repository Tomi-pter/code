import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import {
  //   getUsers,
  loginAdminUser,
  confirmUser,
  createSubAccount,
  //   getCustomProducts,
  //   resetCustomProducts,
  //   createCustomProduct,
  //   updateCustomProduct,
  //   removeCustomProduct,
} from "../../actions/admin";
// import { getSearch } from "../../actions/products";

import { useSelector, useDispatch } from "react-redux";

import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import InputContact from "react-phone-number-input/input";

import CheckGreen from "../../assets/icon/check-lgreen.svg";
import XGray from "../../assets/icon/x-gray.svg";

// const initialState = { ndc: "", price: "" };

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

export default (props) => {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  //   const auth = useSelector((state) => state.auth);
  //   const search = useSelector((state) => state.search);
  const [mainCompany, setMainCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertType, setAlertType] = useState("error");
  //   const [products, setProducts] = useState([]);
  //   const [username, setUsername] = useState("");
  //   const [companyDetails, setCompanyDetails] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [actionLoading, setActionLoading] = useState(false);
  //   const [formData, setFormData] = useState(initialState);
  //   const [actionType, setActionType] = useState("add");
  //   const [searchResult, setSearchResult] = useState([]);
  //   const [searchSelect, setSearchSelect] = useState(false);
  //   const [errorMsg, setErrorMsg] = useState("");
  //   const [mainSearch, setMainSearch] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isDisabled, setDisabled] = useState(true);

  const checkPasswordLenght = formData.password.length >= 8 ? true : false;
  const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  const checkNumber = /^(?=.*[0-9])/.test(formData.password);
  const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
    formData.password
  );
  const confirmPasswordCheck =
    formData.password !== "" && formData.password === formData.confirm_password;

  const history = useHistory;
  const location = useLocation();
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

  const handleLoginUser = (user) => {
    const formData = { username: user.username };
    const profile = JSON.parse(localStorage.getItem("profile"));
    setLoginLoading(true);
    setSelectedUser(user.username);
    dispatch(loginAdminUser(formData, profile));
  };

  const handleAlert = (msg, type) => {
    setErrorMsg(msg);
    setShowError(true);
    setAlertType(type);
    setTimeout(function () {
      setShowError(false);
    }, 3000);
  };

  //   const handleAction = (action, product) => {
  //     setErrorMsg("");
  //     if (action === "add") {
  //       setFormData({ ...initialState, username });
  //     } else {
  //       setFormData(product);
  //     }
  //     setActionType(action);
  //   };

  //   const handleChange = (e) => {
  //     let value;
  //     if (e.target.name === "ndc" && e.target.value !== "") {
  //       setSearchSelect(false);
  //       dispatch(getSearch(e.target.value));
  //     }
  //     e.target.name === "ndc"
  //       ? (value = e.target.value)
  //       : (value = parseFloat(e.target.value));
  //     setFormData({ ...formData, [e.target.name]: value });
  //   };

  //   const handleSearchClick = (ndc) => {
  //     setSearchSelect(true);
  //     setFormData({ ...formData, ndc });
  //   };

  //   const handleSubmit = () => {
  //     if (actionType === "add") {
  //       setActionLoading(true);
  //       dispatch(createCustomProduct(formData));
  //     } else {
  //       setActionLoading(true);
  //       dispatch(updateCustomProduct(formData.customPricingId, formData));
  //     }
  //   };

  //   const handleDelete = (product) => {
  //     dispatch(removeCustomProduct(product.customPricingId));
  //   };

  //   useEffect(() => {
  //     if (loginLoading && admin.loginError) {
  //       let msg = "Let the user login atleast once!";
  //       handleAlert(msg, "error");
  //     }
  //     // if (admin.error) {
  //     //   setErrorMsg(admin?.error?.message);
  //     // } else {
  //     //   document.getElementById("closeModal").click();
  //     //   setErrorMsg("");
  //     // }
  //     // const company = admin.users.filter((user) => user.Username === username);
  //     // setCompanyDetails(company[0]);
  //     // if (admin?.customProducts) setProducts(admin?.customProducts);
  //     // setIsLoading(false);
  //     // setActionLoading(false);
  //     // setSearchResult([]);
  //   }, [admin]);

  //   const handleSearchChange = (e) => {
  //     setMainSearch(e.target.value);
  //   };

  //   useEffect(() => {
  //     if (mainSearch === "") {
  //       setProducts(admin?.customProducts);
  //     } else {
  //       const filterProducts = admin?.customProducts.filter(
  //         (product) =>
  //           product.ndc.toLowerCase().includes(mainSearch.toLowerCase()) ||
  //           product.productName.toLowerCase().includes(mainSearch.toLowerCase())
  //       );
  //       setProducts(filterProducts);
  //     }
  //   }, [mainSearch]);

  //   useEffect(() => {
  //     if (search?.products) setSearchResult(search?.products);
  //   }, [search]);

  const handleSetData = (users) => {
    let mainCompany = users.filter(
      (user) => user.awsNetsuiteId === id && !user.subAccount
    );
    let subCompanies = users.filter(
      (user) => user.awsNetsuiteId === id && user.subAccount
    );
    setMainCompany(mainCompany[0]);
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
    setActionLoading(false);
    setConfirmLoading(false);
    handleSetData(admin.users);
  }, [admin]);

  useEffect(() => {
    admin?.users ? handleSetData(admin.users) : history.push("/admin");
  }, [location]);

  useEffect(() => {
    !admin.users && history.push("/admin");
  }, []);

  useEffect(
    () => () => {
      window.onunload = () => {
        localStorage.removeItem("admin");
      };
    },
    []
  );

  return (
    <div className="d-flex align-items-center justify-content-center admin-pages">
      <div className="card container">
        <div className="d-flex align-items-center justify-content-between mb-4 header">
          <Link to={`/admin`}>{"< Back"}</Link>
          <h2 className="m-0">
            {mainCompany && `${mainCompany.company}'s sub accounts`}
          </h2>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#userModal"
            >
              Add Sub Account
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Database ID</th>
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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleLoginUser(user)}
                      disabled={user.status === "CONFIRMED" ? null : true}
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
        style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
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
    </div>
  );
};
