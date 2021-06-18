import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeaderNav } from '../components/partials/HeaderNav'
import { Footer } from '../components/partials/Footer'
import { Products } from '../components/shared/products'
import { Helmet } from 'react-helmet';

// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { getProducts } from '../actions/products'

export default (props) => {
  // const products = useSelector((state) => state.products)
  const [view, setView] = useState('list');
  // const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState('')
  const location = useLocation()
  // const dispatch = useDispatch()

  useEffect(() => {
    const pharmaBtn = document.getElementById("pharmacy-accordion-btn")
    const animalBtn = document.getElementById("animal-accordion-btn")
    const medicalBtn = document.getElementById("medical-accordion-btn")
    const query = new URLSearchParams(props.location.search)
    const cat = query.get('category')
    if (cat) {
      if (cat === "Pharmaceuticals" && pharmaBtn.className.split(' ').length === 2) pharmaBtn.click()
      if (cat === "Animal Health" && animalBtn.className.split(' ').length === 2) animalBtn.click()
      if (cat === "Medical Supplies" && medicalBtn.className.split(' ').length === 2) medicalBtn.click()
    } else {
      pharmaBtn.click()
    }
    window.history.replaceState({}, document.title, '/' + 'shop')
  }, [location])

  // useEffect(() => {
  //   setIsLoading(true)
  //   dispatch(getProducts(null, category))
  // }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Shop | Premier Pharmaceuticals</title>
      </Helmet>
      <HeaderNav />
      <div className="shop-page">
        <div className="container-fluid d-flex p-0 shop-category">
          <div className="filter-col">
            <h3>Categories</h3>
            <div className="product-category">
              <select
                className="select-category form-control"
                id="categoryType"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setCategory(selectedCategory)
                }}
              >
                <option value="Pharmaceuticals" >Pharmacies</option>
                <option
                  value="Animal Health">Animal Health</option>
                <option
                  value="Medical Supplies">Medical/Surgical Products</option>
              </select>
            </div>
            <div
              className="category-accordion accordion"
              id="categoryAccordion"
            >
              <div className="accordion-item">
                <button
                  id="pharmacy-accordion-btn"
                  className={'accordion-button collapsed' + (category === "Pharmaceuticals" ? ' active' : '')}
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion1"
                  aria-expanded="false"
                  onClick={() => setCategory('Pharmaceuticals')}
                >
                  Pharmacies
                </button>
               
              </div>
              <div className="accordion-item">
                <button
                  id="animal-accordion-btn"
                 className={'accordion-button collapsed' + (category === "Animal Health" ? ' active' : '')}
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion2"
                  aria-expanded="false"
                  onClick={() => setCategory('Animal Health')}
                >
                  Animal Care
                </button>
              
              </div>
              <div className="accordion-item">
                <button
                  id="medical-accordion-btn"
                 className={'accordion-button collapsed' + (category === "Medical Supplies" ? ' active' : '')}
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion3"
                  aria-expanded="false"
                  onClick={() => setCategory('Medical Supplies')}
                >
                  Medical/Surgical Products
                </button>
               
              </div>
            </div>
          </div>
          <div className="products-col">
            <div className="content-container">
              <div className="content-category">
                <h3>
                  For{' '}
                  {category === 'Pharmaceuticals'
                    ? 'Pharmacies'
                    : category === 'Animal Health'
                      ? 'Animal Health'
                      : 'Medical/Surgical Products'}
                </h3>
            
              </div>
              <div className="content">
                <div className="products-container">
                  <div
                    className={
                      'products' + (view === 'list' ? ' list-view' : '')
                    }
                  >
                    {/* {isLoading ? (
                      <div className="spinner-container d-flex align-items-center justify-content-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : ( */}
                      <Products
                        page="shop"
                        shopFont={true}
                        view={view}
                        setView={setView}
                        // products={products}
                        category={category}
                      />
                    {/* )} */}
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
