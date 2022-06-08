import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  getUsers,
  loginAdminUser,
  confirmUser,
  // importUser,
  // exportCSV,
  updateUserNetsuiteID,
  syncCustomPricing,
  syncProducts,
} from "../../actions/admin";
// import { getCountries, getStates } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";

// import {
//   formatPhoneNumberIntl,
//   isPossiblePhoneNumber,
// } from "react-phone-number-input";
// import InputContact from "react-phone-number-input/input";
// import Dropdown from "../../components/shared/dropdown";

// import CheckGreen from "../../assets/icon/check-lgreen.svg";
// import XGray from "../../assets/icon/x-gray.svg";

import { ExportToCsv } from "export-to-csv";

// const initialState = {
//   givenName: "",
//   familyName: "",
//   fishbowlCustomerId: "",
//   email: "",
//   password: "",
//   confirm_password: "",
//   phoneNumber: "",
//   address: "",
//   company: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   country: "",
//   countryCode: "",
// };

export const AdminDashboard = () => {
  const admin = useSelector((state) => state.admin);
  // const auth = useSelector((state) => state.auth);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [loginLoading, setLoginLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [productSyncLoading, setProductSyncLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [actionLoading, setActionLoading] = useState(false);
  // const [formData, setFormData] = useState(initialState);
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [isDisabled, setDisabled] = useState(true);
  const [exportCsv, setExportCsv] = useState(false);
  const [editNetsuiteID, setEditNetsuiteID] = useState(false);
  const [netsuiteID, setNetsuiteID] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  // const checkPasswordLenght = formData.password.length >= 8 ? true : false;
  // const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  // const checkNumber = /^(?=.*[0-9])/.test(formData.password);
  // const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
  //   formData.password
  // );
  // const confirmPasswordCheck =
  //   formData.password !== "" && formData.password === formData.confirm_password;

  const handleLoginUser = (user) => {
    const formData = { username: user.username };
    const profile = JSON.parse(localStorage.getItem("profile"));
    setLoginLoading(true);
    setSelectedUser(user.username);
    dispatch(loginAdminUser(formData, profile));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    history.push("/admin/login");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleConfirmUser = (user) => {
    setConfirmLoading(true);
    setSelectedUser(user.username);
    const formData = { username: user.username };
    dispatch(confirmUser(formData, user));
  };

  const handleLinkUser = (user) => {
    setLinkLoading(true);
    setSelectedUser(user.username);
    const formData = { netsuiteCustomerId: netsuiteID };
    dispatch(updateUserNetsuiteID(user.username, formData));
  };

  const handleSync = (user) => {
    setSyncLoading(true);
    setSelectedUser(user.username);
    dispatch(syncCustomPricing(user.username));
  };

  // const openImportForm = () => {
  //   setFormData(initialState);
  // };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const contactChange = (value) => {
  //   setFormData({ ...formData, phoneNumber: value });
  // };

  // const handleSubmit = () => {
  //   setActionLoading(true);
  //   dispatch(importUser(formData));
  // };

  // const handleExport = () => {
  //   setExportCsv(true);
  //   dispatch(exportCSV());
  // };

  const handleProductSync = () => {
    setProductSyncLoading(true);
    dispatch(syncProducts());
  };

  const handleAlert = (msg, type) => {
    setErrorMsg(msg);
    setShowError(true);
    setAlertType(type);
    setTimeout(function () {
      setShowError(false);
    }, 3000);
  };

  // useEffect(() => {
  //   const {
  //     givenName,
  //     familyName,
  //     fishbowlCustomerId,
  //     email,
  //     password,
  //     confirm_password,
  //     phoneNumber,
  //     address,
  //     company,
  //     city,
  //     state,
  //     postalCode,
  //     country,
  //   } = formData;

  //   const phoneCheck =
  //     formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber)
  //       ? true
  //       : false;
  //   const checkState = state === "" && states.length > 0 ? false : true;
  //   const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   const passwordCheck =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(
  //       password
  //     );
  //   const passwordConfirm = password === confirm_password ? true : false;
  //   fishbowlCustomerId &&
  //   givenName &&
  //   familyName &&
  //   company &&
  //   phoneNumber &&
  //   phoneCheck &&
  //   address &&
  //   city &&
  //   postalCode &&
  //   country &&
  //   checkState &&
  //   email &&
  //   password &&
  //   emailCheck &&
  //   passwordCheck &&
  //   passwordConfirm
  //     ? setDisabled(false)
  //     : setDisabled(true);
  // }, [formData]);

  useEffect(() => {
    if (search === "") {
      setCompanies(admin?.users);
    } else {
      const filterCompanies = admin?.users.filter((user) =>
        user.company.toLowerCase().includes(search.toLowerCase())
      );
      setCompanies(filterCompanies);
    }
  }, [search]);

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
    if (syncLoading && admin.syncCustomPricingError) {
      handleAlert(admin.syncCustomPricingError.msg, "error");
    }
    if (syncLoading && !admin.syncCustomPricingError) {
      handleAlert("Custom price sync successfully!", "success");
    }
    if (admin?.users) {
      let mainCompanies = admin?.users.filter((user) => !user.subAccount);
      setCompanies(mainCompanies);
    }
    setLoginLoading(false);
    setConfirmLoading(false);
    // setActionLoading(false);
    setLinkLoading(false);
    setSyncLoading(false);
    setProductSyncLoading(false);
    setEditNetsuiteID(false);
    setNetsuiteID("");
    // if (!admin.importError) {
    //     document.getElementById("closeImportUserModal").click();
    // }
    if (exportCsv) {
      const csvOptions = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Custom Price List",
        filename: "Custom Price List",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };

      if (admin?.exportData.length > 0) {
        const csvExporter = new ExportToCsv(csvOptions);

        csvExporter.generateCsv(admin?.exportData);
      } else {
        alert("No Custom Price");
      }

      setExportCsv(false);
    }
  }, [admin]);

  useEffect(() => {
    dispatch(getUsers());
    // dispatch(getCountries());
  }, []);

  // useEffect(() => {
  //   setCountries(auth?.countriesData);
  //   if (auth?.statesData?.length > 0) {
  //     setStates(auth?.statesData);
  //   } else {
  //     setStates([]);
  //     // setFormData({ ...formData, state: "" });
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   const selectedCountry = countries.filter(
  //     (e) => e.name === formData.country
  //   );
  //   if (formData.country !== "" && selectedCountry) {
  //     const countryCode = selectedCountry[0]?.abbreviation;
  //     setFormData({ ...formData, countryCode });
  //     dispatch(getStates(countryCode));
  //   }
  // }, [formData.country]);

  useEffect(
    () => () => {
      setShowError(false);
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
          <h2 className="m-0">Companies</h2>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="search-container input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Search
              </span>
            </div>
            <input
              className="form-control"
              type="text"
              name="search"
              value={search}
              placeholder="Company Name"
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </div>
          {/* <button type="button" className="btn btn-primary import-btn" data-toggle="modal" data-target="#importUserModal" onClick={()=>openImportForm()}>
                    Import User
                </button>

              <button
                type="button"
                className="btn btn-success export-btn"
                onClick={() => handleExport()}
              >
                Export CSV
              </button>*/}
          <button
            type="button"
            className="btn btn-success export-btn"
            disabled={productSyncLoading}
            onClick={() => handleProductSync()}
          >
            {productSyncLoading ? (
              <div
                className="spinner-border text-light spinner-border-sm"
                role="sync"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Sync Products"
            )}
          </button>
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th className="no-wrap" scope="col">Internal ID</th>
                <th className="no-wrap" scope="col">Database ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((user, index) => (
                <tr key={`user-key-${index}`}>
                  <td>
                    <Link to={`/admin/${user.awsNetsuiteId}`}>
                      {user.company}
                    </Link>
                  </td>
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
                  <td>{user.netsuiteId}</td>
                  <td>
                    {editNetsuiteID && user.username === selectedUser ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          value={netsuiteID}
                          onChange={(e) => setNetsuiteID(e.target.value)}
                          style={{ width: "100px" }}
                        />
                        <button
                          className="btn btn-info ml-2"
                          onClick={() => handleLinkUser(user)}
                          disabled={linkLoading}
                        >
                          {linkLoading && user.username === selectedUser ? (
                            <div
                              className="spinner-border text-light spinner-border-sm"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            setEditNetsuiteID(false);
                            setNetsuiteID("");
                            setSelectedUser("");
                          }}
                          disabled={linkLoading}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {user.awsNetsuiteId}
                        <button
                          className="btn btn-link ml-2"
                          onClick={() => {
                            setEditNetsuiteID(true);
                            setNetsuiteID(user.awsNetsuiteId);
                            setSelectedUser(user.username);
                          }}
                          disabled={linkLoading}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => handleSync(user)}
                      disabled={linkLoading}
                    >
                      {syncLoading && user.username === selectedUser ? (
                        <div
                          className="spinner-border text-light spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Sync"
                      )}
                    </button>
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
    </div>
  );
};
