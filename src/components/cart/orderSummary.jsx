import React from 'react';
import { Link } from 'react-router-dom';
import DiscountForm from './discount';

export const OrderSummary = ({ cart, page, shipping }) => {

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

    return (
        <div>
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
            {page === 'checkout' && <DiscountForm />}
            <div className="row d-flex align-items-center">
                <div className="col-5">
                    <p className="mb-0 total-text">Total</p>
                </div>
                <div className="col-7 text-right">
                    <p className="mb-0 total-price-text">${ total() }</p>
                </div>
            </div>
            <div className="row justify-content-end" style={{ flex: "0" }}>
            {
                page === 'cart' ?
                    <Link to={'/checkout'} className="btn button-wrapper">
                        Proceed to Checkout
                    </Link>
                    :
                    <Link to={'/payment'} className="btn button-wrapper">
                        Place Order
                    </Link>
             }
            </div>
        </div>
    )
}