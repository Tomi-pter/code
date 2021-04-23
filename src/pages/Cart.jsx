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
            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div className="col-12">
                            <h1 className="section-title">My Cart</h1>
                        </div>
                    </div>
                    <div className="row row-wrapper">
                        <div className="col-lg-8 product-column">
                            <ItemList cart={cart} />
                        </div>
                        <div className="col-lg-4  order-column">
                            <div className="card order-card position-relative">
                                <OrderSummary cart={cart} page={'cart'} shipping={shipping} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
