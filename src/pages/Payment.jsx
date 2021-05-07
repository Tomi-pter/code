import React, { useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Cards } from '../components/account/cards';
// import GooglePay from '../assets/img/Payment/Google_Pay.svg';
// import ApplePay from '../assets/img/Payment/Apple_Pay.svg';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { payment } from '../actions/payment';
import { getCart } from '../actions/cart';

export const PaymentContainer = () => {
    const cart = useSelector((state) => state.cart);    
    const [selectedCard, setSelectedCard] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        // const amount = (parseFloat(cart?.checkoutDetail?.finalTotal) * 100);
        const amount = parseInt(cart?.checkoutDetail?.total);
        const body = {
            code: cart?.discountDetail?.id,
            paymentMethodId: selectedCard,
            amount
        }
        dispatch(payment(user?.username, body, history));
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
    },[dispatch]);

    useEffect(()=>{
        if (!cart?.checkoutDetail) history.push("/checkout");
    },[cart]);


    return (
        <>
            <HeaderNav />
            <div className="container-fluid payment-page">
                <h1 className="title">Payment</h1>
                <div className="d-flex align-items-start">
                    <div className="cards-container">
                        <div className="cards">
                            {/* <h1 className="title">Payment Methods</h1> */}
                            {/* <ul className="nav nav-tabs">
                                <li><a data-toggle="tab" href="#card" className="active">Credit Card</a></li>
                                <li><a data-toggle="tab" href="#google"><img className="payment-icon" src={GooglePay} alt="" /></a></li>
                                <li><a data-toggle="tab" href="#apple"><img className="payment-icon" src={ApplePay} alt="" /></a></li>
                            </ul> */}
                            {/* <div className="tab-content">
                                <div id="card" className="tab-pane fade in active show">
                                    <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='payment' />
                                </div>
                                <div id="google" className="tab-pane fade">
                                    <h3>GOOGLE PAY</h3>
                                </div>
                                <div id="apple" className="tab-pane fade">
                                    <h3>APPLE PAY</h3>
                                </div>
                            </div> */}
                            <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='payment' />
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
                    <div className="total-container">
                        <h1 className="title">Total Amount</h1>
                        <div className="d-flex align-items-center justify-content-center amount">
                            {cart?.checkoutDetail?.finalTotal} <span> USD</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
