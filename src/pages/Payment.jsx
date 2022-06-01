import React, { useState, useEffect } from "react";
import { HeaderNav } from "../components/partials/HeaderNav";
import { Footer } from "../components/partials/Footer";
import { Cards } from "../components/account/cards";
import { Helmet } from "react-helmet";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";
import { paymentByTerms, paymentViaPaypal } from "../actions/payment";
import { getCart } from "../actions/cart";
import { getAccount, getNetsuiteAccount } from "../actions/account";
import { Link } from "react-router-dom";

export const PaymentContainer = () => {
  const cart = useSelector((state) => state.cart);
  const account = useSelector((state) => state.account);
  const payment = useSelector((state) => state.payment);
  const [selectedCard, setSelectedCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("terms");
  const [showError, setShowError] = useState(false);
  // const [enablePayByTerms, setEnablePayByTerms] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePayment = () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("profile"));
    const accountData = account?.accountData;
    const amount = parseFloat(cart?.checkoutDetail?.total);
    const billingAddress = cart?.checkoutDetail?.selectedBilling;
    const shippingAddress = cart?.checkoutDetail?.selectedShipping;
    const customerRefNumber = cart?.checkoutDetail?.customerRefNumber;
    const role = user.roles && user.AuthenticationResult ? "admin" : "user";
    const body = {
      code: cart?.discountDetail?.discount_data?.name,
      // paymentMethodId: selectedCard,
      cardNonce: selectedCard,
      amount,
      billingAddress,
      shippingAddress,
      accountData,
      customerRefNumber,
      role,
    };
    selectedMethod === "paypal"
      ? dispatch(paymentViaPaypal(user?.username, body, history))
      : dispatch(paymentByTerms(user?.username, body, history));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getAccount(user?.username));
  }, []);

  useEffect(() => {
    if (!cart?.checkoutDetail) history.push("/checkout");
  }, [cart]);

  useEffect(() => {
    if (payment.paymentError) {
      setShowError(true);
      setTimeout(function () {
        setShowError(false);
      }, 3000);
    }
    setIsLoading(false);
  }, [payment]);

  return (
    <>
      <Helmet>
        <title>Payment | Premier Pharmaceuticals</title>
      </Helmet>
      <HeaderNav />
      <div className="container-fluid payment-page">
        <h1 className="title">Payment</h1>
        <div className="main-content-container d-flex align-items-start">
          <div className="payments-container">
            <div className="payments">
              <h1 className="title">Payment Methods</h1>
              <ul className="nav nav-tabs">
                <li>
                  <a
                    data-toggle="tab"
                    href="#terms"
                    className="active"
                    onClick={() => setSelectedMethod("terms")}
                  >
                    Pay by Terms
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    href="#paypal"
                    className=""
                    onClick={() => setSelectedMethod("paypal")}
                  >
                    Pay via Paypal
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {/* id="terms" className="tab-pane fade active show" */}
                <div>
                  <div className="d-flex align-items-center justify-content-between terms-copy">
                    <div className="mr-5">
                      <h2>REMINDER</h2>
                      <ul>
                        <li>
                          If payment terms have already been established you
                          will receive an invoice via email once the order has
                          been processed.
                        </li>
                        <li>
                          If payment terms have not been established, you agree
                          that within 24 hours Premier Pharmaceuticals will
                          confirm your eligibility to use this payment option.
                          Your dedicated sales rep will contact you with
                          confirmation.
                        </li>
                        <li>
                          We are working on adding payments by credit card, but
                          currently cannot process them. In the meantime,
                          Premier Pharmaceuticals is happy to offer 30 day
                          payment terms for all orders.
                        </li>
                      </ul>
                    </div>
                    <img
                      src={require("../assets/icon/card-active.svg")}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end actions-container">
                <Link to="checkout" className="btn back-btn">
                  {"<"}
                  <span> Checkout</span>
                </Link>
                {/* disabled={enablePayByTerms ? false : true} */}
                <button
                  className="btn proceed-btn"
                  onClick={() => handlePayment()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="total-container">
            <h1 className="title">Total Amount</h1>
            <div className="d-flex align-items-end justify-content-center">
              <p className="amount">
                {cart?.checkoutDetail?.finalTotal} <span> USD</span>
              </p>
            </div>
          </div>
        </div>
        <div
          id="toast"
          className={"toast alert alert-danger " + (showError ? "show" : "")}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="2000"
          style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        >
          Something went wrong. Please try again in a few minutes
        </div>
      </div>
      <Footer />
    </>
  );
};
