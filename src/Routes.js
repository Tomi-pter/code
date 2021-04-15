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
import TestShop from "./pages/TestShop";
import Product from "./pages/Product";
import Details from "./pages/ProductDetails";
import Cart from "./components/pages/cart/Cart";
import Modal from "./pages/Modal";

import { ProtectedRoutes } from './components/protectedRoutes';

export default ({ childProps }) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path='/' component={() => { 
          window.location.href = 'https://premierpharma.wpengine.com/'; 
          return null;
      }}/>
      <Route path="/login" component={LoginContainer} />
      <Route path="/register" component={SignUpContainer} />
      <Route path="/search" component={Search} />
      <Route path="/shop" component={Shop} />
      <Route path="/test-shop" component={TestShop} />
      <Route path="/product" component={Product} />
      <Route path="/details" component={Details} />
      <ProtectedRoutes path="/account" component={PersonalInformationContainer} />
      <ProtectedRoutes path="/checkout" component={CheckoutContainer} />
      <ProtectedRoutes path="/payment" component={PaymentContainer} />
      {/* <Route path="/cart" component={CartContainer} /> */}
      <ProtectedRoutes path="/cart" component={Cart} />
      <ProtectedRoutes path="/payment-confirmation" component={PaymentConfirmationContainer} />
      <Route component={ErrorPageContainer} />
    </Switch>
    <Modal />
  </BrowserRouter>
);