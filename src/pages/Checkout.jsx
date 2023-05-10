import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { HeaderNav } from "../components/partials/HeaderNav";
import { Footer } from "../components/partials/Footer";
import { ItemList } from "../components/cart/itemList";
import { OrderSummary } from "../components/cart/orderSummary";
import { CheckoutInfo } from "../components/cart/info";
import { Helmet } from "react-helmet";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Arrow from "../assets/img/Cart/Arrow.svg"
import DoneArrow from "../assets/img/Cart/DoneArrow.svg"
import Done from "../assets/img/Cart/Done.svg"

import CartStep2 from "../assets/img/Cart/CartStep2.svg"
import CartStep3Next from "../assets/img/Cart/CartStep3Next.svg"
import CartStep4Next from "../assets/img/Cart/CartStep4Next.svg"

export const CheckoutContainer = () => {
  const cart = useSelector((state) => state.cart);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const history = useHistory();

  // useEffect(()=>{
  // const user = JSON.parse(localStorage.getItem('profile'));
  // dispatch(getCart(user?.username));
  // dispatch(getCount(user?.username));
  // },[]);

  useEffect(() => {
    if (cart?.cartData?.length < 1) history.push("/cart");
  }, [cart]);

    return (
        <>
            <Helmet>
                <title>Checkout | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="cart-header container-fluid d-flex align-items-center justify-content-between">
                <span>Shipping Info</span>
                <Link to="/cart" className='back-btn'>
                    {"<"}
                    &nbsp;&nbsp;Back to cart
                </Link>
            </div>
            <div className="container-fluid cart-page">
                <div className="main-content-container d-flex align-items-start justify-content-between">
                    <div className="cart-items-container d-flex flex-column align-items-start w-100 mb-4">
                        <div className="cart-progress d-flex align-items-center justify-content-between">
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={Done}/>
                                <span>Cart</span>
                            </div>
                            <div>
                                <img height={14} src={DoneArrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep2}/>
                                <span>Shipping Information</span>
                            </div>
                            <div>
                                <img height={14} src={Arrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep3Next}/>
                                <span>Make Payment</span>
                            </div>
                            <div>
                                <img height={14} src={Arrow}/>
                            </div>
                            <div className="step d-flex align-items-center justify-content-center">
                                <img height={20} width={20} src={CartStep4Next}/>
                                <span>Complete</span>
                            </div>
                        </div>
                        <CheckoutInfo
                            cart={cart}
                            selectedShipping={selectedShipping}
                            setSelectedShipping={setSelectedShipping}
                            selectedBilling={selectedBilling}
                            setSelectedBilling={setSelectedBilling}
                        />
                        <div className="cart-items w-100">
                            <ItemList cart={cart} page={"checkout"}/>
                        </div>
                    </div>
                    <div className="right-container">
                        <OrderSummary
                            page={"checkout"}
                            selectedShipping={selectedShipping}
                            selectedBilling={selectedBilling}
                            cart={cart}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
