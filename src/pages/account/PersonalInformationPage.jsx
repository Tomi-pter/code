import React, {useEffect} from 'react';
import { Button } from 'antd';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import AccountUser from '../../assets/img/Account/user-icon.svg';
import CartIcon from '../../assets/img/Account/mdi_cart.svg';
import LogOutIcon from '../../assets/img/Account/mdi_logout-variant.svg';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import MasterCardIcon from '../../assets/img/Payment/master-card-logo.svg';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/auth';
import { getAccount } from '../../actions/account';

export const PersonalInformationContainer = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logOut(user?.email, history));
    };

    useEffect(()=>{
        dispatch(getAccount(user?.email));
    },[dispatch]);

    return (
        <>
            <HeaderNav />
            <div className="personalInformationWrapper">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div className="col-lg-4 mb-5">
                            <h1 className="section-title">Account</h1>
                            <ul className="nav nav-tabs d-block account-tabs" id="accountTab" role="tablist">
                                <li className="">
                                    <a className="nav-link active" data-toggle="tab" href="#personalInformation" role="tab" aria-controls="personalHistory"><span className="mr-3"><img src={AccountUser} alt="" /></span>Personal Information</a>
                                </li>
                                <li className="">
                                    <a className="nav-link" data-toggle="tab" href="#orderHistory" role="tab" aria-controls="orderHistory"><span className="mr-3"><img src={CartIcon} alt="" /></span>Order History</a>
                                </li>
                                <li className="">
                                    <a className="nav-link" onClick={handleLogout} ><span className="mr-3"><img src={LogOutIcon} alt="" /></span>Log Out</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <h1 className="section-title">Personal Information</h1>
                            <div className="tab-content">
                                <div className="tab-pane active" id="personalInformation" role="tabpanel">
                                    <div className="d-flex flex-column justify-space-between">
                                        <div className="info-section d-flex align-items-center">
                                            <div>
                                                <img className="profilePic mr-4" src={ProfilePic} alt="" />
                                            </div>
                                            <div className="flex-fill">
                                                <p className="mb-0 customerName"> {account.accountData?.given_name + ' ' + account.accountData?.family_name} </p>
                                                <a className="changeProfile">Change Profile Photo</a>
                                            </div>
                                            <div>
                                                <a>
                                                    <img className="editIcon" src={EditIcon} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="account-section">
                                            <form>
                                                <div className="account-info row">
                                                    <div className="col-lg-12">
                                                        <h1 className="wrapper-title">
                                                            Account Information
                                                    </h1>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="first_name">First Name</label>
                                                            <input
                                                                name="first_name"
                                                                type="text"
                                                                value={account.accountData?.given_name || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="last_name">Last Name</label>
                                                            <input
                                                                name="last_name"
                                                                type="text"
                                                                value={account.accountData?.family_name || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="email">E-mail Address</label>
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                value={account.accountData?.email || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="email">Mobile Number</label>
                                                            <input
                                                                name="phone_number"
                                                                type="text"
                                                                value={account.accountData?.phone_number || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shipping-info row">
                                                    <div className="col-lg-12">
                                                        <h1 className="wrapper-title">
                                                            Shipping Address
                                                    </h1>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="address">Address</label>
                                                            <input
                                                                name="address"
                                                                type="text"
                                                                value={account.accountData?.address || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="city">City</label>
                                                            <input
                                                                name="city"
                                                                type="text"
                                                                value={account.accountData?.['custom:city'] || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="state">State</label>
                                                            <input
                                                                name="state"
                                                                type="text"
                                                                value={account.accountData?.['custom:state'] || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="postal">Postal Code</label>
                                                            <input
                                                                name="postal"
                                                                type="text"
                                                                value={account.accountData?.['custom:postal_code'] || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group d-flex flex-column">
                                                            <label htmlFor="company">Company Name</label>
                                                            <input
                                                                name="company"
                                                                type="text"
                                                                value={account.accountData?.['custom:company'] || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h1 className="wrapper-title">
                                                            Payment Information
                                                    </h1>
                                                        <div className="cardsWrapper">
                                                            <p className="cards-title">
                                                                Cards
                                                            </p>
                                                            <div className="creditCardRow d-flex align-items-center active-card mb-3">
                                                                <div className="cardItem d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div>
                                                                        <img src={MasterCardIcon} alt="" />
                                                                    </div>
                                                                    <div className="">
                                                                        <p className="mb-0">5124**********1235</p>
                                                                    </div>
                                                                    <div></div>
                                                                </div>
                                                                <div className="default-badge">
                                                                    Default
                                                            </div>
                                                            </div>
                                                            <div className="creditCardRow  mb-3">
                                                                <div className="cardItem d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div>
                                                                        <img src={MasterCardIcon} alt="" />
                                                                    </div>
                                                                    <div className="">
                                                                        <p className="mb-0">5124**********1235</p>
                                                                    </div>
                                                                    <div></div>
                                                                </div>
                                                            </div>
                                                            <a className="addCard">+ Add new card</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="orderHistory" role="tabpanel">
                                    <div className="filterRow col-lg-12">
                                        <div className="d-flex align-items-center ">
                                            <div>
                                                <Button>All</Button>
                                            </div>
                                            <div>
                                                <Button>Delivered <span className="countBadge">7</span></Button>
                                            </div>
                                            <div>
                                                <Button>In Transit <span className="countBadge">2</span></Button>
                                            </div>
                                            <div>
                                                <Button>Pending <span className="countBadge">1</span></Button>
                                            </div>
                                            <div>
                                                <Button>Canceled <span className="countBadge">1</span></Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="orderDetails">
                                        <div className="d-flex flex-wrap align-items-start justify-content-between">
                                            <div>
                                                <p className="orderNumber mb-0">Order #1234561231</p>
                                                <p className="orderDate">Placed on March 16, 2021</p>
                                            </div>
                                            <div>
                                                <p className="orderTotal mb-0">
                                                    400.00USD
                                                </p>
                                                <p className="orderStatus mb-0">
                                                    In Transit
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-lg-3 text-center">
                                                <img src={ProductPlaceholder} alt="" />
                                            </div>
                                            <div className="col-lg-5">
                                                <p className="product-name mb-0">
                                                    Colesevelam 625mg Tabs 180ct
                                                 </p>
                                                <p className="variant-text mb-0">
                                                    Brand: Welchol
                                                </p>
                                                <p className="quantity-text">Quantity: 5</p>
                                            </div>
                                            <div className="col-lg-4">
                                                Get by <br />
                                                March 17 -20, 2021
                                            </div>
                                        </div>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-lg-3 text-center">
                                                <img src={ProductPlaceholder} alt="" />
                                            </div>
                                            <div className="col-lg-5">
                                                <p className="product-name mb-0">
                                                    Colesevelam 625mg Tabs 180ct
                                                 </p>
                                                <p className="variant-text mb-0">
                                                    Brand: Welchol
                                                </p>
                                                <p className="quantity-text">Quantity: 5</p>
                                            </div>
                                            <div className="col-lg-4">
                                                Get by <br />
                                                March 17 -20, 2021
                                            </div>
                                        </div>
                                    </div>
                                    <div className="orderDetails">
                                        <div className="d-flex flex-wrap align-items-start justify-content-between">
                                            <div>
                                                <p className="orderNumber mb-0">Order #1234563214</p>
                                                <p className="orderDate">Placed on March 10, 2021</p>
                                            </div>
                                            <div>
                                                <p className="orderTotal mb-0">
                                                    200.00USD
                                                </p>
                                                <p className="orderStatus mb-0">
                                                    Delivered
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-lg-3 text-center">
                                                <img src={ProductPlaceholder} alt="" />
                                            </div>
                                            <div className="col-lg-5">
                                                <p className="product-name mb-0">
                                                    Colesevelam 625mg Tabs 180ct
                                                 </p>
                                                <p className="variant-text mb-0">
                                                    Brand: Welchol
                                                </p>
                                                <p className="quantity-text">Quantity: 5</p>
                                            </div>
                                            <div className="col-lg-4">
                                                Delivered on  <br />
                                                March 12, 2021
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="logout" role="tabpanel">.3..</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}