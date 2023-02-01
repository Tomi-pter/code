import React, { useState, useEffect } from "react";
import { HeaderNav } from "../components/partials/HeaderNav";
import { Footer } from "../components/partials/Footer";
import ImageProduct from "../assets/img/product-sample.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getProductv2,
  requestStock,
  getFavProductsv2,
  getRequestPrice,
} from "../actions/products";
import { getCustomProducts } from "../actions/admin";
import { addCart } from "../actions/cart";
import NoImage from "../assets/img/unavailable.svg";
import { Helmet } from "react-helmet";
import { NotificationBanner } from "../components/shared/warningNotification";
import { Modal, Button } from "react-bootstrap";

export default (props) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const cart = useSelector((state) => state.cart);
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [customProducts, setCustomProducts] = useState([]);
  const [mainLoading, setMainLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestedProductPrice, setRequestedProductPrice] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const staging =
    process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
  const dispatch = useDispatch();
  const location = useLocation();
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const incart = () => {
    const incartCheck = cart?.cartData?.filter(
      (item) => item.productId === parseInt(product.id)
    );
    return incartCheck[0] ? incartCheck[0].quantity : 0;
  };

  const handleAddCart = () => {
    const newProduct = {
      product: {
        productId: parseInt(product.id),
        productName: product.name,
        price: parseFloat(product.cost),
        imageUrl: product.url,
        quantity,
        ndc: product.ndc,
        category: product.category,
        expirationDate: product.expirationDate,
        lotName: product.lotName
      },
    };
    setIsLoading(true);
    dispatch(addCart(user?.username, newProduct));
  };

  const formatPrice = (price) => {
    var n = parseFloat(price).toFixed(2);
    return n;
  };

  const handleRequestStock = (product) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const formData = {
      ndc: product.ndc,
      productName: product.name,
    };
    setRequestLoading(true);
    dispatch(requestStock(user?.username, formData));
  };

  const handleRequestedCheck = (ndc) => {
    const requestedCheck = requestedProductPrice.filter(
      (item) => item.ndc === ndc
    );
    if (requestedCheck[0]) {
      const lastRequest = new Date(requestedCheck[0]?.lastRequested);
      const hour = 1000 * 60 * 60;
      const hourago = Date.now() - hour * 24;

      return lastRequest > hourago;
    } else {
      return false;
    }
  };

  const renderActionButton = (
    product,
    quantity,
    setQuantity,
    handleAddCart,
    isLoading,
    handleRequestStock,
    requestLoading
  ) => {
    if (product?.totalquantityonhand <= 0) {
      return (
        <button
          className="btn btn-primary"
          style={{ minWidth: "140px", height: "40px" }}
          onClick={() => handleRequestStock(product)}
        >
          {requestLoading ? (
            <div
              className="spinner-border text-primary"
              style={{ width: "20px", height: "20px" }}
              role="contact rep"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Contact Sales Rep"
          )}
        </button>
      );
    }

    return (
      <>
        <div className="d-flex align-items-center justify-container-center qty-container">
          <button
            className="minus-btn"
            onClick={() => (quantity === 1 ? null : setQuantity(quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            className="plus-btn"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="d-flex align-items-center">
          <button className="cart-btn" onClick={() => handleAddCart()}>
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>Add to cart</>
            )}
          </button>
        </div>
      </>
    );
  };

  const getPricePerUnit = (bottleSize, cost) => {
    if (!bottleSize) {
      return "";
    }

    const sizeInString = getIntegerInStringArray(bottleSize);

    if (!sizeInString || sizeInString.length !== 1 || cost === 0) {
      return "";
    }

    const ppu = roundToTwo(cost / sizeInString);

    return `$ ${ppu}`;
  };

  const getIntegerInStringArray = (string) => {
    return string.match(/[0-9\.,]+/g);
  };

  const roundToTwo = (num) => {
    return +(Math.round(num + "e+3") + "e-3");
  };

  useEffect(() => {
    setMainLoading(true);
    let id = props.match.params.id;
    const { productsv2, favproductv2 } = products;
    if (productsv2 && favproductv2) {
      let filterProduct = productsv2?.filter(
        (prod) => prod.id === parseInt(id)
      );
      let favproduct = favproductv2?.filter((prod) => prod.id === parseInt(id));
      if (filterProduct?.length > 0 && favproduct?.length > 0) {
        setProduct({
          ...filterProduct[0],
          favorite: true,
          cost: favproduct[0].cost,
        });
      } else {
        setProduct(filterProduct[0]);
      }
    }
    if (products.requestedProductPrice) {
      setRequestedProductPrice(products.requestedProductPrice);
    }
    if (requestLoading) {
      setShow(true);
    }
    setMainLoading(false);
    setRequestLoading(false);
  }, [products, location]);

  // useEffect(() => {
  //     setMainLoading(true)
  // }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setQuantity(1);
      setIsLoading(false);
    }, 1000);
  }, [cart]);

  return (
    <>
      <Helmet>
        <title>Product | Premier Pharmaceuticals</title>
      </Helmet>
      <HeaderNav />
      <div className="product-page">
        <div className="container content">
          {mainLoading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "calc(100vh - 266px)", width: "100%" }}
            >
              <div className="spinner-border text-primary" role="main loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {!products.errorGetProducts && product && (
                <div className="d-block d-lg-flex align-items-start">
                  <div
                    className={
                      "details-container card " +
                      (product?.category ? "pharma-product" : "pharma-product")
                    }
                  >
                    <div className="img-container">
                      <img
                        src={product.imageUrl ? product.imageUrl : NoImage}
                        alt=""
                      />
                    </div>
                    <div className="d-block d-lg-none">
                      <h3 className="name">{product?.name}</h3>
                      <p
                        className={
                          "availability " +
                          (product?.totalquantityonhand &&
                          product?.totalquantityonhand !== "" &&
                          product?.totalquantityonhand !== "0.0"
                            ? ""
                            : "no-stock")
                        }
                      >
                        {product?.totalquantityonhand !== "" &&
                        product?.totalquantityonhand !== 0
                          ? ""
                          : "Item is out of stock."}
                      </p>
                      <h2 className="price">${formatPrice(product?.cost)}</h2>
                    </div>

                    <p>Description: </p>

                    <p>{product.name}</p>
                    <ul>
                      <li>Item #: {product?.productNumber || "N/A"}</li>
                      <li>NDC: {product?.ndc}</li>
                      <li>Manufacturer: {product?.manufacturer || "N/A"}</li>
                      <li>Size: {product?.bottleSize || "N/A"}</li>
                      <li>
                        Price per unit:{" "}
                        {user ? (
                          <>
                            {" "}
                            {getPricePerUnit(
                              product.bottleSize,
                              product.cost
                            )}{" "}
                          </>
                        ) : (
                          <span style={{ fontSize: "12.3295px" }}>
                            <Link
                              to="/login"
                              style={{
                                textDecoration: "underline",
                                color: "black",
                              }}
                            >
                              Login
                            </Link>{" "}
                            for Price
                          </span>
                        )}
                      </li>
                      <li>Strength: {product?.drugStrength || "N/A"}</li>
                    </ul>

                    <div className="d-block d-lg-none">
                      {user ? (
                        product.favorite ? (
                          <>
                            <div className="d-flex align-items-center justify-container-center qty-container">
                              <button
                                className="minus-btn"
                                onClick={() =>
                                  quantity === 1
                                    ? null
                                    : setQuantity(quantity - 1)
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                  setQuantity(parseInt(e.target.value))
                                }
                              />
                              <button
                                className="plus-btn"
                                onClick={() => setQuantity(quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <button className="cart-btn">Add to cart</button>
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        <div className="logout-state">
                          <Link to="/login">Login</Link> for price
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="right-col">
                    <div className="card d-none d-lg-block">
                      <h3 className="name">{product?.name}</h3>
                      <p
                        className={
                          "availability " +
                          (product?.totalquantityonhand &&
                          product?.totalquantityonhand !== "" &&
                          product?.totalquantityonhand !== 0
                            ? ""
                            : "no-stock")
                        }
                      >
                        {product?.totalquantityonhand !== "" &&
                        product?.totalquantityonhand !== 0
                          ? ""
                          : "Item is out of stock."}
                      </p>
                      {user ? (
                        <>
                          <div className="d-flex align-items-center justify-container-center">
                            <h2 className="price">
                              ${formatPrice(product?.cost)}
                            </h2>
                            {incart() > 0 && !isLoading && (
                              <span className="incart">{incart()} in cart</span>
                            )}
                          </div>
                          {renderActionButton(
                            product,
                            quantity,
                            setQuantity,
                            handleAddCart,
                            isLoading,
                            handleRequestStock,
                            requestLoading
                          )}
                        </>
                      ) : (
                        <div className="logout-state">
                          <Link to="/login">Login</Link> for price
                        </div>
                      )}
                    </div>
                    {product?.totalquantityonhand !== "" && (
                      <NotificationBanner />
                    )}
                  </div>
                </div>
              )}
              {products.errorGetProducts && (
                <div className="text-center">Product Not Found</div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {products.requestStockSuccess ? "Request Sent" : "Request Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {console.log(products)}
            {
                products.requestStockSuccess
                    ? products.salesRep === undefined//If customer is not assigned with a sales rep, they will send an email to sales@premierpharma.com
                        ? `Thanks! sales@premierpharma.com will be in touch with you shortly.`
                        : `Sales Representative ${products.salesRep} will be in touch with you shortly.`
                    : 'Please try again'
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
