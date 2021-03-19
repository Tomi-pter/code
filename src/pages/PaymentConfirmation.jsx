import React from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import PaymentConfirmedImg from '../assets/img/Payment/default-check-icon.svg'
import { Link } from "react-router-dom";

export const PaymentConfirmation = () => {
    return (
        <>
            <HeaderNav />
            <div className="payment-confirmation">
                <div className="container-fluid">
                    <div className="section-container position-relative">
                        <div className="thankyouWrapper">
                            <div className="thankyou-card card">
                                <h1 className="card-title">Payment Complete</h1>
                                <div className="imageWrapper">
                                    <img src={PaymentConfirmedImg} />
                                </div>
                                <h1 className="thankyou-text">Thank You</h1>
                                <p className="purchase-text">for your purchase</p>
                            </div>
                            <div className="buttonWrapper d-flex align-items-center justify-content-around">
                                <div>
                                    <Link to="" className="secondaryButton">
                                        View Order
                                </Link>
                                </div>
                                <div>
                                    <Link to="" className="primaryButton">
                                        Back to browse
                                </Link>
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