import React from 'react';

import { useDispatch } from 'react-redux';
import { removeCart } from '../../actions/cart';

export const ItemList = ({ cart }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    return (
        <div>
            { cart.cartData.length === 0 && 
                <div className="d-flex align-items-center justify-content-center cart-empty">Your Cart is Empty</div> 
            }
            {
                cart.cartData.map(cartItem => (
                    <div key={`key`+ cartItem.productId} className="product d-flex align-items-start">
                        <div className="img-container">
                            <img className="product-image" src={require("../../assets/img/product-sample2.png")} alt="" />
                        </div>
                        <div className="info-container">
                            <div className="d-flex justify-content-end action-container">
                                <a className="delete-btn" href="#!" onClick={()=>dispatch(removeCart(user?.email, parseInt(cartItem.productId)))}>
                                    <img src={require("../../assets/img/delete_icon.svg")} alt="" />
                                </a>
                            </div>
                            <div className="details-container">
                                <p className="product-name">
                                    {cartItem.productName}
                                </p>
                                <p className="variant">
                                    Brand: Welchol
                                </p>
                                <p className="price">
                                    {cartItem.price}
                                </p>
                                <p className="quantity">x{cartItem.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}