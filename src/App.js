import React from "react";
import Routes from "./Routes";

import "./App.scss";
import "./assets/scss/theme.scss";
// import "antd/dist/antd.css";

// import {loadStripe} from '@stripe/stripe-js';
// import {
//   Elements
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51IjIXMAyXr1hCVDC49YkubTfUCGyWKOHX7YHbcZrnZknJ9FB4VU0Y0WTjo7OuhFbCpPGI9AX7HQ3TsQ7waWCePM200ykfSQDz4');

const App = (pageProps) => {
  return (
    // <Elements stripe={stripePromise}>
      <div className="App">
        <Routes childProps={pageProps} />
      </div>
    // </Elements>
  );
};

export default App;
