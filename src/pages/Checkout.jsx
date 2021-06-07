import React, { useEffect, useState } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import  { ItemList } from '../components/cart/itemList';
import  { OrderSummary } from '../components/cart/orderSummary';
import  { CheckoutInfo } from '../components/cart/info';
import { Helmet } from 'react-helmet';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCart } from '../actions/cart';
import { useHistory } from 'react-router';

export const CheckoutContainer = () => {
    const cart = useSelector((state) => state.cart);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [selectedBilling, setSelectedBilling] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
    },[dispatch]);

    useEffect(()=>{
        if (cart?.cartData?.length < 1) history.push("/cart");
    },[cart]);

    return (
        <>
            <Helmet>
                <title>Checkout | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
                <div className="container-fluid cart-page">
                    <h1 className="title">Place Order</h1>
                    <div className="main-content-container d-flex align-items-start">
                        <div className="cart-items">
                            
                            <ItemList cart={cart} page={'checkout'} />
                        </div>
                        <div className="right-container">
                            <CheckoutInfo 
                                cart={cart}
                                selectedShipping={selectedShipping} 
                                setSelectedShipping={setSelectedShipping}
                                selectedBilling={selectedBilling} 
                                setSelectedBilling={setSelectedBilling} 
                            />
                            <OrderSummary 
                                selectedShipping={selectedShipping} 
                                selectedBilling={selectedBilling} 
                                cart={cart} 
                                page={'checkout'} 
                            />
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
};
