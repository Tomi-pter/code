import React from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, Burger } from '@ant-design/icons';
import Logo from '../../assets/img/logo.svg';
import BurgerIcon from '../../assets/img/Mobile/burger-icon.svg';
import CartMobile from '../../assets/img/Mobile/cart-mobile.svg';
import PPLogo from '../../assets/img/pp-logo.svg'
export const HeaderNav = () => {
    return (
        <nav className="navbar headerNav__wrapper sticky-top">
            <div className="row col-12 align-items-center">
                <div className="col-md-3 d-flex flex-row align-items-center flex-wrap">
                    <div className="logo-container flex-fill">
                        <a href="https://premierpharma.wpengine.com/"  className='nav-link'>
                            <img className="logo" src={PPLogo}  alt="" />
                        </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="cartWrapper d-block d-sm-none d-lg-none d-xl-none mr-3">
                            <a href="/cart">
                                <img src={CartMobile} />
                            </a>
                        </div>
                        <div class="btn-group d-block d-sm-none">
                            <button type="button" class="navbar-toggler" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                <img src={BurgerIcon} />
                            </button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                <button class="dropdown-item" type="button">Action</button>
                                <button class="dropdown-item" type="button">Another action</button>
                                <button class="dropdown-item" type="button">Something else here</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 d-flex justify-content-end align-items-center">
                    <div className="cartWrapper d-none d-sm-block d-lg-none d-xl-none mr-3">
                        <Link to="/cart">
                            <img src={CartMobile} />
                        </Link>
                    </div>
                    <div class="btn-group d-none d-sm-block d-lg-none d-xl-none">
                        <button type="button" class="navbar-toggler" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                            <img src={BurgerIcon} />
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                            <button class="dropdown-item" type="button">Action</button>
                            <button class="dropdown-item" type="button">Another action</button>
                            <button class="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                    <div className="d-none d-lg-block d-xl-block mr-5">
                        <ul className="navbar-nav d-flex flex-row justify-content-end">
                            <li className="nav-item active">
                                <a className="nav-link" href="http://premierpharma.wpengine.com/about-us/">About Us </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Products
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">For Pharmacies</a>
                                    <a className="dropdown-item" href="#">For Animal Care</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://premierpharma.wpengine.com/contact-us/">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-lg-block d-xl-block">
                        <div className="d-flex align-items-center ">
                            <form className="form-inline ml-5 mr-4">
                                <div class="input-group searchWrapper">
                                    <input class="form-control border-right-0 border-top-0 border-left-0" placeholder="Search Medicine ..." />
                                    <span class="input-group-append">
                                        <button class="btn border-left-0 border-right-0 border-top-0" type="button"><SearchOutlined /></button>
                                    </span>
                                </div>
                            </form>
                            <div>
                                <a className='cart-icon__wrapper' href='/cart'>
                                    <img className="cart-icon" src={require('../../assets/img/cart.svg')} width="203" height="62" alt="" />
                                    <span className="cart-bubble">3</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-lg-block d-xl-block">
                        <Link className="login-button" to="login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
