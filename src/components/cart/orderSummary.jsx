import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { DiscountForm } from './discountForm';

import { checkout } from '../../actions/cart';

export const OrderSummary = ({ selectedShipping, selectedBilling, cart, page }) => {
    const [discountCode, setDiscountCode] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const itemCount = cart.cartData?.length > 0 ? cart.cartData?.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
    const subTotalCalc = cart.cartData?.length > 0 ? (cart.cartData?.map(item => parseFloat(item.price) * item.quantity).reduce((prev, next) => prev + next)) : 0;
    const subTotal = parseFloat(subTotalCalc).toFixed(2);
    const shipping = subTotal >= 150 ? 0 : ((15 / 100) * subTotal).toFixed(2);
    const shippingCounter = subTotal >= 150 ? 0 : (150 - subTotal).toFixed(2);
    const totalCalc = cart.cartData?.length > 0 ? parseFloat(subTotal) + parseFloat(shipping) : 0;
    const total = parseFloat(totalCalc).toFixed(2)
    const discount = cart?.discountDetail?.percent_off / 100; //discount decimal
    const discountAmount = discount ? (discount * total).toFixed(2) : 0;
    const finalTotal = discount ? (Math.round((total * 100) * (1 - discount)) / 100) : total;
    // const finalTotal = discount ? (Math.round((total * 100) * discount) / 100) : total;

    const handleCheckout = () => {
        const checkoutDetail = {
            finalTotal,
            total,
            discountCode,
            selectedShipping,
            selectedBilling
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
            {page === 'checkout' && 
                <DiscountForm 
                    discountCode={discountCode} 
                    setDiscountCode={setDiscountCode} 
                    discountAmount={discountAmount}
                />
            }
            <div className="d-flex align-items-center justify-content-between total">
                <span>Total</span>
                <span>${ finalTotal }</span>
            </div>
            <div className="d-flex justify-content-between actions-container">
            {   page === 'cart' ? 
                    cart.cartData?.length > 0 ? 
                    <Link to="checkout" className="btn proceed-btn">
                        Proceed to Checkout
                    </Link>
                    :
                    <Link to="/" onClick={ (event) => event.preventDefault() } className="btn proceed-btn disabled">
                       Proceed to Checkout
                    </Link>
                :
                <>
                    <Link to={(page === 'checkout' ? "cart" : "checkout")} className="btn back-btn">{"<"}<span>Back</span></Link>
                    <button className="proceed-btn place-order" onClick={handleCheckout}>Place Order</button>
                </>
            }
            </div>
        </div>
    )
}