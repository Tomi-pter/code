import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { discount, getCart } from '../../actions/cart';

export const DiscountForm = ({  discountCode, setDiscountCode, setDiscountDetail, discountAmount }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(discount(discountCode));
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCart(user?.username));
    },[dispatch]);

    useEffect(()=>{
        setDiscountDetail(cart?.discountDetail);  
        if(cart?.discountDetail?.id) setDiscountCode(cart?.discountDetail?.id);
    },[cart]);

    console.log(cart?.discountDetail);

    return (
        <div className="discount-container">
            <label>Discount Code</label>
            <div className="input-container">
                <input type="password" placeholder="Code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}  />
                <button onClick={handleSubmit}>Apply</button>
                <div className="icon-container">
                    {cart?.discountDetail && 
                        <>
                            { cart?.discountDetail?.valid ? 
                                <img src={require("../../assets/icon/check-green.svg")} alt="" /> 
                                :
                                <img src={require("../../assets/icon/x-red.svg")} alt="" />
                            } 
                        </>
                    }
                </div>
            </div>
            {cart?.discountDetail && 
                <>
                    { cart?.discountDetail?.valid ? 
                        <>
                            <span className="msg success">Code Accepted!</span>
                            <div className="d-flex align-items-center justify-content-between discount-value">
                                <span>Discount ({cart?.discountDetail?.percent_off}%)</span>
                                <span>-${discountAmount}</span>
                            </div>
                        </>
                        :
                        <span className="msg error">The code entered is invalid</span>
                    }
                </>
            }
        </div>
    )
}