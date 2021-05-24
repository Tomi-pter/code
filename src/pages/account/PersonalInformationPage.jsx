import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'antd';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import { PersonalInfo } from '../../components/account/personalInfo';
import { Addresses } from '../../components/account/addresses';
import { OrdersHistory } from '../../components/account/orders';
import { Cards } from '../../components/account/cards';
import { Changepassword } from '../../components/account/changePassword';
import AccountUser from '../../assets/img/Account/user-icon.svg';
import CartIcon from '../../assets/img/Account/mdi_cart.svg';
import LogOutIcon from '../../assets/img/Account/mdi_logout-variant.svg';
import SecurityIcon from '../../assets/img/Account/security.svg';
// import MasterCardIcon from '../../assets/img/Payment/master-card-logo.svg';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/auth';
import { getAccount, getOrders } from '../../actions/account';
import { useParams } from "react-router-dom";

export const PersonalInformationContainer = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [disable, setDisable] = useState(true);
    const [selectedCard, setSelectedCard] = useState('');
    const [accountData, setAccountData] = useState('');
    const [isOpen, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const history = useHistory();
    const { id } = useParams();

    const handleLogout = () => {
        var cartIFrame = document.getElementById('hidden-iframe');
        // localStorage.removeItem('profile');
        cartIFrame.contentWindow.postMessage(localStorage.removeItem('profile'), 'https://premierpharma.wpengine.com');
        dispatch(logOut(user?.username, history));
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
        dispatch(getOrders(user?.username));
        if (window.location.href.indexOf("order-history") > -1) {
            setActiveTab(true);
        } else {
            setActiveTab(false);
        }
    }, [dispatch]);

    return (
        <>
            <HeaderNav />
            <div className="personalInformationWrapper">
                <div className="container">
                    <div className="d-flex align-items-start flex-column flex-lg-row">
                        <div className="side-nav">
                            <h1 className="title">Account</h1>
                            <div className="card">
                                <ul className="nav nav-tabs flex-column" id="pills-tab" role="tablist">
                                    <li className="primary-nav">
                                        <button
                                            data-toggle="tab" href="#personal-profile"
                                            className={`accordion-title flex-column align-items-start primary-link ${activeTab ? '' : 'active'} ${isOpen ? "open" : ""}`}
                                        >
                                            <span>
                                                <img src={AccountUser} alt="" />Personal Information <span className="caret" onClick={() => setOpen(!isOpen)}></span>
                                            </span>
                                            <span className={`accordion-item  ${!isOpen ? "collapsed" : ""}`}>
                                                <span className="accordion-content">
                                                    <ul className="sub-nav nav flex-column mb-3" id="pills-tab-1" role="tablist">
                                                        <li>
                                                            <a className="active" data-toggle="pill" href="#my-profile" role="tab" aria-controls="pills-home-1" aria-selected="true">My Profile</a>
                                                        </li>
                                                        <li>
                                                            <a className="" data-toggle="pill" href="#my-addresses" role="tab" aria-controls="pills-home-2" aria-selected="false">My Address Book</a>
                                                        </li>
                                                        <li >
                                                            <a className="" data-toggle="pill" href="#payment-options" role="tab" aria-controls="pills-home-3" aria-selected="false">Payment Options</a>
                                                        </li>
                                                    </ul>
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                    <li className="primary-nav">
                                        <a data-toggle="tab" href="#order-history" className={`primary-link ${activeTab ? 'active' : ''} `}>
                                            <img src={CartIcon} alt="" />Order History
                                        </a>
                                    </li>
                                    <li className="primary-nav">
                                        <a data-toggle="tab" href="#security" className="primary-link ">
                                            <img src={SecurityIcon} alt="" />Security
                                        </a>
                                    </li>
                                    <li className="primary-nav">
                                        <a data-toggle="tab" href="#!" onClick={handleLogout} className="primary-link " >
                                            <img src={LogOutIcon} alt="" />Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="information">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade ${activeTab ? '' : 'active show'}`} id="personal-profile" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <h1 className="title">Personal Information</h1>
                                    <div className="card tab-content" id="pills-tab-1Content">
                                        <div className="tab-pane fade show active" id="my-profile" role="tabpanel" aria-labelledby="pills-home-1">
                                            <PersonalInfo disable={disable} setDisable={setDisable} account={account} accountData={accountData} setAccountData={setAccountData} />
                                        </div>
                                        <div className="tab-pane fade show" id="my-addresses" role="tabpanel" aria-labelledby="pills-home-2">
                                            <Addresses key={account.addressesData} account={account} accountData={accountData} setAccountData={setAccountData} />
                                        </div>
                                        <div className="tab-pane fade show" id="payment-options" role="tabpanel" aria-labelledby="pills-home-3">
                                            <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='account' />
                                        </div>
                                    </div>
                                </div>
                                <div id="order-history" className={`tab-pane fade ${activeTab ? 'active show' : ''}`}>
                                    <h1 className="title">Order History</h1>
                                    <div className="card">
                                        <OrdersHistory account={account} />
                                    </div>
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
    )
}