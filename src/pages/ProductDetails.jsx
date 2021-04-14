import React, { useState } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './../components/Button';
export default props => {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <HeaderNav />
            <ProductConsumer>
                {value => {
                    const { id,
                        item_no,
                        ndc,
                        name,
                        compare_to,
                        img,
                        company,
                        size,
                        strength,
                        price,
                        ppu,
                        category,
                        inCart } = value.detailProduct;
                    return (
                        <div className="product-page">
                            <div className="container-fluid content">
                                <div className="row">
                                    <div className="col">
                                        <div className="card medsurg-product">
                                            <div className="img-container">
                                                <img src={img} alt="" />
                                            </div>
                                            {/* Start Mobile */}
                                            <div className="d-block d-lg-none">
                                                <h3 className="name">{name}</h3>
                                                <h2 className="price">{price}</h2>
                                            </div>
                                            {/* End Mobile */}
                                            <p>Description: </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh orci sit neque risus sed semper accumsan elit.
                                    </p>
                                            <ul>
                                                <li>Item #:  {item_no}</li>
                                                <li>Manufacturer: {ndc}</li>
                                                <li>Size: {size}</li>
                                                <li>Strength: {strength}</li>
                                                <li>PPU: {ppu}</li>
                                            </ul>
                                            {/* Start Mobile */}
                                            <div className="d-block d-lg-none">
                                                <div className="d-flex align-items-center justify-container-center qty-container">
                                                    <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                                    <span>{quantity}</span>
                                                    <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                                </div>
                                                <button className="cart-btn">Add to cart</button>
                                            </div>
                                            {/* End Mobile */}
                                        </div>
                                    </div>
                                    <div className="col d-none d-lg-block">
                                        <div className="card">
                                            <h3 className="name">{name}</h3>
                                            <h2 className="price">{price}</h2>
                                            <div className="d-flex align-items-center justify-container-center qty-container">
                                                <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                                <span>{quantity}</span>
                                                <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                            </div>
                                            <ButtonContainer
                                                className="cart-btn"
                                                cart
                                                disabled={inCart ? true : false}
                                                onClick={() => {
                                                    value.addToCart(id);
                                                    value.openModal(id);
                                                }}
                                            >
                                                {inCart ? "in cart" : "add to cart"}
                                            </ButtonContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
            <Footer />
        </>
    )
}