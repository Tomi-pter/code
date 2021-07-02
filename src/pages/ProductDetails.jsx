import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProduct } from '../actions/products';
import { addCart } from '../actions/cart';
import NoImage from '../assets/img/unavailable.svg';
import { Helmet } from 'react-helmet';
import { NotificationBanner } from '../components/shared/warningNotification';

export default props => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const staging = process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
    const product = products[0];
    const dispatch = useDispatch();
    const location = useLocation();

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
                imageUrl: product.url, 
                quantity
            }
        }
        setIsLoading(true);
        dispatch(addCart(user?.username, newProduct));
    }

    useEffect(() => {
        const id = props.match.params.id;
        dispatch(getProduct(id));
    }, [dispatch, location]);

    useEffect(()=>{
        setTimeout(() => {
            setQuantity(1);
            setIsLoading(false);
        }, 1000);
    },[cart]);

    return (
        <>
            <Helmet>
                <title>Product | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="product-page">
                <div className="container content">
                    {product ?
                        <div className="d-block d-lg-flex align-items-start">
                            <div className={"details-container card " + (product.customFields[staging ? 15 : 10].value  === 'Pharmaceuticals' ?  'pharma-product' : product.customFields[staging ? 15 : 10].value === 'Animal Health' ? 'vet-product' : 'medsurg-product')}>
                                <div className="img-container">
                                <img src={product.url  ? product.url : NoImage} alt="" />
                                </div>
                                
                                <div className="d-block d-lg-none">
                                   
                                    <h3 className="name">{product?.name}</h3>
                                    <p className="availability">
                                        {product?.qtyOnHand !== "" ? (
                                            ''
                                        ) : (
                                            "Ships in 2 - 5 business days"
                                        ) }

                                    </p>
                                    <h2 className="price">${product?.purchasePrice}</h2>
                                </div>
                                
                                <p>Description: </p>
                             
                                <p>
                                    {product?.description}
                                </p>
                                <ul>
                                    <li>Item #:  {product?.num}</li>
                                    <li>NDC:  {product?.ndc}</li>
                                    <li>Manufacturer:  {product.customFields[staging ? 11 : 3].value ? product.customFields[staging ? 11 : 3].value : 'N/A'}</li>
                                    <li>Size:  {product.customFields[staging ? 13 : 6].value ? product.customFields[staging ? 13 : 6].value : 'N/A'}</li>
                                    <li>Strength: {product.customFields[staging ? 14 : 9].value ? product.customFields[staging ? 14 : 9].value : 'N/A' }</li>
                                </ul>
                              
                                <div className="d-block d-lg-none">
                                { user ? 
                                <>
                                    <div className="d-flex align-items-center justify-container-center qty-container">
                                        <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                        <input type="number" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} />
                                        <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className="cart-btn">Add to cart</button>
                               
                                </> :
                                  <div className="logout-state"><Link to="/login">Login</Link>  for price</div>
                                }
                                </div>
                            </div>
                            <div className="right-col">
                                <div className="card d-none d-lg-block">
                                    <h3 className="name">{product?.name || product?.description}</h3>
                                    <p className="availability">
                                        {product?.qtyOnHand !== "" ? (
                                            ''
                                        ) : (
                                            "Ships in 2 - 5 business days"
                                        ) }

                                    </p>
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
                                <NotificationBanner />
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