import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import ImageProduct from '../assets/img/product-sample.png';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProduct, requestPrice, getRequestPrice } from '../actions/products';
import { getCustomProducts } from '../actions/admin'
import { addCart } from '../actions/cart';
import NoImage from '../assets/img/unavailable.svg';
import { Helmet } from 'react-helmet';
import { NotificationBanner } from '../components/shared/warningNotification';
import { Modal, Button } from "react-bootstrap";

export default props => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const cart = useSelector((state) => state.cart);
    const admin = useSelector((state) => state.admin);
    const products = useSelector((state) => state.products);
    const [product, setProduct] = useState(null);
    const [customProducts, setCustomProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false)
    const [requestSent, setRequestSent] = useState(false)
    const [requestedProductPrice, setRequestedProductPrice] = useState([])
    const [quantity, setQuantity] = useState(1);
    const staging = process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
    const dispatch = useDispatch();
    const location = useLocation();
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);

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
                quantity,
                ndc: product.ndc
            }
        }
        setIsLoading(true);
        dispatch(addCart(user?.username, newProduct));
    }

    const formatPrice = (price) => {
        var n = parseFloat(price).toFixed(2);
        return n;
    }

    const handleRequestPrice = (product) => {
        const user = JSON.parse(localStorage.getItem('profile'))
        const formData = {
          ndc: product.ndc,
          productName: product.name
        }
        setRequestLoading(true)
        dispatch(requestPrice(user?.username, formData))
    }

    const handleRequestedCheck = (ndc) => {
        const requestedCheck = requestedProductPrice.filter(item => item.ndc === ndc);
        if (requestedCheck[0]) {
          const lastRequest = new Date(requestedCheck[0]?.lastRequested);
          const hour= 1000 * 60 * 60;
          const hourago = Date.now() - (hour * 24);
      
          return lastRequest > hourago;
        } else {
          return false
        }
    }

    useEffect(() => {
        if (products.products?.length > 0 && admin?.customProducts?.length > 0) {

            const customProductLookup = admin.customProducts.reduce((prods, prod) => {
                 prods[prod.productId] = prod;

                 return prods;
             }, {});

             const productsWithCustomPrice = products.products.map(prod => {
                 if (customProductLookup[prod.id] !== undefined) {
                     prod.purchasePrice = customProductLookup[prod.id].price;
                     prod.favorite = true
                 }

                 return { ...prod }
             })

             setCustomProducts(productsWithCustomPrice);
        } else {
            setCustomProducts(products.products);
        }
        setProduct(products?.products[0])
        if (products.requestedProductPrice) {
            setRequestedProductPrice(products.requestedProductPrice)
        }
        if (requestLoading && products.requestPriceSuccess) {
            // alert('Thanks! A sales representative will be in touch with you shortly');
            setShow(true)
        }
        setRequestLoading(false)
    }, [products, admin]);

    useEffect(() => {
        const id = props.match.params.id;
        dispatch(getProduct(id));
        dispatch(getCustomProducts(user?.username))
        dispatch(getRequestPrice(user?.username))
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
                    {!products.errorGetProducts && product &&
                        <div className="d-block d-lg-flex align-items-start">
                            <div className={"details-container card " + (product?.customFields[staging ? 19 : 10] && product?.customFields[staging ? 19 : 10].value  === 'Pharmaceuticals' ?  'pharma-product' : product?.customFields[staging ? 19 : 10].value === 'Animal Health' ? 'vet-product' : 'medsurg-product')}>
                                <div className="img-container">
                                <img src={product.url  ? product.url : NoImage} alt="" />
                                </div>

                                <div className="d-block d-lg-none">

                                    <h3 className="name">{product?.name}</h3>
                                    <p className={"availability " + ((product?.qtyOnHand !== "" && product?.qtyOnHand !== "0.0") ? '' : 'no-stock')}>
                                        {(product?.qtyOnHand !== "" && product?.qtyOnHand !== "0.0") ?
                                            ''
                                        :
                                            "Item is out of stock. Please call for availability."
                                        }
                                    </p>
                                    {product?.favorite ?
                                        <h2 className="price">${customProducts && customProducts.length > 0 ? formatPrice(customProducts[0].purchasePrice) : formatPrice(product?.purchasePrice)}</h2>
                                        :
                                        handleRequestedCheck(product?.ndc) ? 
                                            <p style={{ margin: '20px 0', color: 'green' }}>
                                                Request Sent
                                            </p>
                                        :
                                        requestLoading ?
                                            <p style={{ margin: '20px 0' }}>Requesting...</p>
                                        :
                                            <p style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer', margin: '20px 0' }} onClick={()=>handleRequestPrice(product)}>
                                                Request for Price
                                            </p>
                                    }
                                </div>

                                <p>Description: </p>

                                <p>
                                    {product?.description}
                                </p>
                                <ul>
                                {/* {product?.num} */}
                                    <li>Item #: {product.customFields[13] && product.customFields[13].value ? product.customFields[13].value : 'N/A'}</li>
                                    <li>NDC:  {product?.ndc}</li>
                                    <li>Manufacturer:  {product.customFields[staging ? 15 : 3].value ? product.customFields[staging ? 15 : 3].value : 'N/A'}</li>
                                    <li>Size:  {product.customFields[staging ? 17 : 6].value ? product.customFields[staging ? 17 : 6].value : 'N/A'}</li>
                                    <li>Strength: {product.customFields[staging ? 18 : 9].value ? product.customFields[staging ? 18 : 9].value : 'N/A' }</li>
                                </ul>

                                <div className="d-block d-lg-none">
                                { user ?
                                    product.favorite ?
                                    <>
                                        <div className="d-flex align-items-center justify-container-center qty-container">
                                            <button className="minus-btn" onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                                            <input type="number" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} />
                                            <button className="plus-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                        </div>
                                        <button className="cart-btn">Add to cart</button>

                                    </>
                                    : ''
                                :
                                <div className="logout-state"><Link to="/login">Login</Link>  for price</div>
                                }
                                </div>
                            </div>
                            <div className="right-col">
                                <div className="card d-none d-lg-block">
                                    <h3 className="name">{product?.name || product?.description}</h3>
                                    <p className={"availability " + ((product?.qtyOnHand !== "" && product?.qtyOnHand !== "0.0") ? '' : 'no-stock')}>
                                        {(product?.qtyOnHand !== "" && product?.qtyOnHand !== "0.0") ?
                                            ''
                                        :
                                            "Item is out of stock. Please call for availability."
                                        }
                                    </p>
                                    { user ?
                                            product?.favorite ?
                                                <>
                                                    <div className="d-flex align-items-center justify-container-center">
                                                        <h2 className="price">${customProducts && customProducts.length > 0 ? formatPrice(customProducts[0].purchasePrice) : formatPrice(product?.purchasePrice)}</h2>
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
                                            handleRequestedCheck(product?.ndc) ? 
                                            <p style={{ color: 'green' }}>
                                                Request Sent
                                            </p>
                                            :
                                            requestLoading ?
                                                <p>Requesting...</p>
                                            :
                                            <p style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer' }} onClick={()=>handleRequestPrice(product)}>
                                                Request for Price
                                            </p>
                                        :
                                            <div className="logout-state"><Link to="/login">Login</Link>  for price</div>
                                    }
                                </div>
                                {product?.qtyOnHand !== "" && <NotificationBanner />}
                            </div>
                        </div>
                    }
                    {products.errorGetProducts && <div className="text-center">Product Not Found</div>}
                </div>
            </div>
            <Footer />
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Request Sent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thanks! A sales representative will be in touch with you shortly
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
