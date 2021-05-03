import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { DiscountForm } from './discountForm';

import { checkout } from '../../actions/cart';

export const OrderSummary = ({ cart, page }) => {
    const [discountCode, setDiscountCode] = useState('');
    const [discountDetail, setDiscountDetail] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const itemCount = cart.cartData.length > 0 ? cart.cartData.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
    const subTotal = cart.cartData.length > 0 ? (cart.cartData.map(item => parseFloat(item.price) * item.quantity).reduce((prev, next) => prev + next)).toFixed(2) : 0;
    const shipping = subTotal >= 100 ? 0 : (Math.round((subTotal * 100) * (15 / 100)) / 100);
    const shippingCounter = subTotal >= 100 ? 0 : (100 - subTotal);
    const discount = discountDetail?.percent_off / 100;
    const total = cart.cartData.length > 0 ? (parseFloat(subTotal) + shipping) : 0;
    // const finalTotal = discount ? total - (total * discount) : total;
    const finalTotal = discount ? (Math.round((total * 100) * discount) / 100) : total;

    const handleCheckout = () => {
        const checkoutDetail = {
            finalTotal,
            total,
            discountCode
        }
        dispatch(checkout(checkoutDetail, history));
    }

    return (
        <div className="order-summary">
            <h1 className="title">Order Summary</h1>
            <ul className="summary-list">
                <li>
                    <div>
                        <p>Subtotal ({ itemCount } items)</p>
                    </div>
                    <p>${ subTotal }</p>
                </li>
                <li>
                    <div>
                        <p>Shipping Fee</p>
                        { shipping < 100 && <span>Add ${shippingCounter} for free shipping</span>}
                    </div>
                    <p>${ shipping }</p>
                </li>
            </ul>
            {page === 'checkout' && <DiscountForm discountCode={discountCode} setDiscountCode={setDiscountCode} setDiscountDetail={setDiscountDetail} />}
            <div className="d-flex align-items-center justify-content-between total">
                <span>Total</span>
                <span>${ finalTotal }</span>
            </div>
            <div className="d-flex justify-content-end">
            {   page === 'cart' ? 
                    cart?.cartData.length > 0 ? 
                    <Link to="checkout" className="btn proceed-btn">
                        {page === 'cart' ? 'Proceed to Checkout' : 'Place Order' }
                    </Link>
                    :
                    <Link to="/" onClick={ (event) => event.preventDefault() } className="btn proceed-btn disabled">
                        {page === 'cart' ? 'Proceed to Checkout' : 'Place Order' }
                    </Link>
                :
                <button className="proceed-btn" onClick={handleCheckout}>Place Order</button>
            }
            </div>
        </div>
    )
}