import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateCart, removeCart } from '../../actions/cart';

import NoImage from '../../assets/img/unavailable.svg'

export const ItemList = ({ cart, page }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleQtyUpdate = (item, action) => {
        if (!selectedItem || item.productId !== selectedItem.productId) {
            setSelectedItem(item);
            action === 'add' ? setQuantity(item.quantity + 1) : item.quantity === 1 ? handleDelete(item) : setQuantity(item.quantity - 1)
        } else {
            action === 'add' ? setQuantity(quantity + 1) : quantity === 1 ? handleDelete(item) : setQuantity(quantity - 1)
        }
    }

    const handleQtyInput = (e, item) => {
        const value = parseInt(e.target.value)
        if (!selectedItem || item.productId !== selectedItem.productId) {
            setSelectedItem(item);
        }
        value < 1 ? handleDelete(item) : setQuantity(value)
    }

    const handleUpdate = () => {
        setIsLoading(true);
        const product = {
            productId: selectedItem.productId,
            quantity
        }
        dispatch(updateCart(user?.username, product));
    }

    const handleDelete = (item) => {
        setSelectedItem(item);
        setIsLoading(true);
        dispatch(removeCart(user?.username, parseInt(item.productId)));
    }

    useEffect(() => {
        setIsLoading(false);
        setSelectedItem(null);
        setQuantity(1);
    }, [cart]);

    return (
        <div>
            { (!cart.countData || cart.countData?.length <= 0) &&
                <div className="d-flex align-items-center justify-content-center cart-empty">Your Cart is Empty</div>
            }
            {
                cart.countData?.map(cartItem => (
                    <div key={`key` + cartItem.productId} className="product d-flex align-items-start">
                        {isLoading && selectedItem === cartItem &&
                            <div className="loader-container">
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        <div className="img-container">
                            <img className="product-image" src={cartItem.imageUrl ? cartItem.imageUrl : NoImage} alt="" />
                        </div>
                        <div className="info-container">
                            {
                                page === 'cart' &&
                                <div className="d-flex justify-content-end action-container">
                                    <a className="delete-btn" href="#!" onClick={() => handleDelete(cartItem)}>
                                        <img src={require("../../assets/img/delete_icon.svg")} alt="" />
                                    </a>
                                </div>
                            }
                            <div className="details-container">
                                <p className="product-name">
                                    {cartItem.productName}
                                </p>
                                {/* <p className="variant">
                                    Brand: Welchol
                                </p> */}
                                <p className="availability">
                                    {cartItem.qtyOnHand !== "" ? (
                                        ''
                                    ) : (
                                        "Ships in 2 - 5 business days"
                                    ) }

                                </p>
                                <p className="price">
                                    ${cartItem.price}
                                </p>
                                {
                                    page === 'cart' ?
                                        <div className="d-flex align-items-center qty-action-container">
                                            <div className="d-flex align-items-center qty-container">
                                                <button className="minus-btn" onClick={() => handleQtyUpdate(cartItem, 'minus')}>-</button>
                                                <input type="number" value={selectedItem?.productId === cartItem.productId ? quantity : cartItem.quantity} onChange={(e) => handleQtyInput(e, cartItem)} />
                                                <button className="plus-btn" onClick={() => handleQtyUpdate(cartItem, 'add')}>+</button>
                                            </div>
                                            {selectedItem?.productId === cartItem.productId && !isLoading && <button className="update-btn" onClick={handleUpdate}>Update</button>}
                                        </div>
                                        :
                                        <p className="quantity">x{cartItem.quantity}</p>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}