import React, {useEffect, useState} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import  { ItemList } from '../components/cart/itemList';
import  { OrderSummary } from '../components/cart/orderSummary';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCart } from '../actions/cart';

export const CartContainer = () => {
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
                <div className="container-fluid d-flex align-items-start cart-page">
                    <div className="cart-items">
                        <h1 className="title">My Cart</h1>
                        <ItemList cart={cart} />
                    </div>
                    <OrderSummary cart={cart} page={'cart'} shipping={shipping} />
                </div>
            <Footer />
        </>
    );
};
