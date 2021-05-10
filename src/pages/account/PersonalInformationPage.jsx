import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import { PersonalInfo } from '../../components/account/personalInfo';
import { OrdersHistory } from '../../components/account/orders';
import { Cards } from '../../components/account/cards';
import AccountUser from '../../assets/img/Account/user-icon.svg';
import CartIcon from '../../assets/img/Account/mdi_cart.svg';
import LogOutIcon from '../../assets/img/Account/mdi_logout-variant.svg';
// import MasterCardIcon from '../../assets/img/Payment/master-card-logo.svg';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/auth';
import { getAccount, getOrders } from '../../actions/account';

export const PersonalInformationContainer = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [disable, setDisable] = useState(true);
    const [selectedCard, setSelectedCard] = useState('');
    const [accountData, setAccountData] = useState('');
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logOut(user?.username, history));
        localStorage.removeItem('profile');
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
        dispatch(getOrders(user?.username));
    }, [dispatch]);

    return (
        <>
            <HeaderNav />
            <div className="personalInformationWrapper">
                <div className="container">
                    <div className="d-flex align-items-start">
                        <div className="side-nav">
                            <h1 className="title">Account</h1>
                            <div className="card">
                                <ul className="nav nav-tabs flex-column">
                                    <li><a data-toggle="tab" href="#personal-info" className="active"><img src={AccountUser} alt="" />Personal Information</a></li>
                                    <li><a data-toggle="tab" href="#order-history"><img src={CartIcon} alt="" />Order History</a></li>
                                    <li><a data-toggle="tab" href="#!" onClick={handleLogout} ><img src={LogOutIcon} alt="" />Log Out</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="information">
                            <div className="tab-content">
                                <div id="personal-info" className="tab-pane fade in active show">
                                    <h1 className="title">Personal Information</h1>
                                    <div className="card">
                                        <PersonalInfo disable={disable} setDisable={setDisable} account={account} accountData={accountData} setAccountData={setAccountData} />
                                        <h2 className="sub-title">Payment Information</h2>
                                        <label>Cards</label>
                                        <Cards disable={disable} selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='account' />
                                        
                                    </div>
                                </div>
                                <div id="order-history" className="tab-pane fade">
                                    <h1 className="title">Order History</h1>
                                    <div className="card">
                                        <OrdersHistory account={account} />
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