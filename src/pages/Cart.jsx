import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { ItemList } from '../components/cart/itemList';
import { OrderSummary } from '../components/cart/orderSummary';
import { NotificationBanner } from '../components/shared/warningNotification';

import Arrow from "../assets/img/Cart/Arrow.svg"
import CartStep1 from "../assets/img/Cart/CartStep1.svg"
import CartStep2Next from "../assets/img/Cart/CartStep2Next.svg"
import CartStep3Next from "../assets/img/Cart/CartStep3Next.svg"
import CartStep4Next from "../assets/img/Cart/CartStep4Next.svg"

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
            <div className="cart-page container-fluid">
                {/* <h1 className="title">My Cart</h1> */}
                <NotificationBanner />
                <div className="main-content-container d-flex align-items-start">
                    <div className='cart-items-container d-flex flex-column align-items-start w-100 mb-4'>
                        <div className="cart-progress d-flex align-items-center justify-content-between">
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep1}/>
                                <span>Cart</span>
                            </div>
                            <div>
                                <img height={14} src={Arrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep2Next}/>
                                <span>Shipping Information</span>
                            </div>
                            <div>
                                <img height={14} src={Arrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep3Next}/>
                                <span>Make Payment</span>
                            </div>
                            <div>
                                <img height={14} src={Arrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep4Next}/>
                                <span>Complete</span>
                            </div>
                        </div>
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
