import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignUpContainer } from "./pages/Signup";
import { CartContainer } from "./pages/Cart";
import { CheckoutContainer } from "./pages/Checkout";
import { PaymentContainer } from "./pages/Payment";
import { PaymentConfirmationContainer } from "./pages/PaymentConfirmation";
import { ErrorPageContainer } from "./pages/error/404page";
import { PersonalInformationContainer } from "./pages/account/PersonalInformation";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
export default ({ childProps }) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/account" component={PersonalInformationContainer} />
      <Route path="/register" component={SignUpContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/payment" component={PaymentContainer} />
      <Route path="/search" component={Search} />
      <Route path="/shop" component={Shop} />
      <Route
        path="/payment-confirmation"
        component={PaymentConfirmationContainer}
      />
      <Route component={ErrorPageContainer} />
    </Switch>
  </BrowserRouter>
);
