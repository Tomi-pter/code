import React from "react";
import { useHistory } from "react-router";
import NoImage from "../../assets/img/unavailable.svg";
import moment from "moment/moment";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addPreferred, removePreferred } from "../../actions/products";

const renderActionButton = (
  selectedProduct,
  product,
  quantity,
  handleChange,
  addCart,
  isCartLoading,
  requestStock,
  requestLoading
) => {
  if (product?.totalquantityonhand <= 0) {
    return (
      <div className="buy-container">
        <button
          className="btn btn-primary sale-rep-btn"
          onClick={() => requestStock(product)}
        >
          {requestLoading && selectedProduct === product ? (
            <div
              className="spinner-border text-primary mr-0"
              style={{ width: "20px", height: "20px" }}
              role="contact rep"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Contact Sales Rep"
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="buy-container d-flex">
      {/* <input
        className="qty for-list mr-2"
        type="number"
        min="1"
        placeholder="1"
        value={selectedProduct === product ? quantity : 1}
        onChange={handleChange}
      /> */}
      <button
        className={
          "add-to-cart " +
          (selectedProduct === product && isCartLoading ? "adding" : "")
        }
        onClick={() => addCart(product)}
      >
        {selectedProduct === product && isCartLoading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>Add to cart</>
        )}
      </button>
    </div>
  );
};

const formatPrice = (price) => {
  var n = parseFloat(price).toFixed(2);
  return n;
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

export const Productv2 = ({
  view,
  product,
  addCart,
  requestStock,
  setSelectedProduct,
  selectedProduct,
  isLoading,
  isCartLoading,
  requestedProductPrice,
  requestLoading,
  requestSent,
  quantity,
  setQuantity,
  shopFont,
  cart,
  category,
  subCategory,
  sortBy,
  selectedCategory,
}) => {
  const auth = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();

  const incart = () => {
    const incartCheck = cart?.cartData?.filter(
      (item) => item.productId === parseInt(product.id)
    );
    return incartCheck[0] ? incartCheck[0].quantity : 0;
  };

  const viewProduct = (id) => {
    history.push(`/product/${id}`);
  };

  const handleChange = (e) => {
    setSelectedProduct(product);
    setQuantity(parseInt(e.target.value));
  };

  const setPrefered = (product) => {
    let formData = product.preferred
      ? { productId: product.id }
      : {
          product: {
            ndc: product.name,
            productId: product.id,
            productName: product.ndc,
          },
        };
    product.preferred
      ? dispatch(removePreferred(auth?.username, formData))
      : dispatch(addPreferred(auth?.username, formData));
  };

  // const handleRequestedCheck = (ndc) => {
  //   const requestedCheck = requestedProductPrice.filter(item => item.ndc === ndc);
  //   if (requestedCheck[0]) {
  //     const lastRequest = new Date(requestedCheck[0]?.lastRequested);
  //     const hour= 1000 * 60 * 60;
  //     const hourago = Date.now() - (hour * 24);

  //     return lastRequest > hourago;
  //   } else {
  //     return false
  //   }
  // }

  const FavoriteButton = ({ preferred, onClick }) => {

  }

    


  return (
    <div className={view === "list" ? " col-12" : "col-12 col-md-6 col-lg-3"}>
        <div 
            // className={
            //     "product " +
            //     (category === "Pharmaceuticals"
            //         ? "pharma-product"
            //         : category === "Animal Health"
            //         ? "vet-product"
            //         : "medsurg-product")
            // }
        >

            {
                view === "list"
                    ? <div className="product-row d-flex align-items-center justify-content-between col-12">
                        <div className="product-image-container  d-flex align-items-center">
                            <img src={product.imageUrl ? product.imageUrl : NoImage}
                                alt=""
                                onClick={() => viewProduct(product.id)}
                            />
                        </div>
                        <div className="product-details d-flex flex-column align-items-start w-100">
                            <div className="product-name"><h5>{product.name}</h5></div>
                            <span className="category d-flex align-items-center justify-content-center">
                                {product.category}
                            </span>
                            <div className="d-flex flex-row align-items-center justify-content-between w-100">
                                <div className="product-number d-flex flex-row align-items-center justify-content-between">
                                    <label>Item</label>
                                    <span>{product.productNumber || "N/A"}</span>
                                </div>
                                <div className="product-ndc d-flex flex-row align-items-center justify-content-between">
                                    <label>NDC</label>
                                    <span>{product.ndc}</span>
                                </div>
                                <div className="product-manufacturer d-flex flex-row align-items-center justify-content-between">
                                    <label>Manufacturer</label>
                                    <span>{product.manufacturer || "N/A"}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between w-100">
                                <div className="product-strength d-flex flex-row align-items-center justify-content-between">
                                    <label>Strength</label>
                                    <span>{product.drugStrength || "N/A"}</span>
                                </div>
                                <div className="product-size d-flex flex-row align-items-center justify-content-between">
                                    <label>Size</label>
                                    <span>{product.bottleSize || "N/A"}</span>
                                </div>
                                <div className="product-ppu d-flex flex-row align-items-center justify-content-between">
                                    <label>Price Per Unit</label>
                                    {
                                        auth
                                        ? <>{getPricePerUnit(product.bottleSize, product.cost)}</>
                                        : <span style={{ fontSize: "12.3295px" }}>
                                            <Link
                                                to="/login"
                                                style={{ textDecoration: "underline", color: "black" }}
                                            >
                                                Login
                                            </Link>{" "}
                                            for Price
                                        </span>
                                    }
                                </div>
                            </div>

                            {
                                selectedCategory === "Specials"
                                && <span>
                                    <br />
                                    Expire Date: { moment(product.expirationDate).format("MMMM DD, YYYY") }
                                </span>
                            }

                            {
                                (
                                    !product?.totalquantityonhand
                                    || product?.totalquantityonhand === ""
                                    || product?.totalquantityonhand === "0.0"
                                )
                                && <span style={{ color: "red", fontSize: "12px" }}>
                                    <br /> Item is out of stock.
                                </span>
                            }
                        </div>
                        <div className="product-actions d-flex flex-column align-items-start justify-content-between">
                            <div className="product-price">
                                {
                                    ((!auth && shopFont) || !auth)
                                    ? <span style={{ fontSize: "12.3295px" }}>
                                            <Link
                                                to="/login"
                                                style={{ textDecoration: "underline", color: "black" }}
                                            >
                                                Login
                                            </Link>{" "}
                                            for Price
                                        </span>
                                    : <span>
                                        ${" "}
                                        { formatPrice(product.cost) }
                                    </span>
                                }
                            </div>
                            <div className="product-buttons d-flex flex-row">
                                {
                                    auth
                                    ? renderActionButton(
                                        selectedProduct,
                                        product,
                                        quantity,
                                        handleChange,
                                        addCart,
                                        isCartLoading,
                                        requestStock,
                                        requestLoading
                                        )
                                    : <span style={{ fontSize: "12.3295px" }} className="to-buy">
                                        <Link
                                            to="/login"
                                            style={{ textDecoration: "underline", color: "black" }}
                                        >
                                            Login
                                        </Link>{" "}
                                        to Buy
                                    </span>
                                }
                                <div className={"favorite-btn " + (product.preferred ? "preferred" : "")} onClick={() => setPrefered(product)}>
                                    <span className="heart-icon"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="product-container d-flex flex-column align-items-start justify-content-between">
                    <div className="product-image-container  d-flex align-items-center">
                        <img src={product.imageUrl ? product.imageUrl : NoImage}
                            alt=""
                            onClick={() => viewProduct(product.id)}
                        />
                    </div>
            
                    <hr className="w-100"/>
            
                    <div className="product-details d-flex flex-column align-items-start w-100">
                        <div className="d-flex flex-row align-items-start justify-content-between w-100">
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">
                                <span>{`$ ${formatPrice(product.cost)}`}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-start justify-content-between w-100">
                            <div className="category">{product.category}</div>
                            <div className="product-ppu d-flex flex-column align-items-end">
                                <label>Price per unit:</label>
                                <span>{getPricePerUnit(product.bottleSize, product.cost)}</span>
                            </div>
                        </div>
                        <div className="product-size">
                            <span>{product.bottleSize || "N/A"}</span>
                        </div>
                    </div>
                    <div className="product-actions d-flex flex-column align-items-start justify-content-between">
                        Actions
                    </div>
                </div>
            }

            {/* <div className="mobile-wrapper">
                <div className={ "mobile-list-header " + (view === "list" ? " d-flex" : "d-none") }>
                    <div className="header-name-wrapper">
                        <p className="flex-fill list-header-name">
                            {product.name}
                            
                            {
                                selectedCategory === "Specials"
                                && <span>
                                    <br />
                                    Expire Date:{" "}
                                    { moment(product.expirationDate).format("MMMM DD, YYYY") }
                                </span>
                            
                            }

                            {
                                (
                                    !product?.totalquantityonhand
                                    || product?.totalquantityonhand === ""
                                    || product?.totalquantityonhand === "0.0"
                                ) && <span style={{ color: "red", fontSize: "12px" }}>
                                        <br /> Item is out of stock.
                                    </span>
                            }
                        </p>
                    </div>
                </div>
            </div> */}

            {/* <div className={"product-details-container"}>
                <div className={"star " + (product.preferred ? "preferred" : "")} onClick={() => setPrefered(product)}></div>

                <div className="img-container">
                    <div>
                        <img
                            src={product.imageUrl ? product.imageUrl : NoImage}
                            alt=""
                            onClick={() => viewProduct(product.id)}
                        />
                    </div>
                </div>

                <div className="details-container">
                    <div className="no-container for-list">
                        <p className="item-no">{product.productNumber || "N/A"}</p>
                        <p className="ndc">{product.ndc}</p>
                    </div>

                    <div
                        className="name-container"
                        onClick={() => viewProduct(product.id)}
                        style={{
                            minHeight: view === "list" || shopFont ? "0px" : "12vh",
                        }}
                    >
                        {
                            shopFont
                            ? <>
                                <p style={{ fontSize: "11.4183px !important" }}>
                                    {product.name}

                                    {
                                        selectedCategory === "Specials"
                                        && <span>
                                            <br />
                                            Expire Date: { moment(product.expirationDate).format("MMMM DD, YYYY") }
                                        </span>
                                    }

                                    {
                                        (
                                            !product?.totalquantityonhand
                                            || product?.totalquantityonhand === ""
                                            || product?.totalquantityonhand === "0.0"
                                        )
                                        && <span style={{ color: "red", fontSize: "12px" }}>
                                            <br /> Item is out of stock.
                                        </span>
                                    }
                                </p>
                            </>
                            : <p className="name">
                                {product.name}

                                {
                                    selectedCategory === "Specials"
                                    && <span>
                                        <br />
                                        Expire Date:{moment(product.expirationDate).format("MMMM DD, YYYY")}
                                    </span>
                                }

                                {
                                    (
                                        !product?.totalquantityonhand
                                        || product?.totalquantityonhand === ""
                                        || product?.totalquantityonhand === "0.0"
                                    )
                                    && <span style={{ color: "red", fontSize: "12px" }}>
                                        <br /> Item is out of stock.
                                    </span>
                                }
                            </p>
                        }

                        {
                            view !== "list"
                            && <>
                                <p className="mb-0">
                                    ITEM #: {product.productNumber || "N/A"}
                                </p>
                                <p>NDC: {product.ndc}</p>
                            </>
                        }
                    </div>

                    <p className="company for-list">{product.manufacturer || "N/A"}</p>
                    <p className="size for-list">{product.bottleSize || "N/A"}</p>
                    <p className="strength for-list">{product.drugStrength || "N/A"}</p>

                    <div className="price-container">
                        <p className="price">
                            {
                                ((!auth && shopFont) || !auth)
                                ? <span style={{ fontSize: "12.3295px" }}>
                                        <Link
                                            to="/login"
                                            style={{ textDecoration: "underline", color: "black" }}
                                        >
                                            Login
                                        </Link>{" "}
                                        for Price
                                    </span>
                                : <>
                                    ${" "}
                                    { formatPrice(product.cost) }
                                </>
                            }
                        </p>
                    </div>

                    <p className="size for-list">
                        {
                            auth
                            ? <>{getPricePerUnit(product.bottleSize, product.cost)}</>
                            : <span style={{ fontSize: "12.3295px" }}>
                                <Link
                                    to="/login"
                                    style={{ textDecoration: "underline", color: "black" }}
                                >
                                    Login
                                </Link>{" "}
                                for Price
                            </span>
                        }
                    </p>

                    {
                        auth
                        ? renderActionButton(
                            selectedProduct,
                            product,
                            quantity,
                            handleChange,
                            addCart,
                            isCartLoading,
                            requestStock,
                            requestLoading
                            )
                        : <span style={{ fontSize: "12.3295px" }} className="to-buy">
                            <Link
                                to="/login"
                                style={{ textDecoration: "underline", color: "black" }}
                            >
                                Login
                            </Link>{" "}
                            to Buy
                        </span>
                    }

                    <p className={"incart" + (auth ? " for-list" : " d-none")}>
                        { incart() }
                    </p>
                </div>
            </div> */}

            
        </div>
    </div>
  );
};
