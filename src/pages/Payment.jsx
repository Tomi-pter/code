import React, { useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Cards } from '../components/account/cards';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { payment } from '../actions/payment';
import { getCart } from '../actions/cart';
import { getAccount } from '../actions/account';
import { Link } from 'react-router-dom';

export const PaymentContainer = () => {
    const cart = useSelector((state) => state.cart); 
    const account = useSelector((state) => state.account);   
    const [selectedCard, setSelectedCard] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        const accountData = account?.accountData;
        const amount = parseInt(cart?.checkoutDetail?.total);
        const billingAddress = cart?.checkoutDetail?.selectedBilling;
        const shippingAddress = cart?.checkoutDetail?.selectedShipping;
        const body = {
            code: cart?.discountDetail?.id,
            paymentMethodId: selectedCard,
            amount,
            billingAddress,
            shippingAddress,
            accountData
        }
        dispatch(payment(user?.username, body, history));
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
        dispatch(getAccount(user?.username));
    },[dispatch]);

    useEffect(()=>{
        if (!cart?.checkoutDetail) history.push("/checkout");
    },[cart]);

    console.log(account);

    return (
        <>
            <HeaderNav />
            <div className="container-fluid payment-page">
                <h1 className="title">Payment</h1>
                <div className="d-flex align-items-start">
                    <div className="payments-container">
                        <div className="payments">
                            <h1 className="title">Payment Methods</h1>
                            <ul className="nav nav-tabs">
                                <li><a data-toggle="tab" href="#card" className="active">Credit Card</a></li>
                                <li><a data-toggle="tab" href="#terms">Pay by Terms</a></li>
                            </ul>
                            <div className="tab-content">
                                <div id="card" className="tab-pane fade in active show">
                                    <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='payment' />
                                </div>
                                <div id="terms" className="tab-pane fade">
                                    <div className="d-flex align-items-center justify-content-between terms-copy">
                                        <div className="mr-5">
                                            <h2>REMINDER</h2>
                                            <p>By selecting payment by terms you agree that ...... it will take within 24 hours to confirm your eligibility to use this as a payment option. </p>
                                            <p>We will send an email to update the status of your order.</p>
                                        </div>
                                        <img src={require("../assets/icon/card-active.svg")} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end actions-container">
                                <Link to="checkout" className="btn back-btn">{"< Cart"}</Link>
                                <button className="btn proceed-btn" onClick={handlePayment} disabled={selectedCard === '' ? true : null}>
                                    {isLoading ?
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <>
                                        Place Order
                                        </>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="total-container">
                        <h1 className="title">Total Amount</h1>
                        <div className="d-flex align-items-end justify-content-center">
                            <p className="amount">{cart?.checkoutDetail?.finalTotal} <span> USD</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
