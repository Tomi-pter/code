import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';
// import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProduct } from '../actions/products';
import { addCart } from '../actions/cart';
// import { ButtonContainer } from './../components/Button';
export default props => {
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const id = props.match.params.id;
    const product = products[0];
    const dispatch = useDispatch();

    const handleAddCart = () => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const newProduct = {
            "product": {
                "productId": parseInt(product.id),
                "productName": product.name,
                "price": parseFloat(product.purchasePrice),
                quantity
            }
        }
        setIsLoading(true);
        dispatch(addCart(user?.email, newProduct));
    }

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch]);

    useEffect(()=>{
        setTimeout(() => {
            setQuantity(1);
            setIsLoading(false);
        }, 1000);
    },[cart]);

    return (
        <>
            <HeaderNav />
            <div className="product-page">
                <div className="container-fluid content">
                    {product ?
                        <div className="row">
                            <div className="col">
                                <div className={"card " + (product?.category === 'Pharmacy' ?  'pharma-product' : product?.category === 'Animal Care' ? 'vet-product' : 'medsurg-product')}>
                                    <div className="img-container">
                                        <img src={ImageProduct} alt="" />
                                    </div>
                                    
                                    <div className="d-block d-lg-none">
                                        <h3 className="name">{product?.name}</h3>
                                        <h2 className="price">${product?.purchasePrice}</h2>
                                    </div>
                                    
                                    <p>Description: </p>
                                    <p>
                                        {product?.description}
                                    </p>
                                    <ul>
                                        <li>Item #:  {product?.num}</li>
                                        <li>NDC:  {product?.ndc}</li>
                                        <li>Manufacturer: {product?.customFields[3].value}</li>
                                        <li>Size: {product?.customFields[6].value}</li>
                                        <li>Strength: {product?.customFields[9].value}</li>
                                        <li>PPU: ppu</li>
                                    </ul>
                                    
                                    <div className="d-block d-lg-none">
                                        <div className="d-flex align-items-center justify-container-center qty-container">
                                            <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                            <span>{quantity}</span>
                                            <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                        </div>
                                        <button className="cart-btn">Add to cart</button>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col d-none d-lg-block">
                                <div className="card">
                                    <h3 className="name">{product?.name || product?.description}</h3>
                                    <h2 className="price">${product?.purchasePrice}</h2>
                                    <div className="d-flex align-items-center justify-container-center qty-container">
                                        <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className="cart-btn" onClick={()=>handleAddCart()}>
                                        {isLoading ?
                                            <div className="spinner-border text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <>Add to cart</>
                                        }
                                    </button>
                                    {/* <ButtonContainer
                                        className="cart-btn"
                                        cart
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}
                                    >
                                        {inCart ? "in cart" : "add to cart"}
                                    </ButtonContainer> */}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="text-center">Product Not Found</div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}