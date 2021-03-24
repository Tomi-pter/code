import React from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";

export const CheckoutContainer = () => {
    return (
        <>
            <HeaderNav />
            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div chlassName="col-12">
                            <h1 className="section-title">Place Order</h1>
                        </div>
                    </div>
                    <div className="row row-wrapper">
                        <div className="col-lg-8">
                            <div className="card product-card position-relative">
                                <div className="row ">
                                    <div className="position-absolute" style={{ right: "0" }}>
                                        <a>
                                            <img className="delete-icon mr-4 mt-4" src={require("../assets/img/delete_icon.svg")} />
                                        </a>
                                    </div>
                                    <div className="col-lg-5 product-wrapper">
                                        <img className="product-image" src={require("../assets/img/product-placeholder.svg")} />
                                    </div>
                                    <div className="col-lg-6 offset-md-1 product-desc-wrapper">
                                        <p className="product-name mb-0">
                                            Colesevelam 625mg Tabs 180ct
                                        </p>
                                        <p className="variant-text mb-0">
                                            Brand: Welchol
                                        </p>
                                        <p className="price-text mb-0">
                                            $ 999.99
                                        </p>
                                        <p className="quantity-text">x1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card product-card position-relative">
                                <div className="row ">
                                    <div className="position-absolute" style={{ right: "0" }}>
                                        <a>
                                            <img className="delete-icon mr-4 mt-4" src={require("../assets/img/delete_icon.svg")} />
                                        </a>
                                    </div>
                                    <div className="col-lg-5 product-wrapper">
                                        <img className="product-image" src={require("../assets/img/product-placeholder.svg")} />
                                    </div>
                                    <div className="col-lg-6 offset-md-1 product-desc-wrapper">
                                        <p className="product-name mb-0">
                                            Colesevelam 625mg Tabs 180ct
                                        </p>
                                        <p className="variant-text mb-0">
                                            Brand: Welchol
                                        </p>
                                        <p className="price-text mb-0">
                                            $ 999.99
                                        </p>
                                        <p className="quantity-text">x1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card product-card position-relative">
                                <div className="row ">
                                    <div className="position-absolute" style={{ right: "0" }}>
                                        <a>
                                            <img className="delete-icon mr-4 mt-4" src={require("../assets/img/delete_icon.svg")} />
                                        </a>
                                    </div>
                                    <div className="col-lg-5 product-wrapper">
                                        <img className="product-image" src={require("../assets/img/product-placeholder.svg")} />
                                    </div>
                                    <div className="col-lg-6 offset-md-1 product-desc-wrapper">
                                        <p className="product-name mb-0">
                                            Colesevelam 625mg Tabs 180ct
                                        </p>
                                        <p className="variant-text mb-0">
                                            Brand: Welchol
                                        </p>
                                        <p className="price-text mb-0">
                                            $ 999.99
                                        </p>
                                        <p className="quantity-text">x1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card order-card position-relative">
                                <div className="shipping-details-wrapper">
                                    <h1 className="order-title">Shipping and Billing</h1>
                                    <div className="row align-items-start" style={{ flex: "0" }}>
                                        <div className="col-lg-12">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <span className="mr-3"><img src={require("../assets/img/mdi_account.svg")} /></span>
                                                </div>
                                                <div>
                                                    <p className="customer-name mb-0" style={{ maxWidth: "210px" }}>John Doe</p>
                                                </div>
                                                <div>
                                                    <span className="addressDefault">Default</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <div>
                                                    <span className="mr-3"><img src={require("../assets/img/mdi_map-marker.svg")} /></span>
                                                </div>
                                                <div>
                                                    <p className="customer-address mb-0" style={{ maxWidth: "210px" }}>74 Williams St. Laurel, MD 20707</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <div>
                                                    <span className="mr-3"><img src={require("../assets/img/mdi_phone.svg")} /></span>
                                                </div>
                                                <div>
                                                    <p className="customer-phone mb-0">123456789</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <div>
                                                    <span className="mr-3"><img src={require("../assets/img/mdi_email.svg")} /></span>
                                                </div>
                                                <div>
                                                    <p className="customer-email mb-0" >johndoe@gmail.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-summary-wrapper">
                                    <h1 className="order-title">Order Summary</h1>
                                    <div className="row align-items-start" style={{ flex: "0" }}>
                                        <div className="col-8">
                                            <p className="subtotal-text">Subtotal (3 items)</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <p className="mb-0 price-text">$300.00</p>
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-8">
                                            <p className="mb-0 shipping-text">Shipping Fee</p>
                                            <p className="mb-0 shipping-desc">Add $xx for free shipping</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <p className="mb-0 price-text">$20.00</p>
                                        </div>
                                    </div>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-4">
                                            <p className="mb-0 total-text">Total</p>
                                        </div>
                                        <div className="col-8 text-right">
                                            <p className="mb-0 total-price-text">$320.00</p>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end" style={{ flex: "0" }}>
                                        <button type="submit" className="btn button-wrapper">Proceed to Checkout</button>
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
