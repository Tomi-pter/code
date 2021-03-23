import React from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, Burger } from '@ant-design/icons';
import Logo from '../../assets/img/logo.svg';

export const HeaderNav = () => {
    return (
        <nav className="navbar headerNav__wrapper">
            <div className="row align-items-center">
                <div className="col-md-3 d-flex align-items-center flex-wrap">
                    <Link className='nav-link' to='/'>
                        <img className="logo" src={Logo} width="203" height="62" alt="" />
                    </Link>
                    <div class="dropdown">
                        <button class="navbar-toggler" type="button" id="dropdownMenuButton" data-toggle="dropdown" data-target="#dropdownMenuButton" aria-expanded="false" >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 d-flex justify-content-end align-items-center">

                    <div className="collapse">
                        <ul className="navbar-nav d-flex flex-row justify-content-end">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">About Us </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Products
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Product 1</a>
                                    <a className="dropdown-item" href="#">Product 2</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Product 3</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse">
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
                                <Link className='cart-icon__wrapper' to='/'>
                                    <img className="cart-icon" src={require('../../assets/img/cart.svg')} width="203" height="62" alt="" />
                                    <span className="cart-bubble">3</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
