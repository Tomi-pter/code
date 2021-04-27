import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import { PersonalInfo } from '../../components/account/personalInfo';
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
import { getAccount } from '../../actions/account';

export const PersonalInformationContainer = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [selectedCard, setSelectedCard] = useState('');
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logOut(user?.username, history));
    };

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
    },[dispatch]);

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
                                        <PersonalInfo account={account} />
                                        <h2 className="sub-title">Payment Information</h2>
                                        <label>Cards</label>
                                        <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='account' />
                                    </div>
                                </div>
                                <div id="order-history" className="tab-pane fade">
                                    <h1 className="title">Order History</h1>
                                    <div className="card">
                                        <ul className="nav align-item-center justify-content-around order-nav">
                                            <li className="active">All</li>
                                            <li>Delivered <div className="count">7</div></li>
                                            <li>In Transit <div className="count">2</div></li>
                                            <li>Pending <div className="count">1</div></li>
                                            <li>Canceled <div className="count">1</div></li>
                                        </ul>
                                        <div className="orders">
                                            <div className="order">
                                                <div className="d-flex align-item-center justify-content-between">
                                                    <div className="orderNo">Order #1234561231</div>
                                                    <div className="amount">400.00USD</div>
                                                </div>
                                                <div className="d-flex align-item-center justify-content-between date-status-container">
                                                    <div className="date">Placed on March 16, 2021</div>
                                                    <div className="status">In Transit</div>
                                                </div>
                                                <div className="d-flex align-items-center item">
                                                    <img src={ProductPlaceholder} alt="" />
                                                    <div className="item-info">
                                                        <p className="product-name">
                                                            Colesevelam 625mg Tabs 180ct
                                                        </p>
                                                        <p className="variant-text">
                                                            Brand: Welchol
                                                        </p>
                                                        <p>Quantity: 5</p>
                                                    </div>
                                                    <div>
                                                        <p>Get by </p>
                                                        <p>March 17 -20, 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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