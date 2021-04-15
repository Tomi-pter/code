import React from 'react';
import { Button } from 'antd';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import AccountUser from '../../assets/img/Account/user-icon.svg';
import CartIcon from '../../assets/img/Account/mdi_cart.svg';
import LogOut from '../../assets/img/Account/mdi_logout-variant.svg';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import MasterCardIcon from '../../assets/img/Payment/master-card-logo.svg';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';

import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';

export const PersonalInformationContainer = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        window.location.href = 'https://premierpharma.wpengine.com/'; 
        return null;
    };

    return (
        <>
            <HeaderNav />
            <div className="personalInformationWrapper">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div className="col-lg-4 mb-5">
                            <h1 className="section-title">Account</h1>
                            <ul class="nav nav-tabs d-block account-tabs" id="accountTab" role="tablist">
                                <li class="">
                                    <a class="nav-link active" data-toggle="tab" href="#personalInformation" role="tab" aria-controls="personalHistory"><span className="mr-3"><img src={AccountUser} /></span>Personal Information</a>
                                </li>
                                <li class="">
                                    <a class="nav-link" data-toggle="tab" href="#orderHistory" role="tab" aria-controls="orderHistory"><span className="mr-3"><img src={CartIcon} /></span>Order History</a>
                                </li>
                                <li class="">
                                    <a class="nav-link" onClick={logout} ><span className="mr-3"><img src={LogOut} /></span>Log Out</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <h1 className="section-title">Personal Information</h1>
                            <div class="tab-content">
                                <div class="tab-pane active" id="personalInformation" role="tabpanel">
                                    <div className="d-flex flex-column justify-space-between">
                                        <div className="info-section d-flex align-items-center">
                                            <div>
                                                <img className="profilePic mr-4" src={ProfilePic} />
                                            </div>
                                            <div className="flex-fill">
                                                <p className="mb-0 customerName"> John Doe </p>
                                                <a className="changeProfile">Change Profile Photo</a>
                                            </div>
                                            <div>
                                                <a>
                                                    <img className="editIcon" src={EditIcon} />
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
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="first_name">First Name</label>
                                                            <input
                                                                name="first_name"
                                                                type="text"
                                                                placeholder="John"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="last_name">Last Name</label>
                                                            <input
                                                                name="last_name"
                                                                type="text"
                                                                placeholder="Doe"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="email">E-mail Address</label>
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                placeholder="johndoe@gmail.com"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="email">Mobile Number</label>
                                                            <input
                                                                name="mobile"
                                                                type="number"
                                                                placeholder="123456789"
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
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="address">Address</label>
                                                            <input
                                                                name="address"
                                                                type="text"
                                                                placeholder="74 William St. "
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="city">City</label>
                                                            <input
                                                                name="city"
                                                                type="text"
                                                                placeholder="Laurel"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="state">State</label>
                                                            <input
                                                                name="state"
                                                                type="text"
                                                                placeholder="Maryland"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="postal">Postal Code</label>
                                                            <input
                                                                name="postal"
                                                                type="number"
                                                                placeholder="20707"
                                                            />
                                                        </div>
                                                    </div><div className="col-lg-6">
                                                        <div class="form-group d-flex flex-column">
                                                            <label htmlFor="company">Company Name</label>
                                                            <input
                                                                name="company"
                                                                type="number"
                                                                placeholder="Company Name"
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
                                                                        <img src={MasterCardIcon} />
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
                                                                        <img src={MasterCardIcon} />
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
                                <div class="tab-pane" id="orderHistory" role="tabpanel">
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
                                                <img src={ProductPlaceholder} />
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
                                                <img src={ProductPlaceholder} />
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
                                                <img src={ProductPlaceholder} />
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
                                <div class="tab-pane" id="logout" role="tabpanel">.3..</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}