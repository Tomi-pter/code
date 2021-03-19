import React, { useState } from "react";
import Routes from "./Routes"
import { LoginContainer } from "./pages/Login";
import "./App.scss";
import "./assets/scss/theme.scss";
import "antd/dist/antd.css";
import useToken from './components/pages/useToken';

const App = ( pageProps ) => {
  const { token, setToken } = useToken();
  if (!token) {
    return <LoginContainer setToken={setToken} />;
  }
  return (
    <div className="App">
      <Routes childProps={pageProps} />
    </div>
  );
};

export default App;
