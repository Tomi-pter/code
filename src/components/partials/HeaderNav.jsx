import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import { getSearch } from '../../actions/products';

export const HeaderNav = () => {
    const [user, setUser] = useState({});
    const cart = useSelector((state) => state.cart);
    const search = useSelector((state) => state.search);
    const avatar = useSelector((state) => state.account.avatarData);
    const [formData, setFormData] = useState({});
    const [searchResults, setsearchResults] = useState(null);
    const [searchActive, setSearchActive] = useState();
    const searchInput = useRef(null);
    const itemCount = cart.cartData?.length > 0 ? cart.cartData.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const searchRedirect = (id) => {
        history.push(`/product/${id}`);
        // window.location.href = '/product/' + id;
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            var element = document.getElementById("resultBox");
            element.classList.remove('d-block');
            element.classList.add('d-none');
        }, 100);

    };

    const resetInputField = () => {
        searchInput.current.value = "";
        setTimeout(() => {
            var element = document.getElementById("resultBoxMobile");
            element.classList.remove('d-block');
            element.classList.add('d-none');
        }, 100);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        // window.location.href = '/search?name=' + formData.name;
        history.push(`/search?name=${formData.name}`);
    };

    const handleChange = (e) => {
        var element = document.getElementById("resultBox");
        element.classList.add('d-block');
        element.classList.remove('d-none');
      
        setFormData({ [e.target.name]: e.target.value })
        if (e.target.value !== "") {
            setsearchResults(null);
            dispatch(getSearch(e.target.value));
        }
    };

    
    const handleChangeMobile = (e) => {
        var element = document.getElementById("resultBoxMobile");
        element.classList.add('d-block');
        element.classList.remove('d-none');
        setFormData({ [e.target.name]: e.target.value })
        if (e.target.value !== "") {
            setsearchResults(null);
            dispatch(getSearch(e.target.value));
        }
    };



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

    useEffect(() => {
        setsearchResults(search);
    }, [search])

    const sendWPData = () => {
        const cartIFrame = document.getElementById('hidden-iframe');
        const avatarData = avatar !== "" && !Array.isArray(avatar) ? avatar : `${process.env.REACT_APP_HOMEPAGE_URL}/wp-content/uploads/2021/05/placeholder-dp.svg`;
        const sendData = { ...user, avatarData, cartCount: itemCount };
        cartIFrame.contentWindow.postMessage(sendData, process.env.REACT_APP_HOMEPAGE_URL);
    }

    return (
        <nav className="sticky-top">
            <ShippingCounter cart={cart} path={location.pathname} />
            <div className="navbar d-flex align-items-center header main">
                <iframe id="hidden-iframe" src={process.env.REACT_APP_HOMEPAGE_URL} height="200" width="300" title="Iframe Example" onLoad={sendWPData} ></iframe>
                <a href={process.env.REACT_APP_HOMEPAGE_URL}>
                    <img className="logo" src={Logo} width="152.25" height="46.49" alt="" />
                </a>
                <div className="d-flex align-items-center justify-content-end right-col">
                    <a className="desktop-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}>About Us</a>
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
                    <a className="desktop-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/contact-us`}>Contact Us</a>
                    <div className="search-container">
                        <form onSubmit={handleSubmit}>
                            <input name="name" value={formData.name || ""} placeholder="Search Medicine..." onChange={handleChange} autoComplete="off" />
                        </form>
                        <ul id="resultBox" className={'results ' + (formData.name ? 'd-block' : 'd-none')}>
                            {formData.name && searchResults?.products?.length > 0 ? searchResults?.products?.map(searchResult => (
                                <li key={searchResult.id} onClick={() => searchRedirect(searchResult.id)}>
                                    <p >{searchResult.name}
                                    </p>
                                </li>
                            )) : <li><p>Product Not Found</p></li>}
                        </ul>
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
                                        avatar !== "" && !Array.isArray(avatar) ?
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
                                {searchActive ?
                                    <img src={mobileSearchClose} onClick={() => setSearchActive(false)} />
                                    :
                                    <img src={mobileSearch} onClick={() => setSearchActive(true)} />
                                }
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
                            <Link className="dropdown-item" href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`} to="">About Us</Link>
                            <ul>Products
                            <li><Link className="dropdown-item" href="#!" to="/shop?category=Pharmaceuticals">For Pharmacies</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Animal Health">For Animal Care</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Medical Supplies">For Medical/Surgical Products</Link></li>
                            </ul>
                            <Link className="dropdown-item" href={`${process.env.REACT_APP_HOMEPAGE_URL}/contact-us`} to="">Contact Us</Link>
                        </div>
                    </div>
                </div>
                {searchActive ? (
                    <div className="w-100 align-items-center text-center mobile-search position-relative">
                        <form onSubmit={handleSubmit}>
                            <img src={SearchClear} className="clear-search" onClick={resetInputField} />
                            <input
                                name="name"
                                value={formData.name || ""}
                                placeholder="Search Medicine..."
                                ref={searchInput}
                                autoComplete="off"
                                onChange={handleChangeMobile} />
                        </form>
                        <ul id="resultBoxMobile" className={'results ' + (formData.name ? 'd-block' : 'd-none')}>
                                {formData.name ? search.products?.map(searchResult => (

                                    <li key={searchResult.id}>
                                        <p onClick={() => { searchRedirect(searchResult.id) }}>{searchResult.name}
                                        </p>
                                    </li>
                                )) : ''}
                            </ul>
                    </div>
                ) : (
                    ''
                )}

            </div>

        </nav>
    );
};
