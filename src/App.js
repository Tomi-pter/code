import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

import './App.scss';
import './assets/scss/theme.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={SignUp} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
      </BrowserRouter>
    </div>
  );
}

export default App;
