import React from 'react'

export const Products = ({ page, products, view, setView }) => {
    return (
        <div className="products-container">
            <div className={(page === "search" ? "d-flex justify-content-between top-details align-items-start search-wrapper" : "d-flex justify-content-between top-details align-items-center")}>
                {page === "search" ?
                    <h3 className="search-for">Search Results for “Lorem Ipsum”</h3>
                    :
                    <p className="total-products">Showing 1 - 9 of 10 products</p>
                }
                <div className="d-flex align-items-center filter-view-container">
                    <div className="d-flex align-items-center sort-by">
                        <label className="sort-label">Sort by:</label>
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" id="sortByDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Strength
                            </button>
                            <div class="dropdown-menu" aria-labelledby="sortByDropdown">
                                <a class="dropdown-item" href="#">Default</a>
                                <a class="dropdown-item" href="#">Size</a>
                                <a class="dropdown-item" href="#">Strength</a>
                                <a class="dropdown-item" href="#">Price</a>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center view">
                        <label>View:</label>
                        <button
                            className={"grid-btn" + (view === "grid" ? " active" : "")}
                            onClick={() => setView('grid')}
                        ></button>
                        <button
                            className={"list-btn" + (view === "list" ? " active" : "")}
                            onClick={() => setView('list')}
                        ></button>
                    </div>
                </div>
            </div>
            <div className={"products" + (view === "list" ? " list-view" : "")}>
                <div className="list-header">
                    <div className="no-container">
                        <p>Item #</p>
                        <p>NDC</p>
                    </div>
                    <div className="name-container">
                        <p>Name</p>
                        <p>(Compare To)</p>
                    </div>
                    <p className="company">Manufacturer</p>
                    <p className="size">Size</p>
                    <p className="strength">Strength</p>
                    <div className="price-container">
                        <p>Price</p>
                        <p>(PPU)</p>
                    </div>
                    <p className="buy-container">Buy</p>
                    <div className="incart">
                        <p>In</p>
                        <p>Cart</p>
                    </div>
                </div>

                <div className="row">
                    {
                        products.map((product) => (
                            <div key={`key-${product.id}`} className={(view === "list" ? " col-12" : "col-md-4")}>
                                <div
                                    className={"product" + (product.category === "pharmacies" ? " pharma-product" : product.category === "vetirinary" ? " vet-product" : " medsurg-product")}
                                >
                                    <div className="mobile-wrapper">
                                        <div className={"mobile-list-header " + (view === "list" ? " d-flex" : "d-none")}>
                                            <div className="product-image-head"></div>
                                            <div>
                                                <p className="flex-fill list-header-name">
                                                    Name
                                                </p>
                                            </div>
                                            <div>
                                                <p className="list-header-price">
                                                    Price
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"product-details-container"}>
                                        <div className="img-container">
                                            <div>
                                                <img src={require(`../../assets/img/${product.img}`)} alt="" />
                                            </div>
                                        </div>
                                        <div className="details-container">
                                            <div className="no-container for-list">
                                                <p className="item-no">{product.item_no}</p>
                                                <p className="ndc">{product.ndc}</p>
                                            </div>
                                            <div className="name-container">
                                                <p className="name">{product.name}</p>
                                                <p className="compare for-list">({product.compare_to})</p>
                                            </div>
                                            <p className="company for-list">{product.company}</p>
                                            <p className="size for-list">{product.size}</p>
                                            <p className="strength for-list">{product.strength}</p>
                                            <div className="price-container">
                                                <p className="price">${product.price}</p>
                                                <p className="ppu for-list">({product.ppu})</p>
                                            </div>
                                            <div className="buy-container">
                                                <input className="qty for-list" type="number" min="1" placeholder="1" />
                                                <button className="cart-btn"></button>
                                            </div>
                                            <p className="incart for-list">1</p>
                                        </div>
                                        <div className={(view === "list" ? " d-block" : "d-none")}>
                                            <div className="price-wrapper">
                                                <div className="flex-fill">
                                                    <p className="price">${product.price}</p>
                                                    <p className="ppu">({product.ppu})</p>
                                                </div>
                                                <div className="buy-container">
                                                    <button className="cart-btn"></button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}