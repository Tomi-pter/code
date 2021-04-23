import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import Input from "../components/shared/input";

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCart, removeCart } from '../actions/cart';

export const CartContainer = () => {
    const cart = useSelector((state) => state.cart);
    const [shipping, setShipping] = useState(20);
    const dispatch = useDispatch();

    const totalItems = () => { 
        const total = cart.cartData.length > 0 ? cart.cartData.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
        return total;
    }

    const subTotal = () => {
        const total = cart.cartData.length > 0 ? cart.cartData.map(item => parseFloat(item.price) * item.quantity).reduce((prev, next) => prev + next) : 0;
        return total;
    }

    const total = () => {
        const total = cart.cartData.length > 0 ? (subTotal() + shipping).toFixed(2) : 0;
        return total;
    }

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
                            { cart.cartData.length === 0 && <div>Your Cart is Empty</div> }
                            {
                                cart.cartData.map(cartItem => (
                                    <div key={`key`+ cartItem.productId} className="card product-card position-relative">
                                        <div className="row ">
                                            <div className="position-absolute" style={{ right: "0" }}>
                                                <a href="#!" onClick={()=>dispatch(removeCart(parseInt(cartItem.productId)))}>
                                                    <img className="delete-icon mr-4 mt-4" src={require("../assets/img/delete_icon.svg")} />
                                                </a>
                                            </div>
                                            <div className="col-lg-4 product-wrapper">
                                                <img className="product-image" src={require("../assets/img/product-placeholder.svg")} />
                                            </div>
                                            <div className="col-lg-6 offset-md-1 product-desc-wrapper">
                                                <p className="product-name mb-0">
                                                    {cartItem.productName}
                                                </p>
                                                <p className="variant-text mb-0">
                                                    Brand: Welchol
                                                </p>
                                                <p className="price-text mb-0">
                                                    {cartItem.price}
                                                </p>
                                                <p className="quantity-text">x{cartItem.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-lg-4  order-column">
                            <div className="card order-card position-relative">
                                <h1 className="order-title">Order Summary</h1>
                                <div className="row align-items-start" style={{ flex: "0" }}>
                                    <div className="col-8">
                                        <p className="subtotal-text">Subtotal ({ totalItems() } items)</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <p className="mb-0 price-text">${ subTotal() }</p>
                                    </div>
                                </div>
                                <div className="row" style={{ flex: "1" }}>
                                    <div className="col-8">
                                        <p className="mb-0 shipping-text">Shipping Fee</p>
                                        <p className="mb-0 shipping-desc">Add $xx for free shipping</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <p className="mb-0 price-text">${shipping}</p>
                                    </div>
                                </div>
                                <div className="row d-flex align-items-center">
                                    <div className="col-5">
                                        <p className="mb-0 total-text">Total</p>
                                    </div>
                                    <div className="col-7 text-right">
                                        <p className="mb-0 total-price-text">${ total() }</p>
                                    </div>
                                </div>
                                <div className="row justify-content-end" style={{ flex: "0" }}>
                                    <Link to={'/checkout'} className="btn button-wrapper">Proceed to Checkout</Link>
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
