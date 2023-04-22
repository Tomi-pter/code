import React from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { ItemList } from '../components/cart/itemList';
import { OrderSummary } from '../components/cart/orderSummary';
import { NotificationBanner } from '../components/shared/warningNotification';
import { Helmet } from 'react-helmet';

export const CartContainer = () => {

    return (
        <>
            <Helmet>
                <title>Cart | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="cart-header d-flex align-items-center justify-content-between">
                <span>Shopping Cart</span>
                <button className='back-btn'>Back to products</button>
            </div>
            <div className="container-fluid cart-page">
                {/* <h1 className="title">My Cart</h1> */}
                <NotificationBanner />
                <div className="main-content-container d-flex align-items-start">
                    <div className="cart-items">
                        <ItemList page={'cart'} />
                    </div>
                    <OrderSummary page={'cart'} />
                </div>
            </div>
            <Footer />
        </>
    );
};
