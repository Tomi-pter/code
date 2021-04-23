import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import  { ItemList } from '../components/cart/itemList';
import  { OrderSummary } from '../components/cart/orderSummary';
import  Info from '../components/cart/info';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCart } from '../actions/cart';

export const CheckoutContainer = () => {
    const cart = useSelector((state) => state.cart);
    const [shipping, setShipping] = useState(20);
    const dispatch = useDispatch();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.email));
    },[dispatch]);

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
                        <div className="col-lg-8 product-column">
                            <ItemList cart={cart} />
                        </div>
                        <div className="col-lg-4 order-column">
                            <div className="card order-card position-relative">
                                <div className="shipping-details-wrapper">
                                   <Info />
                                </div>
                                <div className="order-summary-wrapper">
                                    <OrderSummary cart={cart} page={'checkout'} shipping={shipping} />
                                    {/* <h1 className="order-title">Order Summary</h1>
                                    <div className="row align-items-start" style={{ flex: "0" }}>
                                        <div className="col-8">
                                            <p className="subtotal-text">Subtotal (3 items)</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <p className="mb-0 price-text">$300.00</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5" >
                                        <div className="col-8">
                                            <p className="mb-0 shipping-text">Shipping Fee</p>
                                            <p className="mb-0 shipping-desc">Add $xx for free shipping</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <p className="mb-0 price-text">$20.00</p>
                                        </div>
                                    </div>
                                    <div className="row mb-5 d-flex align-items-center">
                                        <div className="col-5">
                                            <p className="mb-0 total-text">Total</p>
                                        </div>
                                        <div className="col-7 text-right">
                                            <p className="mb-0 total-price-text">$320.00</p>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end" style={{ flex: "0" }}>
                                        <button type="submit" className="btn button-wrapper">Place Order</button>
                                    </div> */}
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
