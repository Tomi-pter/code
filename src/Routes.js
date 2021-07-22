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
import ApprovalPage from "./components/signup/approval-page";
import { CartContainer } from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/admin";
import Company from "./pages/admin/company";

import { ProtectedRoutes } from "./components/protectedRoutes";
import { AdminProtectedRoutes } from "./components/adminProtectedRoutes";

export default ({ childProps }) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={LoginContainer} />
      <Route path="/register" component={SignUpContainer} />
      <Route path="/search" component={Search} />
      <Route path="/shop" component={Shop} />
      <Route path="/test-shop" component={TestShop} />
      <Route path="/approval-page" component={ApprovalPage} />
      <Route exact path="/product">
        <Redirect to="/shop" />
      </Route>
      <Route path="/product/:id" component={Product} />
      <Route path="/admin/login" component={AdminLogin} />
      <AdminProtectedRoutes exact path="/admin" component={AdminDashboard} />
      <AdminProtectedRoutes path="/admin/:id" component={Company} />
      <ProtectedRoutes
        path="/account"
        component={PersonalInformationContainer}
      />
      <ProtectedRoutes path="/checkout" component={CheckoutContainer} />
      <ProtectedRoutes path="/payment" component={PaymentContainer} />
      <ProtectedRoutes path="/cart" component={CartContainer} />
      <ProtectedRoutes
        path="/payment-confirmation"
        component={PaymentConfirmationContainer}
      />
      <Route component={ErrorPageContainer} />
    </Switch>
  </BrowserRouter>
);
