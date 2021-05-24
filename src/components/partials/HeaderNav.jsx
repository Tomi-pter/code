import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShippingCounter } from '../../components/shared/shippingCounter';
import Logo from '../../assets/img/logo.svg';
import Cart from '../../assets/icon/cart-green.svg';
import BurgerMenu from '../../assets/icon/burger-menu.svg';
import SearchClear from '../../assets/icon/search-clear.svg';
import mobileSearch from '../../assets/icon/search-green-ico.svg';
import mobileSearchClose from '../../assets/icon/search-close.svg';
import decode from 'jwt-decode';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCart } from '../../actions/cart';

import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import { getAvatar } from '../../actions/account';

export const HeaderNav = () => {
    const [user, setUser] = useState({});
    const cart = useSelector((state) => state.cart);
    const avatar = useSelector((state) => state.account.avatarData);
    const [formData, setFormData] = useState({});
    const [searchActive, setSearchActive] = useState(false);
    const searchInput = useRef(null);
    const itemCount = cart.cartData?.length > 0 ? cart.cartData.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
    const location = useLocation();
    const dispatch = useDispatch();

    const resetInputField = () => {
        searchInput.current.value = "";
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = '/search?name=' + formData.name;
    }

    const handleChange = (e) => setFormData({ [e.target.name]: e.target.value });

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('profile'));
        const token = localUser?.accessToken;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) setUser(null);
        }
        setUser(localUser);
        dispatch(getCart(localUser?.username));
        dispatch(getAvatar(localUser?.username));
    }, [location]);

    const sendWPData = () => {
        const cartIFrame = document.getElementById('hidden-iframe');
        const sendData = { ...user, avatarData: avatar };
        cartIFrame.contentWindow.postMessage(sendData, 'https://premierpharma.wpengine.com');
    }

    return (
        <nav className="sticky-top">
            <ShippingCounter cart={cart} path={location.pathname} />
            <div className="navbar d-flex align-items-center header main">
                <iframe id="hidden-iframe" src="https://premierpharma.wpengine.com" height="200" width="300" title="Iframe Example" onLoad={sendWPData} ></iframe>
                <a href="https://premierpharma.wpengine.com/">
                    <img className="logo" src={Logo} width="152.25" height="46.49" alt="" />
                </a>
                <div className="d-flex align-items-center justify-content-end right-col">
                    <a className="desktop-link" href="https://premierpharma.wpengine.com/about-us/">About Us</a>
                    <div className="desktop-link dropdown">
                        <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Products
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" href="#!" to="/shop?category=Pharmaceuticals">For Pharmacies</Link>
                            <Link className="dropdown-item" href="#!" to="/shop?category=Animal Health">For Animal Care</Link>
                            <Link className="dropdown-item" href="#!" to="/shop?category=Medical Supplies">For Medical/Surgical Products</Link>
                        </div>
                    </div>
                    <a className="desktop-link" href="https://premierpharma.wpengine.com/contact-us/">Contact Us</a>
                    <div className="search-container">
                        <form onSubmit={handleSubmit}>
                            <input name="name" value={formData.name || ""} placeholder="Search Medicine..." onChange={handleChange} />
                        </form>
                    </div>

                    {user ?
                        <>
                            <Link to="/cart" className="cart-btn">
                                <img src={Cart} alt="" width="27.5" height="27.5" />
                                <div className="count">{itemCount}</div>
                            </Link>
                            <div className="mobile-search-div">
                                {searchActive ?
                                    <img src={mobileSearchClose} onClick={() => setSearchActive(false)} />
                                    :
                                    <img src={mobileSearch} onClick={() => setSearchActive(true)} />

                                }
                            </div>
                            <Link to="/account" className="account-btn">
                                <div className="profileWrapper">
                                    {
                                        avatar ?
                                            <img className="profilePic" src={avatar} />
                                            :
                                            <img className="profilePic" src={ProfilePic} alt="" />
                                    }
                                </div>
                            </Link>
                        </>
                        :
                        <>
                            <div className="mobile-search-div">
                                <img src={mobileSearch} />
                            </div>
                            <Link to="/login" className="login-btn">
                                Login
                    </Link>
                        </>
                    }

                    <div className="dropdown burger-btn">
                        <a className="dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={BurgerMenu} alt="" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" href="https://premierpharma.wpengine.com/about-us/" to="">About Us</Link>
                            <ul>Products
                            <li><Link className="dropdown-item" href="#!" to="/shop?category=Pharmaceuticals">For Pharmacies</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Animal Health">For Animal Care</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Medical Supplies">For Medical/Surgical Products</Link></li>
                            </ul>
                            <Link className="dropdown-item" href="https://premierpharma.wpengine.com/contact-us/" to="">Contact Us</Link>
                        </div>
                    </div>
                </div>
                {searchActive ? (
                    <div className="w-100 align-items-center text-center mobile-search ">
                        <form onSubmit={handleSubmit} className="position-relative">
                            <img src={SearchClear} className="clear-search" onClick={resetInputField} />
                            <input
                                name="name"
                                value={formData.name || ""}
                                placeholder="Search Medicine..."
                                ref={searchInput}
                                onChange={handleChange} />
                        </form>
                    </div>
                ) : (
                    ''
                )}

            </div>

        </nav>
    );
};
