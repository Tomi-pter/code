import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { SignUpContainer } from "./pages/SignupPage";
import { CheckoutContainer } from "./pages/Checkout";
import { PaymentContainer } from "./pages/Payment";
import { PaymentConfirmationContainer } from "./pages/PaymentConfirmation";
import { ErrorPageContainer } from "./pages/error/404page";
import { PersonalInformationContainer } from "./pages/account/PersonalInformationPage";
import { LoginContainer } from "./pages/LoginPage";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import TestShop from "./pages/TestShop";
import Product from "./pages/ProductDetails";
import { CartContainer } from "./pages/Cart";
// import AccountVerification from "./pages/AccountVerification";

import { ProtectedRoutes } from './components/protectedRoutes';

export default ({ childProps }) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path='/' component={() => { 
          window.location.href = process.env.REACT_APP_HOMEPAGE_URL;
          return null;
      }}/>
      <Route path="/login" component={LoginContainer} />
      <Route path="/register" component={SignUpContainer} />
      {/* <Route path="/account-verification" component={AccountVerification} /> */}
      <Route path="/search" component={Search} />
      <Route path="/shop" component={Shop} />
      <Route path="/test-shop" component={TestShop} />
      <Route exact path="/product">
        <Redirect to="/shop" />
      </Route>
      <Route path="/product/:id" component={Product} />
      <ProtectedRoutes path="/account" component={PersonalInformationContainer} />
      <ProtectedRoutes path="/checkout" component={CheckoutContainer} />
      <ProtectedRoutes path="/payment" component={PaymentContainer} />
      <ProtectedRoutes path="/cart" component={CartContainer} />
      <ProtectedRoutes path="/payment-confirmation" component={PaymentConfirmationContainer} />
      <Route component={ErrorPageContainer} />
    </Switch>
  </BrowserRouter>
);