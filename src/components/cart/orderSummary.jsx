import React from 'react';
import { Link } from 'react-router-dom';
import DiscountForm from './discountForm';

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
        <div className="order-summary">
            <h1 className="title">Order Summary</h1>
            <ul className="summary-list">
                <li>
                    <div>
                        <p>Subtotal ({ totalItems() } items)</p>
                    </div>
                    <p>${ subTotal() }</p>
                </li>
                <li>
                    <div>
                        <p>Shipping Fee</p>
                        <span>Add $xx for free shipping</span>
                    </div>
                    <p>${ subTotal() }</p>
                </li>
            </ul>
            {page === 'checkout' && <DiscountForm />}
            <div className="d-flex align-items-center justify-content-between total">
                <span>Total</span>
                <span>${ total() }</span>
            </div>
            <div className="d-flex justify-content-end">
            {   
                cart?.cartData.length > 0 ? 
                <Link to={page === 'cart' ? '/checkout' : '/payment'} className="btn proceed-btn">
                    {page === 'cart' ? 'Proceed to Checkout' : 'Place Order' }
                </Link>
                :
                <Link to="/" onClick={ (event) => event.preventDefault() } className="btn proceed-btn disabled">
                    {page === 'cart' ? 'Proceed to Checkout' : 'Place Order' }
                </Link>
            }
            </div>
        </div>
    )
}