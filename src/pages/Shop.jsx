import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeaderNav } from '../components/partials/HeaderNav'
import { Footer } from '../components/partials/Footer'
import { Products } from '../components/shared/products'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProducts } from '../actions/products'

export default (props) => {
  const products = useSelector((state) => state.products)
  const [view, setView] = useState('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [dummySub, setDummySub] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const pharmaBtn = document.getElementById("pharmacy-accordion-btn")
    const animalBtn = document.getElementById("animal-accordion-btn")
    const medicalBtn = document.getElementById("medical-accordion-btn")
    const query = new URLSearchParams(props.location.search)
    const cat = query.get('category')
    if (cat) {
      if (cat === "Pharmaceuticals" && pharmaBtn.className.split(' ').length === 2) pharmaBtn.click()
      if (cat === "Animal Health AND Medical Supplies" && animalBtn.className.split(' ').length === 2) animalBtn.click()
      if (cat === "Medical Supplies" && medicalBtn.className.split(' ').length === 2) medicalBtn.click()
    } else {
      pharmaBtn.click()
    }
    window.history.replaceState({}, document.title, '/' + 'shop')
  }, [location])

  useEffect(() => {
    setIsLoading(true)
    if (category) dispatch(getProducts(null, category, dummySub))
  }, [dispatch, category, dummySub])

  useEffect(() => {
    setIsLoading(false)
  }, [products])


  return (
    <>
      <HeaderNav />
      <div className="shop-page">
        <div className="container-fluid d-flex p-0 shop-category">
          <div className="filter-col">
            <h3>Categories</h3>
            <div className="product-category">
              <select
                className="select-category form-control"
                id="categoryType"
              >
                <option>For Animal Health</option>
                <option>For Pharmacies</option>
              </select>
            </div>
            <div
              className="category-accordion accordion"
              id="categoryAccordion"
            >
              <div className="accordion-item">
                <button
                  id="pharmacy-accordion-btn"
                  className="accordion-button collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion1"
                  aria-expanded="false"
                  onClick={() => setCategory('Pharmaceuticals')}
                >
                  For Pharmacies
                </button>
                <div
                  id="accordion1"
                  className="accordion-body accordion-collapse collapse"
                  data-parent="#categoryAccordion"
                >
                  <ul>
                    <li
                      className={subCategory === 'Branded Drug' ? 'active' : ''}
                      onClick={() => setSubCategory('Branded Drug')}
                    >
                      Branded Drugs
                    </li>
                    <li
                      className={subCategory === 'COVID-19' ? 'active' : ''}
                      onClick={() => setSubCategory('COVID-19')}
                    >
                      COVID-19
                    </li>
                    <li
                      className={subCategory === 'Deal' ? 'active' : ''}
                      onClick={() => setSubCategory('Deal')}
                    >
                      Deal
                    </li>
                    <li
                      className={subCategory === 'Diabetes' ? 'active' : ''}
                      onClick={() => setSubCategory('Diabetes')}
                    >
                      Diabetes
                    </li>
                    <li
                      className={subCategory === 'Injectables' ? 'active' : ''}
                      onClick={() => setSubCategory('Injectables')}
                    >
                      Injectables
                    </li>
                    <li
                      className={subCategory === 'OTC' ? 'active' : ''}
                      onClick={() => setSubCategory('OTC')}
                    >
                      OTC
                    </li>
                    <li
                      className={subCategory === 'PPE Supplies' ? 'active' : ''}
                      onClick={() => setSubCategory('PPE Supplies')}
                    >
                      PPE Supplies
                    </li>
                    <li
                      className={subCategory === 'Short-dated' ? 'active' : ''}
                      onClick={() => setSubCategory('Short-dated')}
                    >
                      Short dated
                    </li>
                  </ul>
                </div>
              </div>
              <div className="accordion-item">
                <button
                  id="animal-accordion-btn"
                  className="accordion-button collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion2"
                  aria-expanded="false"
                  onClick={() => setCategory('Animal Health AND Medical Supplies')}
                >
                  For Animal Care
                </button>
                <div
                  id="accordion2"
                  className="accordion-body accordion-collapse collapse"
                  data-parent="#categoryAccordion"
                >
                  <ul>
                  <li
                      className={subCategory === 'Branded Drug' ? 'active' : ''}
                      onClick={() => setSubCategory('Branded Drug')}
                    >
                      Branded Drugs
                    </li>
                    <li
                      className={subCategory === 'COVID-19' ? 'active' : ''}
                      onClick={() => setSubCategory('COVID-19')}
                    >
                      COVID-19
                    </li>
                    <li
                      className={subCategory === 'Deal' ? 'active' : ''}
                      onClick={() => setSubCategory('Deal')}
                    >
                      Deal
                    </li>
                    <li
                      className={subCategory === 'Diabetes' ? 'active' : ''}
                      onClick={() => setSubCategory('Diabetes')}
                    >
                      Diabetes
                    </li>
                    <li
                      className={subCategory === 'Injectables' ? 'active' : ''}
                      onClick={() => setSubCategory('Injectables')}
                    >
                      Injectables
                    </li>
                    <li
                      className={subCategory === 'OTC' ? 'active' : ''}
                      onClick={() => setSubCategory('OTC')}
                    >
                      OTC
                    </li>
                    <li
                      className={subCategory === 'PPE Supplies' ? 'active' : ''}
                      onClick={() => setSubCategory('PPE Supplies')}
                    >
                      PPE Supplies
                    </li>
                    <li
                      className={subCategory === 'Short-dated' ? 'active' : ''}
                      onClick={() => setSubCategory('Short-dated')}
                    >
                      Short dated
                    </li>
                  </ul>
                </div>
              </div>
              <div className="accordion-item">
                <button
                  id="medical-accordion-btn"
                  className="accordion-button collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#accordion3"
                  aria-expanded="false"
                  onClick={() => setCategory('Medical Supplies')}
                >
                  For Medical/Surgical Products
                </button>
                <div
                  id="accordion3"
                  className="accordion-body accordion-collapse collapse"
                  data-parent="#categoryAccordion"
                >
                  <ul>
                  <li
                      className={subCategory === 'Branded Drug' ? 'active' : ''}
                      onClick={() => setSubCategory('Branded Drug')}
                    >
                      Branded Drugs
                    </li>
                    <li
                      className={subCategory === 'COVID-19' ? 'active' : ''}
                      onClick={() => setSubCategory('COVID-19')}
                    >
                      COVID-19
                    </li>
                    <li
                      className={subCategory === 'Deal' ? 'active' : ''}
                      onClick={() => setSubCategory('Deal')}
                    >
                      Deal
                    </li>
                    <li
                      className={subCategory === 'Diabetes' ? 'active' : ''}
                      onClick={() => setSubCategory('Diabetes')}
                    >
                      Diabetes
                    </li>
                    <li
                      className={subCategory === 'Injectables' ? 'active' : ''}
                      onClick={() => setSubCategory('Injectables')}
                    >
                      Injectables
                    </li>
                    <li
                      className={subCategory === 'OTC' ? 'active' : ''}
                      onClick={() => setSubCategory('OTC')}
                    >
                      OTC
                    </li>
                    <li
                      className={subCategory === 'PPE Supplies' ? 'active' : ''}
                      onClick={() => setSubCategory('PPE Supplies')}
                    >
                      PPE Supplies
                    </li>
                    <li
                      className={subCategory === 'Short-dated' ? 'active' : ''}
                      onClick={() => setSubCategory('Short-dated')}
                    >
                      Short dated
                    </li>
                  </ul>
                </div>
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
                    : category === 'Animal Health AND Medical Supplies'
                    ? 'Animal Health'
                    : 'Medical/Surgical Products'}
                </h3>
                <p>{subCategory}</p>
              </div>
              <div className="content">
                <div className="products-container">
                  <div
                    className={
                      'products' + (view === 'list' ? ' list-view' : '')
                    }
                  >
                    {isLoading ? (
                      <div className="spinner-container d-flex align-items-center justify-content-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <Products
                        page="shop"
                        shopFont={true}
                        view={view}
                        setView={setView}
                        products={products}
                        category={category}
                        subCategory={subCategory}
                      />
                    )}
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
