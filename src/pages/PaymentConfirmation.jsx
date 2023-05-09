import React, { useEffect } from 'react';
import PaymentConfirmedImg from '../assets/img/Payment/order.svg'
import { Link, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { clearCart } from '../actions/cart';

export const PaymentConfirmationContainer = () => {
    const payment = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    const history = useHistory();

    // useEffect(()=>{
    //     if (!payment?.paymentData) {
    //         history.push("/cart")
    //     } else {
    //         dispatch(clearCart())
    //     }
    // },[payment, history]);

    return <>
        <Helmet>
            <title>Payment Confirmation | Premier Pharmaceuticals</title>
        </Helmet>
        <div className="payment-confirmation d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <img src={PaymentConfirmedImg} alt="" />
                <h2>Your Order is complete</h2>
                <p>We have processed your payment! Thank you for your purchase.</p>
            </div>
            <div className="buttonWrapper d-flex align-items-center justify-content-center">
                <Link to="/account?order-history" className="primaryButton">
                    View Order
                </Link>
                <Link to="/shop" className="secondaryButton">
                    Back to browse
                </Link>
            </div>
        </div>
    </>
}