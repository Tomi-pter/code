import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';

export const HeaderNav = () => {
    return (
        <nav className="navbar headerNav__wrapper">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <NavLink className='nav-link' to='/'>
                        <img className="logo" src={Logo} width="203" height="62" alt="" />
                    </NavLink>
                </div>
                <div className="col-md-8 d-flex justify-content-end align-items-center">
                    <div>
                        <ul className="navbar-nav d-flex flex-row justify-content-end">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">About Us </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Products
                            </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="d-flex align-items-center ">
                            <form className="form-inline ml-4 mr-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" type="button">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <NavLink className='cart-icon__wrapper' to='/'>
                                    <img className="cart-icon" src={require('../../assets/img/cart.svg')} width="203" height="62" alt="" />
                                    <span className="cart-bubble">3</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
