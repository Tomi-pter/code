import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Payment } from "./pages/Payment";
import { PaymentConfirmation } from "./pages/PaymentConfirmation";
import { ErrorPage } from "./pages/error/404page";
import "./App.scss";
import "./assets/scss/theme.scss";
import "antd/dist/antd.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payment" component={Payment} />
          <Route
            exact
            path="/payment-confirmation"
            component={PaymentConfirmation}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
