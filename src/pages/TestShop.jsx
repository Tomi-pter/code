import React, { useState } from 'react'
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';


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
            <div className="test-shop-page">
                <div className="container d-flex p-0 shop-category">
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
                                    <span>For Pharmacies (677)</span>
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
                                <span>For Animal Care (250)</span>
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
                                    <span>For Medical/Surgical Products (80)</span>
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
                                        {setDisplay()}
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