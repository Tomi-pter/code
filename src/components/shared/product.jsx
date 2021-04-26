import React from 'react';
import { useHistory } from 'react-router';
import ProductImage from '../../assets/img/product-sample.png';

export const Product = ({ view, product, addCart, setSelectedProduct, selectedProduct, isLoading, quantity, setQuantity }) => {
    const history = useHistory();

    const viewProduct = (id) => {
        history.push(`/product/${id}`);
    }

    const handleChange = (e) => {
        setSelectedProduct(product);
        setQuantity(e.target.value);
    };
    
    return (
        <div className={(view === "list" ? " col-12" : "col-12 col-md-6 col-lg-4")}>
            <div
                className={"product " + (product.category === "Pharmacy" ? "pharma-product" : product.category === "Animal Care" ? "vet-product" : "medsurg-product")}
            >
                <div className="mobile-wrapper">
                    <div className={"mobile-list-header " + (view === "list" ? " d-flex" : "d-none")}>
                        <div className="product-image-head"></div>
                        <div className="header-name-wrapper">
                            <p className="flex-fill list-header-name">
                                {product.name}
                            </p>
                        </div>
                        <div className="header-price-wrapper">
                            <p className="list-header-price">
                                {product.purchasePrice}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"product-details-container"}>
                    <div className="img-container">
                        <div>
                            <img src={ProductImage} alt="" />
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="no-container for-list">
                            <p className="item-no">{product.num}</p>
                            <p className="ndc">{product.ndc}</p>
                        </div>
                        <div className="name-container" onClick={()=>viewProduct(product.id)}>
                            <p className="name">{product.description}</p>
                            {/* <p className="compare for-list">({compare_to})</p> */}
                        </div>
                        <p className="company for-list">{product.customFields[3].value || "Amneal Pharm."}</p>
                        <p className="size for-list">{product.customFields[6].value || "100"}</p>
                        <p className="strength for-list">{product.customFields[9].value || "100"}</p>
                        <div className="price-container">
                            <p className="price">${product.purchasePrice}</p>
                            {/* <p className="ppu for-list">({ppu})</p> */}
                        </div>
                        <div className="buy-container">
                            <input className="qty for-list" type="number" min="1" placeholder="1" value={selectedProduct === product ? quantity : 1} onChange={handleChange} />
                            <button className={"cart-btn " + (selectedProduct === product && isLoading ? 'adding' : '')} onClick={() => addCart(product)}>
                                {(selectedProduct === product && isLoading) ?
                                    <div className="spinner-border text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    <></>
                                }
                            </button>
                        </div>
                        <p className="incart for-list">1</p>
                    </div>
                    {/* <div className={(view === "list " ? "d-block" : "d-none")}>
                        <div className="price-wrapper">
                            <div className="flex-fill">
                                <p className="price">${product.purchasePrice}</p>
                                <p className="ppu">({ppu})</p>
                            </div>
                            <div className="buy-container">
                                <button className={"cart-btn " + (selectedProduct === product && isLoading ? 'adding' : '')} onClick={() => addCart(product)}>
                                    {(selectedProduct === product && isLoading) ?
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <></>
                                    }
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
};