import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignUpContainer } from "./pages/SignupPage";
import { CartContainer } from "./pages/Cart";
import { CheckoutContainer } from "./pages/Checkout";
import { PaymentContainer } from "./pages/Payment";
import { PaymentConfirmationContainer } from "./pages/PaymentConfirmation";
import { ErrorPageContainer } from "./pages/error/404page";
import { PersonalInformationContainer } from "./pages/account/PersonalInformationPage";
import { LoginContainer } from "./pages/LoginPage";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Details from "./pages/ProductDetails";
import Cart from "./components/pages/cart/Cart";
import Modal from "./pages/Modal";
export default ({ childProps }) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/login" component={LoginContainer} />
      <Route path="/account" component={PersonalInformationContainer} />
      <Route path="/register" component={SignUpContainer} />
      {/* <Route path="/cart" component={CartContainer} /> */}
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/payment" component={PaymentContainer} />
      <Route path="/search" component={Search} />
      <Route path="/shop" component={Shop} />
      <Route path="/product" component={Product} />
      <Route path="/details" component={Details}></Route>
      <Route path="/cart" component={Cart}></Route>
      <Route
        path="/payment-confirmation"
        component={PaymentConfirmationContainer}
      />
      <Route component={ErrorPageContainer} />
    </Switch>
    <Modal />
  </BrowserRouter>
);
