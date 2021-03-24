import React, {useState} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';

export default props => {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <HeaderNav />
                <div className="product-page">
                    <div className="container-fluid content">
                        <div className="row">
                            <div className="col">
                                <div className="card medsurg-product">
                                    <div className="img-container">
                                        <img src={ImageProduct} alt="" />
                                    </div>
                                    <p>Description: </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh orci sit neque risus sed semper accumsan elit. 
                                    </p>
                                    <ul>
                                        <li>Item #:  Lorem Ipsum</li>
                                        <li>Manufacturer: Lorem Ipsum</li>
                                        <li>Size: Lorem Ipsum</li>
                                        <li>Strength: Lorem Ipsum</li>
                                        <li>PPU: Lorem Ipsum</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <h3 className="name">Colesevelam 625mg Tabs 180ct Brand: Welchol</h3>
                                    <h2 className="price">$ 999.99</h2>
                                    <div className="d-flex align-items-center justify-container-center qty-container">
                                        <button className="minus-btn" onClick={()=> quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button className="plus-btn" onClick={()=> setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className="cart-btn">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}