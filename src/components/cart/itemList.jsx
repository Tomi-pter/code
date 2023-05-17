import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCart, removeCart } from "../../actions/cart";

import NoImage from "../../assets/img/unavailable.svg";

export const ItemList = ({ page }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const cart = useSelector((state) => state.cart);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleQtyUpdate = (item, action) => {
    if (!selectedItem || item.productId !== selectedItem.productId) {
      setSelectedItem(item);
      action === "add"
        ? setQuantity(item.quantity + 1)
        : item.quantity === 1
        ? handleDelete(item)
        : setQuantity(item.quantity - 1);
    } else {
      action === "add"
        ? setQuantity(quantity + 1)
        : quantity === 1
        ? handleDelete(item)
        : setQuantity(quantity - 1);
    }
  };

  const handleQtyInput = (e, item) => {
    const value = parseInt(e.target.value);
    if (!selectedItem || item.productId !== selectedItem.productId) {
      setSelectedItem(item);
    }
    value < 1 ? handleDelete(item) : setQuantity(value);
  };

  const handleUpdate = () => {
    setIsLoading(true);
    const product = {
      productId: selectedItem.productId,
      quantity,
    };
    dispatch(updateCart(user?.username, product));
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsLoading(true);
    dispatch(removeCart(user?.username, parseInt(item.productId)));
  };

  useEffect(() => {
    setIsLoading(false);
    setSelectedItem(null);
    setQuantity(1);
  }, [cart]);

  return (
    <>
      {/* {cart.countData?.map((cartItem) => (
        <div
          key={`key` + cartItem.productId}
          className="product d-flex align-items-center"
        >
          {isLoading && selectedItem === cartItem && (
            <div className="loader-container">
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          <div className="img-container">
            <img
              className="product-image"
              src={cartItem.imageUrl ? cartItem.imageUrl : NoImage}
              alt=""
            />
          </div>
          <div className="info-container">
            {page === "cart" && (
              <div className="d-flex justify-content-end action-container">
                <div
                  className="delete-btn"
                  onClick={() => handleDelete(cartItem)}
                >
                  <img
                    src={require("../../assets/img/delete_icon.svg")}
                    alt=""
                  />
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-between details-container">
              <div>
                <p className="product-name">{cartItem.productName}</p>
                <p className="variant">NDC: {cartItem.ndc}</p>
                <p
                  className={
                    "availability " +
                    (cartItem?.totalquantityonhand &&
                    cartItem?.totalquantityonhand !== "" &&
                    cartItem?.totalquantityonhand !== "0.0"
                      ? ""
                      : "no-stock")
                  }
                >
                  {cartItem?.totalquantityonhand !== "" &&
                  cartItem?.totalquantityonhand !== "0.0"
                    ? ""
                    : "Item is out of stock."}
                </p>
                <p className="price">${cartItem.price.toFixed(2)}</p>
              </div>
              {page === "cart" ? (
                <div className="d-flex align-items-center qty-action-container">
                  <div className="d-flex align-items-center qty-container">
                    <button
                      className="minus-btn"
                      onClick={() => handleQtyUpdate(cartItem, "minus")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={
                        selectedItem?.productId === cartItem.productId
                          ? quantity
                          : cartItem.quantity
                      }
                      onChange={(e) => handleQtyInput(e, cartItem)}
                    />
                    <button
                      className="plus-btn"
                      onClick={() => handleQtyUpdate(cartItem, "add")}
                    >
                      +
                    </button>
                  </div>
                  {selectedItem?.productId === cartItem.productId &&
                    !isLoading && (
                      <button className="update-btn" onClick={handleUpdate}>
                        Update
                      </button>
                    )}
                </div>
              ) : (
                <p className="quantity">x{cartItem.quantity}</p>
              )}
            </div>
          </div>
        </div>
      ))} */}

        <table className="w-100">
            <thead>
                <tr className="table-header">
                    <th>
                        <div className="d-flex align-items-center justify-content-start">Item No / NDC</div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">
                            Description
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">Manufacturer</div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">
                            Size
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">
                            Price
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">
                            Qty
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-start">
                            Action
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.countData?.map(cartItem => {
                        return <tr key={cartItem.productId}>
                            {
                                isLoading
                                && selectedItem === cartItem
                                && <div className="loader-container">
                                    <div className="spinner-border text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            <td className="d-flex flex-column align-items-start justify-content-center">
                                <span className="product-number">{cartItem.productNumber}</span>
                                <div className="product-ndc">{cartItem.ndc}</div>
                            </td>
                            <td>
                                <span className="product-name">
                                    {cartItem.productName}
                                </span>
                            </td>
                            <td>
                                <span className="product-manufacturer">
                                    {cartItem.manufacturer}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <span className="product-size">
                                        {cartItem.bottleSize}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="product-price">
                                    $ {cartItem.price}
                                </span>
                            </td>
                            <td>
                                <div className="product-quantity d-flex align-items-center justify-content-center">
                                    {cartItem.quantity}
                                </div>
                            </td>
                            <td>
                                <span
                                    className="delete-btn d-flex align-items-center justify-content-center"
                                    onClick={() => handleDelete(cartItem)}
                                >
                                    <img
                                        src={require("../../assets/img/delete_icon.svg")}
                                        alt=""
                                    />
                                </span>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        {
            (!cart.countData || cart.countData?.length <= 0)
            && <div className="d-flex align-items-center justify-content-center cart-empty">
                Your Cart is Empty
            </div>
        }
    </>
  );
};
