import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DiscountForm } from "./discountForm";

import { checkout } from "../../actions/cart";

export const OrderSummary = ({ selectedShipping, selectedBilling, page }) => {
  /*
        Obsolete Logic:
        For orders greater than or equal to $150, free shipping
        Otherwise, shipping fee is 15 of subtotal
    */
  const FREE_SHIPPING_TOTAL = 150;
  /*
        New Logic:
        Minimum for free shipping $100 (currently $150).
        Every order under $100, $20 flat shipping fee (currently is 15% of the total order).
    */

  const cart = useSelector((state) => state.cart);
  const [discountCode, setDiscountCode] = useState("");
  const [customerRefNumber, setCustomerRefNumber] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const itemCount =
    cart.countData?.length > 0
      ? cart.countData
          ?.map((item) => parseInt(item.quantity))
          .reduce((prev, next) => prev + next)
      : 0;
  const subTotalCalc =
    cart.countData?.length > 0
      ? cart.countData
          ?.map((item) => parseFloat(item.price) * item.quantity)
          .reduce((prev, next) => prev + next)
      : 0;
  const subTotal = parseFloat(subTotalCalc).toFixed(2);
  const shipping = subTotal >= FREE_SHIPPING_TOTAL ? 0 : 20;
  const shippingCounter =
    subTotal >= FREE_SHIPPING_TOTAL
      ? 0
      : (FREE_SHIPPING_TOTAL - parseFloat(subTotal)).toFixed(2);
  const totalCalc =
    cart.countData?.length > 0
      ? parseFloat(subTotal) + parseFloat(shipping)
      : 0;
  const total = parseFloat(totalCalc).toFixed(2);
  const discount = cart?.discountDetail?.discount_data?.percentage / 100; //discount decimal
  const discountAmount = discount ? (discount * total).toFixed(2) : 0;
  const finalTotal = discount
    ? Math.round(total * 100 * (1 - discount)) / 100
    : total;
  // const finalTotal = discount ? (Math.round((total * 100) * discount) / 100) : total;

  const handleCheckout = () => {
    const checkoutDetail = {
      finalTotal,
      total,
      discountCode,
      selectedShipping,
      selectedBilling,
      customerRefNumber,
    };
    dispatch(checkout(checkoutDetail, history));
  };

    return <>
        {
            (page === "checkout" || page === "cart")
            && <>
                <div className="discount-container">
                    <h2>Reference / PO (Optional)</h2>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Reference Number"
                            value={customerRefNumber}
                            onChange={(e) => setCustomerRefNumber(e.target.value)}
                        />
                    </div>
                </div>
                <DiscountForm
                    cart={cart}
                    discountCode={discountCode}
                    setDiscountCode={setDiscountCode}
                    discountAmount={discountAmount}
                />
            </>
        }

        <div className="order-summary">
            <div className="d-flex align-items-center justify-content-between mb-5">
                <h2>Order Summary</h2>
                <span className="item-count">{itemCount} items</span>
            </div>
            <ul className="summary-list">
                <li>
                    <div>
                        <p>Subtotal</p>
                    </div>
                    <p>${subTotal}</p>
                </li>
                <li>
                    <div>
                        <p>Shipping Fee</p>
                        { shipping < 150 && <span>Add ${shippingCounter} for free shipping</span> }
                    </div>
                    <p>${shipping}</p>
                </li>
            </ul>
            <div className="d-flex align-items-center justify-content-between total">
                <label>Total</label>
                <span>${finalTotal}</span>
            </div>
            <div className="d-flex flex-column justify-content-between actions-container">
                {page === "cart" ? (
                    cart.countData?.length > 0 ? (
                        <Link to="checkout" className="btn proceed-btn">
                            Proceed to Shipping Information
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            onClick={(event) => event.preventDefault()}
                            className="btn proceed-btn disabled"
                        >
                            Proceed to Shipping Information
                        </Link>
                    )
                    ) : (
                    <>
                        <Link
                            to={page === "checkout" ? "cart" : "checkout"}
                            className="btn back-btn mb-3"
                        >
                            {"<"}
                            <span>Back</span>
                        </Link>
                        <button
                            className={
                                "proceed-btn place-order " +
                                (!selectedShipping ? "disabled" : "")
                            }
                            onClick={handleCheckout}
                            disabled={!selectedShipping || !selectedBilling}
                        >
                            Proceed to Payment
                        </button>
                    </>
                )}
            </div>
        </div>
    </>
  
};
