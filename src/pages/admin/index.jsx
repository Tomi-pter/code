import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  Switch,
  useHistory,
  Route,
  Redirect,
} from "react-router-dom";

import { AdminProtectedRoutes } from "../../components/adminProtectedRoutes";
import Company from "../../pages/admin/company";
import OrderLogs2 from "../../pages/admin/logs2";
import WeeklySpecial from "../../pages/admin/weeklySpecial";
import GroupPricing from "../../pages/admin/groupPricing";

import {
  getUsers,
  loginAdminUser,
  confirmUser,
  enableUser,
  disableUser,
  updateUserNetsuiteID,
  syncCustomPricing,
  syncProducts,
} from "../../actions/admin";
import { getAdminProducts } from "../../actions/products";
import { useSelector, useDispatch } from "react-redux";

import { ExportToCsv } from "export-to-csv";

export const AdminDashboard = () => {
  const admin = useSelector((state) => state.admin);
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
  const [exportCsv, setExportCsv] = useState(false);
  const [editNetsuiteID, setEditNetsuiteID] = useState(false);
  const [netsuiteID, setNetsuiteID] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

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
    setLinkLoading(false);
    setSyncLoading(false);
    setProductSyncLoading(false);
    setEditNetsuiteID(false);
    setNetsuiteID("");
    setSelectedUser("");
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
    dispatch(getAdminProducts());
  }, []);

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
    <div className="d-flex align-items-center justify-content-center admin-pages main-admin">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-3 mb-4 header">
          <ul class="w-100 nav nav-tabs main-nav">
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/companies"
                activeClassName="active"
              >
                Companies
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/logs"
                activeClassName="active"
              >
                Order Logs
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/weekly-specials"
                activeClassName="active"
              >
                Weekly Special
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/group-pricing"
                activeClassName="active"
              >
                Group Pricing
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-danger ml-5"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>

        <Switch>
          <AdminProtectedRoutes exact path="/admin">
            <Redirect to="/admin/companies" />
          </AdminProtectedRoutes>
          <AdminProtectedRoutes exact path="/admin/companies">
            <div className="card">
              <h2>Companies</h2>
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
                      <th className="no-wrap" scope="col">
                        Internal ID
                      </th>
                      <th className="no-wrap" scope="col">
                        Database ID
                      </th>
                      <th scope="col">Enable</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((user, index) => (
                      <tr key={`user-key-${index}`}>
                        <td>
                          <Link to={`/admin/companies/${user.awsNetsuiteId}`}>
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
                              {confirmLoading &&
                              user.username === selectedUser ? (
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
                        <td className="no-wrap">
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
                                {linkLoading &&
                                user.username === selectedUser ? (
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
                          <input
                            type="checkbox"
                            aria-label="Enable User"
                            defaultChecked={user.isEnabled}
                            onChange={(e) => handleUpdateUser(user, e)}
                          />
                        </td>
                        <td class="no-wrap">
                          <button
                            className="btn btn-secondary mr-4"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AdminProtectedRoutes>
          <AdminProtectedRoutes
            exact
            path="/admin/logs"
            component={OrderLogs2}
          />
          <AdminProtectedRoutes
            exact
            path="/admin/weekly-specials"
            component={WeeklySpecial}
          />
          <AdminProtectedRoutes
            path="/admin/companies/:id"
            component={Company}
          />
          <AdminProtectedRoutes
            path="/admin/group-pricing"
            component={GroupPricing}
          />
        </Switch>

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
    </div>
  );
};
