import React from "react";
import Routes from "./Routes";

import "./App.scss";
import "./assets/scss/theme.scss";
import "antd/dist/antd.css";
import { ProductProvider } from "./context";

const App = (pageProps) => {
  return (
    <ProductProvider>
      <div className="App">
        <Routes childProps={pageProps} />
      </div>
    </ProductProvider>
  );
};

export default App;
