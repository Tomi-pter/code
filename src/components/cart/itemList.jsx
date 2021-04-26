import React from 'react';

import { useDispatch } from 'react-redux';
import { removeCart } from '../../actions/cart';

export const ItemList = ({ cart }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    return (
        <div>
            { cart.cartData.length === 0 && <div>Your Cart is Empty</div> }
            {
                cart.cartData.map(cartItem => (
                    <div key={`key`+ cartItem.productId} className="card product-card position-relative">
                        <div className="row ">
                            <div className="position-absolute" style={{ right: "0" }}>
                                <a href="#!" onClick={()=>dispatch(removeCart(user?.email, parseInt(cartItem.productId)))}>
                                    <img className="delete-icon mr-4 mt-4" src={require("../../assets/img/delete_icon.svg")} />
                                </a>
                            </div>
                            <div className="col-lg-4 product-wrapper">
                                <img className="product-image" src={require("../../assets/img/product-placeholder.svg")} />
                            </div>
                            <div className="col-lg-6 offset-md-1 product-desc-wrapper">
                                <p className="product-name mb-0">
                                    {cartItem.productName}
                                </p>
                                <p className="variant-text mb-0">
                                    Brand: Welchol
                                </p>
                                <p className="price-text mb-0">
                                    {cartItem.price}
                                </p>
                                <p className="quantity-text">x{cartItem.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}