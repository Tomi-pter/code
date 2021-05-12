import React from 'react';

export const ShippingCounter = ({ cart, path }) => {
    const subTotal = cart.cartData?.length > 0 ? (cart.cartData?.map(item => parseFloat(item.price) * item.quantity).reduce((prev, next) => prev + next)).toFixed(2) : 0;
    const shippingCounter = subTotal >= 150 ? 0 : (150 - parseInt(subTotal)).toFixed(2);
    const percentage = subTotal >= 150 ? 100 : (subTotal / 150) * 100;
    const visible = path === '/shop' || path === '/search' ? true : false

    return (
        <div className={"d-flex align-items-center shipping-counter " + (visible ? '' : 'hidden')}>
            <h1>Free shipping tracker</h1>
            <div className="counter-container">
                <p>Add ${shippingCounter} more for FREE SHIPPING</p>
                <div className="d-flex align-items-center justify-content-between progress-container">
                    <span className="d-none d-md-block">$0</span>
                    <div className="progress">
                        <div className="percent" style={{width: `${percentage}%`}}></div>
                    </div>
                    <span className="d-none d-md-block">$150</span>
                </div>
            </div>
        </div>
    )
}