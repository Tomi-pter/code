import React, {useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import PaymentConfirmedImg from '../assets/img/Payment/default-check-icon.svg'
import { Link, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';


import { useSelector } from 'react-redux';

export const PaymentConfirmationContainer = () => {
    const payment = useSelector((state) => state.payment);
    const history = useHistory();

    useEffect(()=>{
        if (!payment?.paymentData) history.push("/cart");
    },[payment, history]);

    return (
        <>
            <Helmet>
                <title>Payment Confirmation | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="d-flex align-items-center justify-content-center payment-confirmation">
                <div>
                    <div className="d-flex flex-column align-items-center justify-content-center card">
                        <p className="payment-text">Payment Complete</p>
                        <img src={PaymentConfirmedImg} alt="" />
                        <h1 className="thankyou-text">Thank You</h1>
                        <p className="purchase-text">for your purchase</p>
                    </div>
                    <div className="buttonWrapper d-flex align-items-center justify-content-center">
                        <Link to="/account?order-history" className="secondaryButton">
                            View Order
                        </Link>
                        <Link to="/shop" className="primaryButton">
                            Back to browse
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}