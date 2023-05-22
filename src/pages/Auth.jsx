import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAvatar } from "../actions/account";
import { getCart, getCount } from "../actions/cart";

export default function Auth () {
    const localUser = JSON.parse(localStorage.getItem("profile"));

    const [user, setUser] = useState(null);
    const avatar = useSelector((state) => state.account.avatarData);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();
    
    const itemCount = cart.cartData?.length > 0
        ? cart.cartData
            .map((item) => parseInt(item.quantity))
            .reduce((prev, next) => prev + next)
        : 0;

    useEffect(() => {
        if (localUser) {
            setUser(localUser);
            dispatch(getCart(localUser?.username));
            dispatch(getCount(localUser?.username));
            dispatch(getAvatar(localUser?.username));
        }
    }, [location])

    useEffect(() => {
        sendWebflowData();
    }, [user, cart, avatar])

    const sendWebflowData = () => {
        if (location.pathname === "/login" || location.pathname === "/register") {
            window.parent.postMessage(
                null,
                process.env.REACT_APP_HOMEPAGE_URL
            )
        }
        else {
            const avatarData = avatar !== "" && !Array.isArray(avatar)
                ? avatar
                : `https://stage.premierpharma.com/wp-content/uploads/2021/05/placeholder-dp.svg`;

            const sendData = { ...user, avatarData, cartCount: itemCount };
            window.parent.postMessage(
                sendData,
                process.env.REACT_APP_HOMEPAGE_URL
            )
        }
    }

    return <></>
}
