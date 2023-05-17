import React from 'react';

export const ShippingCounter = ({ cart, path }) => {
    /*
        Obsolete Logic:
        For orders greater than or equal to $150, free shipping
        Otherwise, shipping fee is 15 of subtotal
    */
    const FREE_SHIPPING_TOTAL = 150
    /*
        New Logic:
        Minimum for free shipping $100 (currently $150).
        Every order under $100, $20 flat shipping fee (currently is 15% of the total order).
    */
    const subTotal = cart.cartData?.length > 0 ? (cart.cartData?.map(item => parseFloat(item.price) * item.quantity).reduce((prev, next) => prev + next)).toFixed(2) : 0;
    const shippingCounter = subTotal >= FREE_SHIPPING_TOTAL ? 0 : (FREE_SHIPPING_TOTAL - parseFloat(subTotal)).toFixed(2);
    const percentage = subTotal >= FREE_SHIPPING_TOTAL ? 100 : (subTotal / FREE_SHIPPING_TOTAL) * 100;
    const visible = path === '/cart' || path === '/shop' || path === '/search' ? true : false

    return (
        <div className={"shipping-counter d-flex flex-column " + (visible ? '' : 'hidden')}>
            <div className="shipping-label d-flex justify-content-between">
                <h1>FREE SHIPPING TRACKER</h1>
                <p>Add ${shippingCounter} more for FREE SHIPPING</p>
            </div>
            <div className="counter-container">
                <div className="d-flex align-items-center justify-content-between progress-container">
                    <span className="d-none d-md-block">$0</span>
                    <div className="progress">
                        <div className="percent" style={{width: `${percentage}%`}}></div>
                        <div className="price-circle" style={{ left: `${percentage}%` }}>
                            <span className="price">${subTotal}</span>
                        </div>
                    </div>
                    <span className="d-none d-md-block">$ {FREE_SHIPPING_TOTAL}</span>
                </div>
            </div>
        </div>
    )
}
