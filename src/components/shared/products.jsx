import React, { useState, useEffect } from 'react'
import { Product } from './product'
import { useDispatch } from 'react-redux'
import { getCart, addCart } from '../../actions/cart'
import { useSelector } from 'react-redux'
import { getProducts } from '../../actions/products'
import ReactPaginate from 'react-paginate';

export const Products = ({ page, products, view, setView, name, shopFont, category }) => {
  const cart = useSelector((state) => state.cart)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const totalPageCount = Math.ceil(products.count / 10);
  const totalProduct = products.count;

  // const totalInPage = pageNumber === totalPageCount ? (totalProduct % 10 === 0 ? 10 : totalProduct % 10) : 10;
  var totalInPage = pageNumber * 10;
  var startCount = 1;
  if (pageNumber > 1)
    startCount = (pageNumber - 1) * 10 + 1;
  if (pageNumber === totalPageCount)
    totalInPage = totalProduct;

  const handleAddCart = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const newProduct = {
      product: {
        productId: parseInt(product.id),
        productName: product.name,
        price: parseFloat(product.purchasePrice),
        quantity,
      },
    }
    setSelectedProduct(product)
    setIsLoading(true)
    dispatch(addCart(user?.username, newProduct))
  }
  const handlePageClick = (data) => {
    setIsLoading(true)
    window.scrollTo(0, 0)
    var increment = data.selected + 1;
    setPageNumber(increment);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    dispatch(getProducts(name, category, sortBy, pageNumber))

  }, [pageNumber, sortBy])


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'))
    dispatch(getCart(user?.username))
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      setQuantity(1)
      setSelectedProduct(null)
      setIsLoading(false)
    }, 1000)
  }, [cart])
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
          <p className="total-products">Showing {startCount} - {totalInPage} of {totalProduct} products</p>
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
                {sortBy === null || sortBy === "" ? (
                  <> Default </>
                ) : (
                  <>{sortBy}</>
                )}
              </button>
              <div className="dropdown-menu" aria-labelledby="sortByDropdown">
                <span className="dropdown-item" onClick={() => setSortBy('')}>
                  Default
                </span>
                {/* <a className="dropdown-item"  onClick={() => setSortBy('size')}>
                  Size
                </a>
                <a className="dropdown-item"  onClick={() => setSortBy('strength')}>
                  Strength
                </a> */}
                <span className="dropdown-item" onClick={() => setSortBy('price')}>
                  Price
                </span>
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
        </div>
      </div>
      <div className={'products' + (view === 'list' ? ' list-view' : '')}>
        <div className="list-header">
          {/* <p>Fav.</p> */}

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
          {/* <p className="strength">Strength</p> */}
          <div className="price-container">
            <p>Price</p>
            <p>(PPU)</p>
          </div>
          {/* <p className="buy-container"> */}
          <p className={'buy' + (!user ? ' buy-offline' : ' buy-online')} style={!user ? { minWidth: '90px' } : { minWidth: '145px' }}>Buy</p>
          <div className={'incart' + (!user ? ' d-none' : ' d-block')}>
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
          {isLoading ?
            <div className="container-fluid">
              <div className="spinner-container d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            :
            typeof (products.products) != "undefined" ? products.products.map((product) => (
              <Product
                shopFont={shopFont}
                view={view}
                key={product.id}
                product={product}
                addCart={handleAddCart}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                isLoading={isLoading}
                quantity={quantity}
                setQuantity={setQuantity}
                cart={cart}
                category={product.customFields ? product.customFields[15] ? product.customFields[15].value : "" : ""}

                sortBy={sortBy}
              />
            )) : ''}
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
          containerClassName={'pagination'}
          activeClassName={'active'}
          initialPage={0}

        />
      </div>
    </div>
  )
}
