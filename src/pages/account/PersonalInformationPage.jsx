import React, { useState, useEffect } from "react";
import { HeaderNav } from "../../components/partials/HeaderNav";
import { Footer } from "../../components/partials/Footer";
import { PersonalInfo } from "../../components/account/personalInfo";
import { License } from "../../components/account/license";
import { Addresses } from "../../components/account/addresses";
import { OrdersHistory } from "../../components/account/orders";
import { Changepassword } from "../../components/account/changePassword";
import AccountUser from "../../assets/img/Account/user-icon.svg";
import CartIcon from "../../assets/img/Account/mdi_cart.svg";
import LogOutIcon from "../../assets/img/Account/mdi_logout-variant.svg";
import SecurityIcon from "../../assets/img/Account/security.svg";
import { Helmet } from "react-helmet";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../actions/auth";
import { getAccount } from "../../actions/account";

export const PersonalInformationContainer = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const account = useSelector((state) => state.account);
  const [isOpen, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOut(user?.username, history));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getAccount(user?.username));
    if (window.location.href.indexOf("order-history") > -1) {
      setActiveTab(true);
    } else {
      setActiveTab(false);
    }
  }, []);

  return (
    <>
        <Helmet>
            <title>Account | Premier Pharmaceuticals</title>
        </Helmet>
        <HeaderNav />
        <div className="personalInformationWrapper">
            <div className="container">
                <div className="d-flex align-items-start flex-column flex-lg-row">
                    <div className="side-nav">
                        <h1 className="title">Account</h1>
                        <div className="card">
                            <ul
                                className="nav nav-tabs flex-column"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="primary-nav">
                                    <a
                                        data-toggle="tab"
                                        href="#personal-profile"
                                        className={`primary-link ${activeTab ? "" : "active"} `}
                                    >
                                    <img src={AccountUser} alt="" />
                                        Personal Information{" "}
                                    </a>
                                </li>
                                <li className="primary-nav">
                                    <a
                                        data-toggle="tab"
                                        href="#order-history"
                                        className={`primary-link ${activeTab ? "active" : ""} `}
                                    >
                                    <img src={CartIcon} alt="" />
                                        Order History
                                    </a>
                                </li>
                                <li className="primary-nav">
                                    <a
                                        data-toggle="tab"
                                        href="#security"
                                        className="primary-link "
                                    >
                                    <img src={SecurityIcon} alt="" />
                                        Security
                                    </a>
                                </li>
                                <li className="primary-nav">
                                    <a
                                        data-toggle="tab"
                                        href="#!"
                                        onClick={handleLogout}
                                        className="primary-link "
                                    >
                                    <img src={LogOutIcon} alt="" />
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="information">
                        <div id="pills-tabContent" className="tab-content" >
                            <div
                                className={`tab-pane fade ${activeTab ? "" : "active show"}`}
                                id="personal-profile"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <ul class="nav nav-tabs">
                                    <li>
                                        <a
                                            className="nav-tab active"
                                            data-toggle="pill"
                                            href="#my-profile"
                                            role="tab"
                                            aria-controls="pills-home-1"
                                            aria-selected="true"
                                        >
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="nav-tab"
                                            data-toggle="pill"
                                            href="#my-license"
                                            role="tab"
                                            aria-controls="pills-home-2"
                                            aria-selected="true"
                                        >
                                            My License
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="nav-tab"
                                            data-toggle="pill"
                                            href="#my-addresses"
                                            role="tab"
                                            aria-controls="pills-home-3"
                                            aria-selected="false"
                                        >
                                            My Address Book
                                        </a>
                                    </li>
                                </ul>
                                <div className="card tab-content" id="pills-tab-1">
                                    <div
                                        className="tab-pane fade show active"
                                        id="my-profile"
                                        role="tabpanel"
                                        aria-labelledby="pills-home-1"
                                    >
                                        <PersonalInfo account={account} />
                                    </div>
                                    <div
                                        className="tab-pane fade show"
                                        id="my-license"
                                        role="tabpanel"
                                        aria-labelledby="pills-home-2"
                                    >
                                        <License account={account} />
                                    </div>
                                    <div
                                        className="tab-pane fade show"
                                        id="my-addresses"
                                        role="tabpanel"
                                        aria-labelledby="pills-home-3"
                                    >
                                        <Addresses
                                            key={account.addressesData}
                                            account={account}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                id="order-history"
                                className={`tab-pane fade ${activeTab ? "active show" : ""}`}
                            >
                                <OrdersHistory />
                            </div>
                            <div id="security" className="tab-pane fade">
                                <h1 className="title">Security</h1>
                                <div className="card">
                                    <Changepassword account={account} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
};
