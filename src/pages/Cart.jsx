import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { ItemList } from '../components/cart/itemList';
import { OrderSummary } from '../components/cart/orderSummary';
import { NotificationBanner } from '../components/shared/warningNotification';

export const CartContainer = () => {

    return (
        <>
            <Helmet>
                <title>Cart | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="cart-header container-fluid d-flex align-items-center justify-content-between">
                <span>Shopping Cart</span>
                <Link to="/shop" className='back-btn'>
                    {"<"}
                    &nbsp;&nbsp;Back to products
                </Link>
            </div>
            <div className="container-fluid cart-page">
                {/* <h1 className="title">My Cart</h1> */}
                <NotificationBanner />
                <div className="main-content-container d-flex align-items-start">
                    <div className='cart-items-container d-flex flex-column align-items-start w-100 mb-4'>
                        <div className="cart-items">
                            <ItemList page={'cart'} />
                        </div>
                    </div>
                    <div className="right-container">
                        <OrderSummary page={'cart'} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
