import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ShippingCounter } from "../../components/shared/shippingCounter";
import Logo from "../../assets/img/logo.svg";
import Cart from "../../assets/icon/cart-blue.svg";
import BurgerMenu from "../../assets/icon/burger-menu.svg";
import SearchClear from "../../assets/icon/search-clear.svg";
import mobileSearch from "../../assets/icon/search-green-ico.svg";
import mobileSearchClose from "../../assets/icon/search-close.svg";
import decode from "jwt-decode";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCart, getCount } from "../../actions/cart";
import {
  getProductsv2,
  getFavProductsv2,
  getPreferred,
  getShortDated,
} from "../../actions/products";

import ProfilePic from "../../assets/img/Account/placeholder-dp.svg";
import { getAvatar } from "../../actions/account";
import { getSearch } from "../../actions/products";
import { getCustomProducts } from "../../actions/admin";
import PPLogo from "../../assets/img/pp-logo.svg";

import fuzzysort from "fuzzysort";

export const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const [user, setUser] = useState(null);
  const cart = useSelector((state) => state.cart);
  const search = useSelector((state) => state.search);
  const admin = useSelector((state) => state.admin);
  const avatar = useSelector((state) => state.account.avatarData);
  const productsData = useSelector((state) => state.products);
  const [formData, setFormData] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setsearchResults] = useState(null);
  const [searchActive, setSearchActive] = useState();
  const searchInput = useRef(null);
  const itemCount =
    cart.cartData?.length > 0
      ? cart.cartData
          .map((item) => parseInt(item.quantity))
          .reduce((prev, next) => prev + next)
      : 0;
  const dispatch = useDispatch();
  const history = useHistory();

  const searchRedirect = (id) => {
    history.push(`/product/${id}`);
  };

  const resetInputField = () => {
    searchInput.current.value = "";
    setTimeout(() => {
      var element = document.getElementById("resultBoxMobile");
      element.classList.remove("d-block");
      element.classList.add("d-none");
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${formData.name}`);
  };

  const handleChange = (e) => {
    setSearchLoading(true);
    var element = document.getElementById("resultBox");
    if (element) element.style.display = "block";
    setFormData({ [e.target.name]: e.target.value });
    setSearchName(e.target.value);
  };

  const handleChangeMobile = (e) => {
    setSearchLoading(true);
    var element = document.getElementById("resultBoxMobile");
    if (element) element.style.display = "block";
    setFormData({ [e.target.name]: e.target.value });
    setSearchName(e.target.value);
  };

  const handleMouseEnter = () => {
    var element = document.getElementById("resultBox");
    var mobileElement = document.getElementById("resultBoxMobile");
    if (element) {
      element.style.display = "block";
    }
    if (mobileElement) {
      mobileElement.style.display = "block";
    }
  };

  const handleMouseLeave = (e) => {
    var element = document.getElementById("resultBox");
    var mobileElement = document.getElementById("resultBoxMobile");
    if (element) {
      element.style.display = "none";
    }
    if (mobileElement) {
      mobileElement.style.display = "none";
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("profile"));
    const token = localUser?.accessToken;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) setUser(null);
    }
    if (localUser) {
      setUser(localUser);
      dispatch(getCart(localUser?.username));
      dispatch(getCount(localUser?.username));
      dispatch(getAvatar(localUser?.username));
      sendWebflowData();
    }
    setFormData({ ...formData, name: "" });

    if (
      ["shop", "search", "product"].includes(location.pathname.split("/")[1]) &&
      !admin?.customProducts
    ) {

        if (localUser) {
            dispatch(getCustomProducts(localUser?.username));
        }
    }
  }, [location]);

  useEffect(() => {
    setsearchResults(search);
    setSearchLoading(false);
  }, [search]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let searchResult, changeTimer;

    if (searchName !== "") {
      changeTimer = setTimeout(() => {
        searchResult = fuzzysort.go(searchName, productsData.productsv2, {
          keys: ["name", "ndc"],
        });

        setsearchResults(searchResult);
        setSearchLoading(false);
      }, 1000);
    }

    return () => {
      clearTimeout(changeTimer);
    };
  }, [searchName]);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("profile"));
        
        if (
            ["shop", "search", "product"].includes(location.pathname.split("/")[1])
            && !productsData.count
        ) {
            dispatch(getProductsv2());
            if (auth) {
                dispatch(getFavProductsv2(auth?.username));
                dispatch(getPreferred(auth?.username));
            }
            dispatch(getShortDated());
        }
    }, []);

    const sendWebflowData = () => {
        const cartIFrame = document.getElementById("hidden-iframe");

        if (location.pathname === "/login" || location.pathname === "/register") {
            const cartIFrame = document.getElementById("hidden-iframe");

            cartIFrame.contentWindow.postMessage(
                null,
                process.env.REACT_APP_HOMEPAGE_URL
            );
        }
        else {
            const avatarData = avatar !== "" && !Array.isArray(avatar)
                ? avatar
                : `https://stage.premierpharma.com/wp-content/uploads/2021/05/placeholder-dp.svg`;

            const sendData = { ...user, avatarData, cartCount: itemCount };

            cartIFrame.contentWindow.postMessage(
                sendData,
                process.env.REACT_APP_HOMEPAGE_URL
            );
        }
    };

  return (
    <nav
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? "navbar header-login header"
          : "fixed-top"
      }
    >
      <iframe
        id="hidden-iframe"
        src={process.env.REACT_APP_HOMEPAGE_URL}
        height="200"
        width="300"
        title="Iframe Example"
        onLoad={sendWebflowData}
      />
      {location.pathname === "/login" || location.pathname === "/register" ? (
        <a href={process.env.REACT_APP_HOMEPAGE_URL}>
          <img
            className="logo"
            src={PPLogo}
            width="152.25"
            height="46.49"
            alt=""
          />
        </a>
      ) : (
        <>
          <ShippingCounter cart={cart} path={location.pathname} />
          <div className={`navbar d-flex align-items-center header main ${scrolled ? " scrolled" : ""}`}>
            <a href={process.env.REACT_APP_HOMEPAGE_URL}>
              <img
                className="logo"
                src={Logo}
                width="182"
                height="26.15"
                alt=""
              />
            </a>
            <div className="d-flex align-items-center justify-content-end right-col">
              <a
                className="desktop-link"
                href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}
              >
                About
              </a>
              <div className="desktop-link dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Products
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {user && (
                    <Link
                      className="dropdown-item"
                      to="/shop?category=Favorites"
                    >
                      My Favorites
                    </Link>
                  )}
                  {/* <Link
                    className="dropdown-item"
                    to="/shop?category=Weekly Specials"
                  >
                    Weekly Specials
                  </Link> */}
                  <Link className="dropdown-item" to="/shop?category=Specials">
                    Short Dated
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/shop?category=Pharmaceuticals"
                  >
                    Pharmaceuticals
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/shop?category=Animal Health"
                  >
                    Animal Health
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/shop?category=Medical Supplies"
                  >
                    Medical/Surgical
                  </Link>
                </div>
              </div>
              <a
                className="desktop-link"
                href={`${process.env.REACT_APP_HOMEPAGE_URL}/contact-us`}
              >
                Contact
              </a>
              <a
                className="desktop-link"
                href={`${process.env.REACT_APP_HOMEPAGE_URL}/consulting`}
              >
                Consulting
              </a>
              <a
                className="desktop-link"
                href={`${process.env.REACT_APP_HOMEPAGE_URL}/faq`}
              >
                FAQ
              </a>
              <div
                className="search-container"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    value={formData.name || ""}
                    placeholder="Search Products..."
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </form>
                {formData.name && formData.name !== "" && (
                  <ul id="resultBox" className="results">
                    {searchLoading && (
                      <li>
                        <p>Searching products...</p>
                      </li>
                      //   <li>
                      //     <div className="spinner-container d-flex align-items-center justify-content-center">
                      //       <div
                      //         className="spinner-border text-primary"
                      //         role="status"
                      //       >
                      //         <span className="sr-only">Loading...</span>
                      //       </div>
                      //     </div>
                      //   </li>
                    )}
                    {!searchLoading &&
                      searchResults.length > 0 &&
                      searchResults.map((searchResult) => (
                        <li
                          key={searchResult.obj.id}
                          onClick={() => searchRedirect(searchResult.obj.id)}
                        >
                          <p>{searchResult.obj.name}</p>
                        </li>
                      ))}
                    {!searchLoading && searchResults.length === 0 && (
                      <li>
                        <p>Product Not Found</p>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="divider d-none d-md-block"></div>

              {user ? (
                <>
                  <Link to="/cart" className="cart-btn">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <img src={Cart} alt="" width="27.5" height="27.5" />
                                <p className="m-0 ml-3 d-none d-md-none">My Cart</p>
                                <div className="count ml-3">{itemCount}</div>
                            </div>
                        </div>
                   </Link>
                  <div className="mobile-search-div">
                    {searchActive ? (
                      <img
                        src={mobileSearchClose}
                        onClick={() => setSearchActive(false)}
                      />
                    ) : (
                      <img
                        src={mobileSearch}
                        onClick={() => setSearchActive(true)}
                      />
                    )}
                  </div>
                  <Link to="/account" className="account-btn d-none d-md-block">
                    <div className="profileWrapper d-flex flex-row align-items-center justify-items-center">
                      {avatar !== "" && !Array.isArray(avatar) ? (
                        <img className="profilePic" src={avatar} />
                      ) : (
                        <img className="profilePic" src={ProfilePic} alt="" />
                      )}
                      <p className="m-0 ml-3">My Account</p>
                    </div>
                  </Link>
                  <Link to="/account" className="account-btn-icon-only d-block d-md-none">
                    <div className="profileWrapper d-flex flex-row align-items-center justify-items-center">
                      {avatar !== "" && !Array.isArray(avatar) ? (
                        <img className="profilePic" src={avatar} />
                      ) : (
                        <img className="profilePic" src={ProfilePic} alt="" />
                      )}
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div className="mobile-search-div">
                    {searchActive ? (
                      <img
                        src={mobileSearchClose}
                        onClick={() => setSearchActive(false)}
                      />
                    ) : (
                      <img
                        src={mobileSearch}
                        onClick={() => setSearchActive(true)}
                      />
                    )}
                  </div>
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                </>
              )}

              <div className="dropdown burger-btn">
                <a
                  className="dropdown-toggle"
                  href="#!"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={BurgerMenu} alt="" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link
                    className="dropdown-item"
                    href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}
                    to=""
                  >
                    About Us
                  </Link>
                  <hr />
                  <ul>
                    <p>Products</p>
                    {user && (
                      <li>
                        <Link
                          className="dropdown-item"
                          href="#!"
                          to="/shop?category=Favorites"
                        >
                          My Favorites
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        className="dropdown-item"
                        href="#!"
                        to="/shop?category=Pharmaceuticals"
                      >
                        Pharmaceuticals
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="#!"
                        to="/shop?category=Animal Health"
                      >
                        Animal Health
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="#!"
                        to="/shop?category=Medical Supplies"
                      >
                        Medical/Surgical
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <Link
                    className="dropdown-item"
                    href={`${process.env.REACT_APP_HOMEPAGE_URL}/contact-us`}
                    to=""
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            {searchActive && (
              <div
                className="w-100 align-items-center text-center mobile-search position-relative"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <form onSubmit={handleSubmit}>
                  <img
                    src={SearchClear}
                    className="clear-search"
                    onClick={resetInputField}
                  />
                  <input
                    name="name"
                    value={formData.name || ""}
                    placeholder="Search Products..."
                    ref={searchInput}
                    autoComplete="off"
                    onChange={handleChangeMobile}
                  />
                </form>
                {formData.name && formData.name !== "" && (
                  <ul id="resultBoxMobile" className="results">
                    {searchLoading && (
                      <li>
                        <p>Searching products...</p>
                      </li>
                    )}
                    {!searchLoading &&
                      searchResults.length > 0 &&
                      searchResults.map((product) => (
                        <li
                          key={product.obj.id}
                          onClick={() => searchRedirect(product.obj.id)}
                        >
                          <p>{product.obj.name}</p>
                        </li>
                      ))}
                    {!searchLoading && searchResults.length === 0 && (
                      <li>
                        <p>Product Not Found</p>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
};
