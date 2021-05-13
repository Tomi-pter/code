import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProduct } from '../actions/products';
import { addCart } from '../actions/cart';

export default props => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const product = products[0];
    const dispatch = useDispatch();

    const incart = () => {
        const incartCheck = cart?.cartData?.filter(item => item.productId === parseInt(product.id));
        return incartCheck[0] ? incartCheck[0].quantity : 0;
    }

    const handleAddCart = () => {
        const newProduct = {
            product: {
                productId: parseInt(product.id),
                productName: product.name,
                price: parseFloat(product.purchasePrice),
                quantity
            }
        }
        setIsLoading(true);
        dispatch(addCart(user?.username, newProduct));
    }

    useEffect(() => {
        const id = props.match.params.id;
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
                <div className="container content">
                    {product ?
                        <div className="d-flex align-items-start">
                            <div className={"details-container card " + (product.customFields[15].value  === 'Pharmaceuticals' ?  'pharma-product' : product.customFields[15].value === 'Animal Health AND Medical Supplies' ? 'vet-product' : 'medsurg-product')}>
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
                                    <li>Manufacturer:  {product.customFields[3] ? product.customFields[3].value : 'Amneal Pharm'}</li>
                                    <li>Size:  {product.customFields[6] ? product.customFields[6].value: '100'}</li>
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
                            <div className="card">
                                <h3 className="name">{product?.name || product?.description}</h3>
                                { user ? 
                                    <>
                                        <div className="d-flex align-items-center justify-container-center">
                                            <h2 className="price">${product?.purchasePrice}</h2> 
                                            {incart() > 0 && !isLoading && <span className="incart">{incart()} in cart</span>}
                                        </div>
                                        <div className="d-flex align-items-center justify-container-center qty-container">
                                            <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                            <input type="number" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} />
                                            <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button className="cart-btn" onClick={()=>handleAddCart()}>
                                                {isLoading ?
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <>Add to cart</>
                                                }
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <div className="logout-state"><Link to="/login">Login</Link>  for price</div>
                                }
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