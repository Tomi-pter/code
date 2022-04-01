import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Button } from "react-bootstrap";

import { getFavProductsv2, requestStock } from '../../actions/products'
import { getCart, addCart } from '../../actions/cart'
import ReactPaginate from 'react-paginate';

import { Productv2 } from './productv2'

export const Productsv2 = ({ page, view, setView, name, shopFont, category, isLoading, setIsLoading }) => {
  const auth = JSON.parse(localStorage.getItem('profile'))
  const productsData = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sorting, setSorting] = useState({filter: 'name', order: 'ASC', sortBy: 'A-Z'})
  const [stockSort, setStockSort] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 10
  const numPages = Math.ceil(filteredProducts.length / productPerPage)
  let totalInPage = currentPage * productPerPage
  let startCount = 1
  if (currentPage > 1) startCount = (currentPage - 1) * productPerPage + 1
  if (currentPage === numPages) totalInPage = filteredProducts.length

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [search, setSearch] = useState('')
  const [showModal, setShow] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)

  const filterProducts = () => {
      let sorted, filtered
      const { filter, order } = sorting

      category === 'Favorites' && page === 'shop' ?
        search !== '' ? 
          filtered = productsData.favproductv2.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.ndc.toLowerCase().includes(search.toLowerCase())) 
          : 
          filtered = productsData.favproductv2
      :
      page === 'shop' ? 
        filtered = productsData.productsv2.filter(product => product.category.includes(category)) 
        : 
        filtered = productsData.productsv2.filter(product => product.name.toLowerCase().includes(name.toLowerCase()) || product.ndc.toLowerCase().includes(name.toLowerCase()))
      
      order === 'ASC' ?
      sorted = filtered.sort(function(a, b) { return (a[filter] > b[filter] ? 1 : (a[filter] === b[filter] ? 0 : -1)) })
      :
      sorted = filtered.sort(function(a, b) { return (a[filter] > b[filter] ? -1 : (a[filter] === b[filter] ? 0 : 1)) })
      
      if(stockSort) sorted = sorted.filter(product => product.totalquantityonhand > 0).concat(sorted.filter(product => product.totalquantityonhand === 0))  
      
      for(let i=0; i <= productsData.favproductv2.length; i++) {
        let favProd = productsData.favproductv2[i]
        let prodIndex = sorted.findIndex(prod => prod?.id  === favProd?.id);
        
        if (prodIndex !== -1) {
          sorted.splice(prodIndex, 1, {...sorted[prodIndex], favorite: true, cost: favProd.cost});
        }
      }

      setFilteredProducts(sorted)
      setIsLoading(false)
  }

  const renderPage = () => {
      let rows = []
      for(let i = (currentPage - 1) * productPerPage; i < (currentPage * productPerPage) && i < filteredProducts.length; i++) {
        let product = filteredProducts[i]
        rows.push(
            <Productv2
              shopFont={shopFont}
              view={view}
              key={product.id}
              product={product}
              addCart={handleAddCart}
              requestStock={handleRequestStock}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              isLoading={isLoading}
              isCartLoading={isCartLoading}
              requestLoading={requestLoading}
              quantity={quantity}
              setQuantity={setQuantity}
              cart={cart}
              category={product.category || ''}
              selectedCategory={category}
              sortBy={sorting.sortBy}
            />
          )
      }
      return rows
  }

  const handleAddCart = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const newProduct = {
      product: {
        productId: parseInt(product.id),
        productName: product.name,
        price: parseFloat(product.cost),
        imageUrl: product.url,
        quantity,
        ndc: product.ndc
      },
    }
    setIsCartLoading(true)
    setSelectedProduct(product)
    dispatch(addCart(user?.username, newProduct))
  }

  const handleSortCheck = (e) => {
    let value = e.target.checked
    setStockSort(value)
  }

  const handlePageClick = (data) => {
    window.scrollTo({top: 300, behavior: 'smooth'})
    let increment = data.selected + 1;
    setCurrentPage(increment)
  }

  const handleSearchFav = (e) => {
    const searchNDC = e.target.value.replaceAll("-", "");
    setSearch(searchNDC)
  }

  const handleRequestStock = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const formData = {
      ndc: product.ndc,
      productName: product.name
    }
    setRequestLoading(true)
    setSelectedProduct(product)
    dispatch(requestStock(user?.username, formData))
  }

  useEffect(() => {
      const { productsv2, favproductv2 } = productsData
      setCurrentPage(1)
      productsv2 && favproductv2 && filterProducts()
      if (requestLoading) {
        setShow(true)
      }
      setRequestLoading(false)
  }, [productsData, category, sorting, stockSort, search])

  useEffect(() => {
    setQuantity(1)
    setSelectedProduct(null)
    setIsLoading(false)
  }, [cart])

  useEffect(() => {
      // dispatch(getFavProductsv2(auth?.username))
      dispatch(getCart(auth?.username))
  }, [])

  return (
    <div className="products-container">
      <div
        className={
          page === 'search'
            ? 'd-flex justify-content-between top-details align-items-start search-wrapper'
            : 'd-flex justify-content-between top-details align-items-center'
        }
      >
        {page === 'search' ? (
          <h3 className="search-for">Search Results for <q>{name}</q></h3>
        ) : (
          <p className="total-products">{ isLoading ? 'Showing...' : filteredProducts.length === 0 ? '' : `Showing ${startCount} - ${totalInPage} of ${filteredProducts.length} products`}</p>
        )}
        <div className="d-flex align-items-center filter-view-container">
          <div className="d-flex align-items-center sort-by">
            <label className="sort-label">Sort by:</label>
            <div className="dropdown">
              <button
                className="dropdown-toggle "
                type="button"
                id="sortByDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {sorting.sortBy}
              </button>
              <div className="dropdown-menu" aria-labelledby="sortByDropdown">
                <span className="dropdown-item" onClick={() => setSorting({filter: 'name', order: 'ASC', sortBy: 'A-Z'})}>
                  A - Z
                </span>
                <span className="dropdown-item" onClick={() => setSorting({filter: 'name', order: 'DESC', sortBy: 'Z-A'})}>
                  Z - A
                </span>

                <span className="dropdown-item" onClick={() => setSorting({filter: 'cost', order: 'ASC', sortBy: '$ Low - High'})}>
                $ Low - High
                </span>
                <span className="dropdown-item" onClick={() => setSorting({filter: 'cost', order: 'DESC', sortBy: '$ High - Low'})}>
                $ High - Low
                </span>
                <hr/>
                <div className="flex align-items-center dropdown-item">
                  <input className="mr-2" type="checkbox" id="sortStock" name="sortStock" defaultChecked={stockSort} onChange={handleSortCheck} />
                  <label className="mb-0" for="sortStock"> Stock</label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center view">
            <label>View:</label>
            <button
              className={'grid-btn' + (view === 'grid' ? ' active' : '')}
              onClick={() => setView('grid')}
            ></button>
            <button
              className={'list-btn' + (view === 'list' ? ' active' : '')}
              onClick={() => setView('list')}
            ></button>
          </div>
          {
            page === 'shop' && category === 'Favorites' &&
            <div className="search-container">
              <input type="text" placeholder="Search Favorite Product..." onChange={handleSearchFav} />
            </div>
          }
        </div>
      </div>
      <div className={'products' + (view === 'list' ? ' list-view' : '')}>
        <div className="list-header">
          <div className="no-container">
            <p>Item #</p>
            <p>NDC</p>
          </div>
          <div className="name-container">
            <p>Name</p>
          </div>
          <p className="company">Manufacturer</p>
          <p className="size">Size</p>
          <p className="strength">Strength</p>
          <div className="price-container" style={{minWidth: category !== 'Favorites' && '100px'}}>
            <p>Price</p>
          </div>
          <p className={'buy' + (!auth ? ' buy-offline' : ' buy-online')} style={!auth ? { minWidth: '90px' } : { minWidth: '145px' }}>Buy</p>
          <div className={'incart' + (!auth ? ' d-none' : ' d-block')}>
            <p>In</p>
            <p>Cart</p>
          </div>
        </div>
        <div className="row">
          {isLoading ?
            <div className="container-fluid">
              <div className="spinner-container d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            :
            filteredProducts.length === 0  ?
              <div className="col-12 d-flex align-items-center justify-content-center text-center">
                No Product
              </div>
            :
              renderPage()
          }
        </div>
      </div>
      <div className="pagination-products">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={numPages}
          onPageChange={handlePageClick}
          containerClassName={(filteredProducts.length <= productPerPage || isLoading) ? 'pagination empty' : 'pagination'}
          activeClassName={'active'}
          forcePage={parseInt(currentPage) - 1}
        />
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{productsData.requestStockSuccess ? 'Request Sent' : 'Request Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsData.requestStockSuccess ? 'Thanks! A Sales Representative will be in touch with you shortly.' : 'Customer does not have a sales rep assigned.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}