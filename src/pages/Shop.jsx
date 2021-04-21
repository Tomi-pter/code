import React, { useState, useEffect } from 'react'
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';

export default props => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [view, setView] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <HeaderNav />
            <div className="shop-page">
                <div className="container-fluid d-flex p-0 shop-category">
                    <div className="filter-col">
                        <h3>Categories</h3>
                        <div className="d-block d-lg-none">
                            <select className="select-category form-control" id="categoryType">
                                <option>For Animal Health</option>
                                <option>For Pharmacies</option>
                            </select>
                        </div>
                        <div className="category-accordion accordion">
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
                                        <Products
                                            page="shop"
                                            view={view}
                                            setView={setView}
                                            products={products}
                                        />
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