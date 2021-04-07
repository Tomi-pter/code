import React, { useState } from 'react'
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';
import Product from './Product';
import { ProductConsumer } from '../context';

export default props => {
    const [view, setView] = useState('grid');
    const [products, setProducts] = useState([
        {
            id: "1A",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "pharmacies"
        },
        {
            id: "2B",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "vetirinary"
        },
        {
            id: "3C",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "surgical"
        }
    ]);

    const setDisplay = () => {
        return (
            <Products
                page="shop"
                view={view}
                setView={setView}
                products={products}
            />
        )
    }

    return (
        <>
            <HeaderNav />
            <div className="shop-page">
                <div className="container-fluid d-flex p-0 shop-category">
                    <div className="filter-col">
                        <h3>Categories</h3>
                        <div className="d-block d-lg-none">
                            <select class="select-category form-control" id="categoryType">
                                <option>For Animal Health</option>
                                <option>For Pharmacies</option>
                            </select>

                        </div>
                        <div class="category-accordion accordion">
                            <div className="accordion-item">
                                <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#accordion1" aria-expanded="false">
                                    For Pharmacies (677)
                                    </button>
                                <div id="accordion1" className="accordion-body accordion-collapse collapse">
                                    <ul>
                                        <li className="active">Short dated (10)</li>
                                        <li>Branded Drugs (9)</li>
                                        <li>Deals (5)</li>
                                        <li>PPE Supplies (15)</li>
                                        <li>Injectables (18)</li>
                                        <li>COVID-19 (4)</li>
                                        <li>OTC (3)</li>
                                        <li>Diabetes (8)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#accordion2" aria-expanded="false">
                                    For Animal Care (250)
                                    </button>
                                <div id="accordion2" className="accordion-body accordion-collapse collapse">
                                    <ul>
                                        <li className="active">Short dated (10)</li>
                                        <li>Branded Drugs (9)</li>
                                        <li>Deals (5)</li>
                                        <li>PPE Supplies (15)</li>
                                        <li>Injectables (18)</li>
                                        <li>COVID-19 (4)</li>
                                        <li>OTC (3)</li>
                                        <li>Diabetes (8)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#accordion3" aria-expanded="false">
                                    For Medical/Surgical Products (80)
                                    </button>
                                <div id="accordion3" className="accordion-body accordion-collapse collapse">
                                    <ul>
                                        <li className="active">Short dated (10)</li>
                                        <li>Branded Drugs (9)</li>
                                        <li>Deals (5)</li>
                                        <li>PPE Supplies (15)</li>
                                        <li>Injectables (18)</li>
                                        <li>COVID-19 (4)</li>
                                        <li>OTC (3)</li>
                                        <li>Diabetes (8)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-col">
                        <div className="content-container">
                            <div className="content-category">
                                <h3>For Animal Health</h3>
                                <p>Short dated</p>
                            </div>
                            <div className="content">
                                <div className="products-container">
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
                                            
                                            <ProductConsumer>
                                                {(value) => {
                                                    return value.products.map(product => {
                                                        return <Product key={product.id} product={product} />
                                                    });
                                                }}
                                            </ProductConsumer>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}