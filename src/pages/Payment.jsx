import React, { useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Cards } from '../components/account/cards';
import { Helmet } from 'react-helmet';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { payment, paymentByTerms } from '../actions/payment';
import { getCart } from '../actions/cart';
import { getAccount, getFishbowlAccount } from '../actions/account';
import { Link } from 'react-router-dom';

export const PaymentContainer = () => {
    const cart = useSelector((state) => state.cart); 
    const account = useSelector((state) => state.account);   
    const [selectedCard, setSelectedCard] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('terms');
    const [enablePayByTerms, setEnablePayByTerms] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePayment = (type) => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        const accountData = account?.accountData;
        const amount = parseFloat(cart?.checkoutDetail?.total);
        const billingAddress = cart?.checkoutDetail?.selectedBilling;
        const shippingAddress = cart?.checkoutDetail?.selectedShipping;
        const role = user.roles && user.AuthenticationResult ? 'admin' : 'user'
        const body = {
            code: cart?.discountDetail?.discount_data?.name,
            // paymentMethodId: selectedCard,
            cardNonce: selectedCard,
            amount,
            billingAddress,
            shippingAddress,
            accountData,
            role
        }
        type === 'card' ? dispatch(payment(user?.username, body, history)) : dispatch(paymentByTerms(user?.username, body, history));
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
        dispatch(getAccount(user?.username));
        dispatch(getFishbowlAccount(user?.username));
    },[dispatch]);

    useEffect(()=>{
        if (!cart?.checkoutDetail) history.push("/checkout");
    },[cart]);

    useEffect(()=>{
        const paymentTerms = account?.fishbowlAccountData?.data?.paymentTerms?.toLowerCase();
        if (paymentTerms && paymentTerms?.includes("net")) {
            setEnablePayByTerms(true);
        }
    },[account]);

    return (
        <>
            <Helmet>
                <title>Payment | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="container-fluid payment-page">
                <h1 className="title">Payment</h1>
                <div className="main-content-container d-flex align-items-start">
                    <div className="payments-container">
                        <div className="payments">
                            <h1 className="title">Payment Methods</h1>
                            <ul className="nav nav-tabs">
                                {/* <li><a data-toggle="tab" href="#card" className="active" onClick={()=>setSelectedMethod('card')}>Credit Card</a></li> */}
                                { enablePayByTerms && <li><a data-toggle="tab" href="#terms" className="active" onClick={()=>setSelectedMethod('terms')}>Pay by Terms</a></li> }
                            </ul>
                            <div className="tab-content">
                                {/* <div id="card" className="tab-pane fade in active show">
                                    <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} page='payment' />
                                </div> */}
                                { enablePayByTerms && 
                                    <div id="terms" className="tab-pane fade active show">
                                        <div className="d-flex align-items-center justify-content-between terms-copy">
                                            <div className="mr-5">
                                                <h2>REMINDER</h2>
                                                <ul>
                                                    <li>If payment terms have already been established you will receive an invoice via email once the order has been processed.</li>
                                                    <li>If payment terms have not been established, you agree that within 24 hours Premier Pharmaceuticals will confirm your eligibility to use this payment option. Your dedicated sales rep will contact you with confirmation.</li>
                                                </ul>
                                            </div>
                                            <img src={require("../assets/icon/card-active.svg")} alt="" />
                                        </div>
                                    </div> 
                                }
                            </div>
                            <div className="d-flex align-items-center justify-content-end actions-container">
                                <Link to="checkout" className="btn back-btn">{"<"}<span> Checkout</span></Link>
                                <button className="btn proceed-btn" onClick={()=>selectedMethod === "card" ? handlePayment("card") : handlePayment("term")} disabled={selectedCard === '' && selectedMethod === "card" ? true : null}>
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
