import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';

export default props => {
    const products = useSelector((state) => state.products);
    const [view, setView] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const query = new URLSearchParams(props.location.search);
    const [queryCategory, setQueryCategory] = useState(query.get('category') || "Pharmacy");
    const [category, setCategory] =  useState(queryCategory);
    const [subCategory, setSubCategory] =  useState("Short-dated");
    const location = useLocation();
    const dispatch = useDispatch();

    const changeCategory = (cat) => {
        if (queryCategory !== "") window.history.replaceState({}, document.title, "/" + "shop");
        setQueryCategory("");
        setCategory(cat);
    }

    useEffect(() => {
        setIsLoading(true);
        dispatch(getProducts(null, category, subCategory));
    }, [dispatch, category, subCategory]);

    useEffect(() => {
        setIsLoading(false);
    }, [products]);

    useEffect(() => {
        const cat = query.get('category')
        setQueryCategory(cat);
        setCategory(cat)
    }, [location]);


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
                        <div className="category-accordion accordion" id="categoryAccordion">
                            <div className="accordion-item">
                                <button 
                                    className={"accordion-button " + (queryCategory === "Pharmacy" ? "" : "collapsed")} 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#accordion1" 
                                    aria-expanded="false"
                                    onClick={()=>changeCategory("Pharmacy")}
                                >
                                    For Pharmacies
                                </button>
                                <div id="accordion1" className={"accordion-body accordion-collapse collapse " + (queryCategory === "Pharmacy" ? "show" : "")} data-parent="#categoryAccordion">
                                    <ul>
                                        <li className={subCategory === "Short-dated" ? "active" : ""} onClick={()=>setSubCategory("Short-dated")}>Short dated</li>
                                        <li className={subCategory === "Branded Drugs" ? "active" : ""} onClick={()=>setSubCategory("Branded Drugs")}>Branded Drugs</li>
                                        <li className={subCategory === "Deal" ? "active" : ""} onClick={()=>setSubCategory("Deal")}>Deal</li>
                                        <li className={subCategory === "PPE Supplies" ? "active" : ""} onClick={()=>setSubCategory("PPE Supplies")}>PPE Supplies</li>
                                        <li className={subCategory === "Injectables" ? "active" : ""} onClick={()=>setSubCategory("Injectables")}>Injectables</li>
                                        <li className={subCategory === "COVID-19" ? "active" : ""} onClick={()=>setSubCategory("COVID-19")}>COVID-19</li>
                                        <li className={subCategory === "OTC" ? "active" : ""} onClick={()=>setSubCategory("OTC")}>OTC</li>
                                        <li className={subCategory === "Diabetes" ? "active" : ""} onClick={()=>setSubCategory("Diabetes")}>Diabetes</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button className={"accordion-button " + (queryCategory === "Animal Care" ? "" : "collapsed")} type="button" data-toggle="collapse" data-target="#accordion2" aria-expanded="false" onClick={()=>changeCategory("Animal Care")}>
                                    For Animal Care
                                </button>
                                <div id="accordion2" className={"accordion-body accordion-collapse collapse " + (queryCategory === "Animal Care" ? "show" : "")} data-parent="#categoryAccordion">
                                    <ul>
                                        <li className={subCategory === "Short-dated" ? "active" : ""} onClick={()=>setSubCategory("Short-dated")}>Short dated</li>
                                        <li className={subCategory === "Branded Drugs" ? "active" : ""} onClick={()=>setSubCategory("Branded Drugs")}>Branded Drugs</li>
                                        <li className={subCategory === "Deal" ? "active" : ""} onClick={()=>setSubCategory("Deal")}>Deal</li>
                                        <li className={subCategory === "PPE Supplies" ? "active" : ""} onClick={()=>setSubCategory("PPE Supplies")}>PPE Supplies</li>
                                        <li className={subCategory === "Injectables" ? "active" : ""} onClick={()=>setSubCategory("Injectables")}>Injectables</li>
                                        <li className={subCategory === "COVID-19" ? "active" : ""} onClick={()=>setSubCategory("COVID-19")}>COVID-19</li>
                                        <li className={subCategory === "OTC" ? "active" : ""} onClick={()=>setSubCategory("OTC")}>OTC</li>
                                        <li className={subCategory === "Diabetes" ? "active" : ""} onClick={()=>setSubCategory("Diabetes")}>Diabetes</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button className={"accordion-button " + (queryCategory === "Medical" ? "" : "collapsed")} type="button" data-toggle="collapse" data-target="#accordion3" aria-expanded="false" onClick={()=>changeCategory("Medical")}>
                                    For Medical/Surgical Products
                                </button>
                                <div id="accordion3" className={"accordion-body accordion-collapse collapse " + (queryCategory === "Medical" ? "show" : "")} data-parent="#categoryAccordion">
                                    <ul>
                                        <li className={subCategory === "Short-dated" ? "active" : ""} onClick={()=>setSubCategory("Short-dated")}>Short dated</li>
                                        <li className={subCategory === "Branded Drugs" ? "active" : ""} onClick={()=>setSubCategory("Branded Drugs")}>Branded Drugs</li>
                                        <li className={subCategory === "Deal" ? "active" : ""} onClick={()=>setSubCategory("Deal")}>Deal</li>
                                        <li className={subCategory === "PPE Supplies" ? "active" : ""} onClick={()=>setSubCategory("PPE Supplies")}>PPE Supplies</li>
                                        <li className={subCategory === "Injectables" ? "active" : ""} onClick={()=>setSubCategory("Injectables")}>Injectables</li>
                                        <li className={subCategory === "COVID-19" ? "active" : ""} onClick={()=>setSubCategory("COVID-19")}>COVID-19</li>
                                        <li className={subCategory === "OTC" ? "active" : ""} onClick={()=>setSubCategory("OTC")}>OTC</li>
                                        <li className={subCategory === "Diabetes" ? "active" : ""} onClick={()=>setSubCategory("Diabetes")}>Diabetes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-col">
                        <div className="content-container">
                            <div className="content-category">
                                <h3>For {category === "Pharmacy" ? "Pharmacies" : category === "Animal Care" ? "Animal Health" : "Medical/Surgical Products"}</h3>
                                <p>{subCategory}</p>
                            </div>
                            <div className="content">
                                <div className="products-container">
                                    <div className={"products" + (view === "list" ? " list-view" : "")}>
                                        {isLoading ? 
                                            <div className="spinner-container d-flex align-items-center justify-content-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                            :
                                            <Products
                                                page="shop"
                                                view={view}
                                                setView={setView}
                                                products={products}
                                            />
                                        }
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