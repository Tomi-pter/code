import React from 'react';
import { Product } from './product';
// import Product from '../../pages/Product'
// import { ProductConsumer } from '../../context';
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
                        <div className="dropdown">
                            <button className="dropdown-toggle" type="button" id="sortByDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Strength
                            </button>
                            <div className="dropdown-menu" aria-labelledby="sortByDropdown">
                                <a className="dropdown-item" href="#">Default</a>
                                <a className="dropdown-item" href="#">Size</a>
                                <a className="dropdown-item" href="#">Strength</a>
                                <a className="dropdown-item" href="#">Price</a>
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
                    {/* <ProductConsumer>
                        {(value) => {
                            return value.products.map(product => {
                                return <Product view={view} key={product.id} product={product} />
                            });
                        }}
                    </ProductConsumer> */}
                    {   
                        products.map(product => (
                            <Product 
                                view={view} 
                                key={product.id} 
                                product={product} 
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}