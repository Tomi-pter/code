import React, { useState, useEffect } from 'react'
import { Product } from './product'
import { useDispatch } from 'react-redux'
import { getCart, addCart } from '../../actions/cart'
// import { getCustomProducts } from '../../actions/admin'
import { useSelector } from 'react-redux'
import { getProducts, getFavoriteProducts, requestStock, getRequestPrice } from '../../actions/products'
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router';
import { Modal, Button } from "react-bootstrap";

export const Products = ({ page, view, setView, name, shopFont, category, isLoading, setIsLoading }) => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart)
  const admin = useSelector((state) => state.admin);
  const [customProducts, setCustomProducts] = useState(null);
  const [requestedProductPrice, setRequestedProductPrice] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [sortBy, setSortBy] = useState('A-Z')
  const [filter, setFilter] = useState('name')
  const [order, setOrder] = useState('ASC')
  const [pageNumber, setPageNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [sortStock, setSortStock] = useState(true)
  const [search, setSearch] = useState('');
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const totalPageCount = Math.ceil(products?.count / 12);
  const [totalProduct, setTotalProduct] = useState(0);
  const staging = process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
  const location = useLocation();

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // const totalInPage = pageNumber === totalPageCount ? (totalProduct % 10 === 0 ? 10 : totalProduct % 10) : 10;
  var totalInPage = pageNumber * 12;
  var startCount = 1;
  if (pageNumber > 1)
    startCount = (pageNumber - 1) * 12 + 1;
  if (pageNumber === totalPageCount)
    totalInPage = totalProduct;

  const handleAddCart = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const newProduct = {
      product: {
        productId: parseInt(product.id),
        productName: product.displayname,
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

  const setSorting = (filter, order, value) => {
    setIsLoading(true)
    setFilter(filter);
    setOrder(order);
    if (category === 'Favorites') {
      dispatch(getFavoriteProducts(user?.username, null, filter, order, null, sortStock))
    } else {
      if (page === 'search') {
        dispatch(getProducts(name, null, filter, order, null, sortStock))
      } else {
        dispatch(getProducts(null, category, filter, order, null, sortStock))
      }
    }
    // dispatch(getProducts(null, category, filter, order, null));
    setSortBy(value);
  }

  const handleSortCheck = (e) => {
    let value = e.target.checked || null
    setIsLoading(true)
    if (category === 'Favorites') {
      dispatch(getFavoriteProducts(user?.username, null, filter, order, null, value))
    } else {
      if (page === 'search') {
        dispatch(getProducts(name, null, filter, order, null, value))
      } else {
        dispatch(getProducts(null, category, filter, order, null, value))
      }
    }
    setSortStock(value)
  }

  const handlePageClick = (data) => {
    setIsLoading(true)
    window.scrollTo({top: 300,
      behavior: 'smooth'})
    var increment = data.selected + 1;
    setPageNumber(increment);

    if ((category !== '' && page === 'shop') || (page === 'search')) {
      if (category === 'Favorites') {
        dispatch(getFavoriteProducts(user?.username, null, filter, order, increment, sortStock))
      } else {
        dispatch(getProducts(name, category, filter, order, increment, sortStock))
      }
    }
  };

  const handleSearchFav = (e) => {
    setIsLoading(true)
    const searchNDC = e.target.value.replaceAll("-", "");
    setSearch(searchNDC)
  };

  useEffect(() => {
    let changeTimer;
    if (search !== "" && isLoading) {
        changeTimer = setTimeout(() => {
          dispatch(getFavoriteProducts(user?.username, search, filter, order, 1, sortStock))
      }, 1000)
    }
    if (search === "" && isLoading) {
      changeTimer = setTimeout(() => {
        dispatch(getFavoriteProducts(user?.username, null, filter, order, 1, sortStock))
    }, 1000)
    }

    return () => {
        clearTimeout(changeTimer)
    }
}, [search])

  const handleRequestStock = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const formData = {
      ndc: product.ndc,
      productName: product.displayname
    }
    setRequestLoading(true)
    setSelectedProduct(product)
    dispatch(requestStock(user?.username, formData))
  }

  useEffect(() => {
      if (category === 'Favorites') {
        setCustomProducts(products?.products);
      } else {
        if (products?.products?.length > 0 && admin?.customProducts) {
            const productsWithCustomPrice = products?.products.map(prod => {
                if (admin.customProducts[prod.id]) {
                    prod.cost = admin.customProducts[prod.id];
                    prod.favorite = true
                }

                return { ...prod }
            })

            setCustomProducts(productsWithCustomPrice);
        } else {
            setCustomProducts(products?.products);
        }
      }
      setTotalProduct(products?.count)

      if (products.requestedProductPrice) {
        setRequestedProductPrice(products.requestedProductPrice)
      }

      if (requestLoading) {
        setShow(true)
      }

      setIsLoading(false)
      setRequestLoading(false)
  }, [products, admin]);

  useEffect(() => {
    setQuantity(1)
    setSelectedProduct(null)
    setIsLoading(false)
  }, [cart])

  useEffect(() => {
    setIsLoading(true)
    setCustomProducts(null)
    setTotalProduct(0)
    setPageNumber(1)
    if (category !== '' && page === 'shop') {
      if (category === 'Favorites') {
        dispatch(getFavoriteProducts(user?.username, null, filter, order, 1, sortStock))
      } else {
        dispatch(getProducts(name, category, filter, order, 1, sortStock))
      }
    }
  }, [category])

  useEffect(() => {
    setIsLoading(true)
    if (page === 'search') dispatch(getProducts(name, null, filter, order, 1, sortStock))
  }, [name])

  useEffect(() => {
    setIsLoading(true)
    setCustomProducts(null)
    const user = JSON.parse(localStorage.getItem('profile'))
    dispatch(getCart(user?.username))
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
          <p className="total-products">{ (isLoading || !totalProduct) ? 'Showing...' : totalProduct === 0 ? '' : `Showing ${startCount} - ${totalInPage} of ${totalProduct} products`}</p>
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
                {sortBy}
              </button>
              <div className="dropdown-menu" aria-labelledby="sortByDropdown">
                <span className="dropdown-item" onClick={() => {setSorting('name', 'ASC', 'A-Z')}}>
                  A - Z
                </span>
                <span className="dropdown-item" onClick={() => {setSorting('name', 'DESC', 'Z-A')}}>
                  Z - A
                </span>

                <span className="dropdown-item" onClick={() => {setSorting('price', 'ASC', '$ Low - High')}}>
                $ Low - High
                </span>
                <span className="dropdown-item" onClick={() => {setSorting('price', 'DESC', '$ High - Low')}}>
                $ High - Low
                </span>
                <hr/>
                <div className="flex align-items-center dropdown-item">
                  <input className="mr-2" type="checkbox" id="sortStock" name="sortStock" defaultChecked={sortStock} onChange={handleSortCheck} />
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
          <p className={'buy' + (!user ? ' buy-offline' : ' buy-online')} style={!user ? { minWidth: '90px' } : { minWidth: '145px' }}>Buy</p>
          <div className={'incart' + (!user ? ' d-none' : ' d-block')}>
            <p>In</p>
            <p>Cart</p>
          </div>
        </div>
        <div className="row">
          {(isLoading || !customProducts) ?
            <div className="container-fluid">
              <div className="spinner-container d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            :
            totalProduct === 0  ?
              <div className="col-12 d-flex align-items-center justify-content-center text-center">
                No Product
              </div>
            :
              customProducts?.map((product) => (
                <Product
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
                  requestedProductPrice={requestedProductPrice}
                  requestLoading={requestLoading}
                  requestSent={requestSent}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  cart={cart}
                  category={product.category || ''}
                  selectedCategory={category}
                  sortBy={sortBy}
                />
              ))
          }
        </div>
      </div>
      <div className="pagination-products">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPageCount}
          onPageChange={handlePageClick}
          containerClassName={(totalProduct === 0 || isLoading) ? 'pagination empty' : 'pagination'}
          activeClassName={'active'}
          // initialPage={0}
          forcePage={parseInt(pageNumber) - 1}
        />
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{products.requestStockSuccess ? 'Request Sent' : 'Request Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.requestStockSuccess ? 'Thanks! A Sales Representative will be in touch with you shortly.' : 'Customer does not have a sales rep assigned.'}
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
