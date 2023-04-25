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

export const CheckoutContainer = () => {
  const cart = useSelector((state) => {
    console.log(state)
    return state.cart
  });
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
