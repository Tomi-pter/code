import React from "react";
import Routes from "./Routes";

import "./App.scss";
import "./assets/scss/theme.scss";

const App = (pageProps) => {
  return (
    <div className="App">
      <Routes childProps={pageProps} />
    </div>
  );
};

export default App;
