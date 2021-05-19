import React, {useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import  { ItemList } from '../components/cart/itemList';
import  { OrderSummary } from '../components/cart/orderSummary';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCart } from '../actions/cart';

export const CartContainer = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
    },[dispatch]);

    return (
        <>
            <HeaderNav />
                <div className="container-fluid cart-page">
                    <h1 className="title">My Cart</h1>
                    <div className="main-content-container d-flex align-items-start">
                        <div className="cart-items">
                            <ItemList cart={cart} page={'cart'} />
                        </div>
                        <OrderSummary cart={cart} page={'cart'} />
                    </div>
                </div>
            <Footer />
        </>
    );
};
