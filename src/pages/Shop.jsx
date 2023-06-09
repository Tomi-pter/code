import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeaderNav } from '../components/partials/HeaderNav'
import { Footer } from '../components/partials/Footer'
import { Products } from '../components/shared/products'
import { Helmet } from 'react-helmet';

import { NotificationBanner } from '../components/shared/warningNotification';

export default (props) => {
  const [view, setView] = useState('list');
  const [category, setCategory] = useState('');
  const auth = JSON.parse(localStorage.getItem('profile'));
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation();

  const selectedCategory = () => {
    const favBtn = document.getElementById("favorites-accordion-btn")
    const pharmaBtn = document.getElementById("pharmacy-accordion-btn")
    const animalBtn = document.getElementById("animal-accordion-btn")
    const medicalBtn = document.getElementById("medical-accordion-btn")
    const query = new URLSearchParams(props.location.search)
    const cat = query.get('category')
    if (cat && cat !== '') {
      if (cat === "Favorites" && favBtn?.className.split(' ')?.length === 2 && auth) {
        favBtn.click()
      } else {
        pharmaBtn.click()
      }
      if (cat === "Pharmaceuticals" && pharmaBtn.className.split(' ').length === 2) pharmaBtn.click()
      if (cat === "Animal Health" && animalBtn.className.split(' ').length === 2) animalBtn.click()
      if (cat === "Medical Supplies" && medicalBtn.className.split(' ').length === 2) medicalBtn.click()
    } else {
      pharmaBtn.click()
    }
  }

  useEffect(() => {
    selectedCategory()
    setIsLoading(true)
  }, [location])

  useEffect(() => {
    selectedCategory()
    setIsLoading(true)
  }, [])

  return (
    <>
      <Helmet>
        <title>Shop | Premier Pharmaceuticals</title>
      </Helmet>
      <HeaderNav />
      <div className="shop-page">
        <div className="container-fluid shop-category">
          <div className="products-col">
            <div className="content-container">
              <div className="content-category">
                <h3>
                  Products
                </h3>
              </div>
              <div className="filter-col">
                <div className="product-category">
                  <select
                    className="select-category form-control"
                    id="categoryType"
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      setCategory(selectedCategory)
                    }}
                    value={category}
                  >
                    { auth && <option value="Favorites" >My Favorites</option>}
                    <option value="Pharmaceuticals" >Pharmaceuticals</option>
                    <option
                      value="Animal Health">Animal Health</option>
                    <option
                      value="Medical Supplies">Medical/Surgical</option>
                  </select>
                </div>
                <div className="category d-flex align-items-center justify-content-between">
                  { auth &&
                    <button
                      id="favorites-accordion-btn"
                      className={'accordion-button collapsed' + (category === "Favorites" ? ' active' : '')}
                      type="button"
                      data-toggle="collapse"
                      data-target="#accordion4"
                      aria-expanded="false"
                      onClick={() => setCategory('Favorites')}
                    >
                      My Favorites
                    </button>
                  }
                    <button
                      id="pharmacy-accordion-btn"
                      className={'accordion-button collapsed' + (category === "Pharmaceuticals" ? ' active' : '')}
                      type="button"
                      data-toggle="collapse"
                      data-target="#accordion1"
                      aria-expanded="false"
                      onClick={() => setCategory('Pharmaceuticals')}
                    >
                      Pharmaceuticals
                    </button>
                    <button
                      id="animal-accordion-btn"
                      className={'accordion-button collapsed' + (category === "Animal Health" ? ' active' : '')}
                      type="button"
                      data-toggle="collapse"
                      data-target="#accordion2"
                      aria-expanded="false"
                      onClick={() => setCategory('Animal Health')}
                    >
                      Animal Health
                    </button>
                    <button
                      id="medical-accordion-btn"
                      className={'accordion-button collapsed' + (category === "Medical Supplies" ? ' active' : '')}
                      type="button"
                      data-toggle="collapse"
                      data-target="#accordion3"
                      aria-expanded="false"
                      onClick={() => setCategory('Medical Supplies')}
                    >
                      Medical/Surgical
                    </button>
                </div>
              </div>
              <div className="content">
                <NotificationBanner />
                  <div
                    className={
                      'products' + (view === 'list' ? ' list-view' : '')
                    }
                  >
                      <Products
                        page="shop"
                        shopFont={true}
                        view={view}
                        setView={setView}
                        category={category}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
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
