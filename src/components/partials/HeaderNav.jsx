import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ShippingCounter } from '../../components/shared/shippingCounter';
import Logo from '../../assets/img/logo.svg';
import Cart from '../../assets/icon/cart-green.svg';
import Account from '../../assets/icon/account.svg';
import BurgerMenu from '../../assets/icon/burger-menu.svg';
import decode from 'jwt-decode';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCart } from '../../actions/cart';

import { getProducts } from '../../actions/products'
export const HeaderNav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const cart = useSelector((state) => state.cart);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [avatarPro, setAvatar] = useState({});
    const itemCount = cart.cartData?.length > 0 ? cart.cartData.map(item => parseInt(item.quantity)).reduce((prev, next) => prev + next) : 0;
    const avatar = useSelector((state) => state.account.avatarData);
    const errorAvatar = useSelector((state) => state.account.errorAvatar);
    const handleSubmit = (e) => {
        e.preventDefault()
        // history.push(`/search?name=${formData.name}`);
        window.location.href = '/search?name='+formData.name;
    }

    const handleChange = (e) => setFormData({ [e.target.name]: e.target.value });

    const sendWPData = () => {
        var cartIFrame = document.getElementById('hidden-iframe');
        cartIFrame.contentWindow.postMessage(user, 'https://premierpharma.wpengine.com');
    }
    const encodeData = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    useEffect(() => {
        const token = user?.accessToken;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) setUser(null);
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(getCart(user?.username));
        setAvatar(avatar);
        console.log('avatar', avatar);
    }, [avatar, errorAvatar, location]);

    return (
        <nav className="sticky-top">
            <ShippingCounter cart={cart} path={location.pathname} />
            <div className="navbar d-flex align-items-center header main">
                <iframe id="hidden-iframe" src="https://premierpharma.wpengine.com" height="200" width="300" title="Iframe Example" onLoad={sendWPData} ></iframe>
                <a href="https://premierpharma.wpengine.com/">
                    <img className="logo" src={Logo} width="152.25" height="46.49" alt="" />
                </a>
                <div className="d-flex align-items-center justify-content-end right-col">
                    <Link className="desktop-link" to="">About Us</Link>
                    <div className="desktop-link dropdown">
                        <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Products
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" href="#!" to="/shop?category=Pharmaceuticals">For Pharmacies</Link>
                            <Link className="dropdown-item" href="#!" to="/shop?category=Animal Health AND Medical Supplies">For Animal Care</Link>
                            <Link className="dropdown-item" href="#!" to="/shop?category=Medical Supplies">For Medical/Surgical Products</Link>
                        </div>
                    </div>
                    <Link className="desktop-link" to="">Contact Us</Link>
                    <div className="search-container">
                        <form onSubmit={handleSubmit}>
                            <input name="name"  value={formData.name} placeholder="Search Medicine..." onChange={handleChange} />
                        </form>
                    </div>
                    {user ?
                        <>
                            <Link to="/cart" className="cart-btn">
                                <img src={Cart} alt="" width="27.5" height="27.5" />
                                <div className="count">{itemCount}</div>
                            </Link>
                            <Link to="/account" className="account-btn">
                                <div className="profileWrapper">
                                    {avatar?.Body?.data.length > 0 ? (
                                        <img className="profilePic" src={`data:image/jpeg;base64,${encodeData(avatar?.Body?.data)}`} />
                                    ) : (
                                            avatar?.Body?.data.length > 0 ?
                                                <img className="profilePic" src={`data:image/jpeg;base64,${encodeData(avatar?.Body?.data)}`} />
                                                : <img className="profilePic" src={Account} alt="" />
                                        )}

                                </div>
                            </Link>
                        </>
                        :
                        <Link to="/login" className="login-btn">
                            Login
                    </Link>
                    }
                    <div className="dropdown burger-btn">
                        <a className="dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={BurgerMenu} alt="" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" href="#!" to="">About Us</Link>
                            <ul>Products
                            <li><Link className="dropdown-item" href="#!" to="/shop?category=Pharmacy">For Pharmacies</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Animal Care">For Animal Care</Link></li>
                                <li><Link className="dropdown-item" href="#!" to="/shop?category=Medical">For Medical/Surgical Products</Link></li>
                            </ul>
                            <Link className="dropdown-item" href="#!" to="">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
