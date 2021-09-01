import React, { useState, useEffect } from 'react'
import { Product } from './product'
import { useDispatch } from 'react-redux'
import { getCart, addCart } from '../../actions/cart'
import { getCustomProducts } from '../../actions/admin'
import { useSelector } from 'react-redux'
import { getProducts } from '../../actions/products'
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router'

export const Products = ({ page, view, setView, name, shopFont, category }) => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart)
  const admin = useSelector((state) => state.admin);
  const [customProducts, setCustomProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const [filter, setFilter] = useState(null)
  const [order, setOrder] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const totalPageCount = Math.ceil(products.count / 12);
  const totalProduct = products.count;
  const staging = process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
  const location = useLocation();

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
        productName: product.name,
        price: parseFloat(product.purchasePrice),
        imageUrl: product.url,
        quantity,
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
    dispatch(getProducts(null, category, filter, order, null));
    setSortBy(value);
  }

  const handlePageClick = (data) => {
    setIsLoading(true)
    window.scrollTo(0, 0)
    var increment = data.selected + 1;
    setPageNumber(increment);
  };

  useEffect(() => {
      if (products?.products?.length > 0 && admin?.customProducts?.length > 0) {
          const customProductLookup = admin.customProducts.reduce((prods, prod) => {
               prods[prod.productId] = prod;

               return prods;
           }, {});

           const productsWithCustomPrice = products.products.map(prod => {
               if (customProductLookup[prod.id] !== undefined) {
                   prod.purchasePrice = customProductLookup[prod.id].price;
               }

               return { ...prod }
           })

           setCustomProducts(productsWithCustomPrice);
      }
      else {
          setCustomProducts(products.products);
      }
  }, [products, admin]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    if ((category !== '' && page === 'shop') || (page === 'search')) dispatch(getProducts(name, category, filter, order, pageNumber))
  }, [pageNumber, filter, order])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'))
    dispatch(getCart(user?.username))
    dispatch(getCustomProducts(user?.username))
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      setQuantity(1)
      setSelectedProduct(null)
      setIsLoading(false)
    }, 1000)
  }, [cart])

  useEffect(() => {
    setIsLoading(true)
    if (category !== '' && page === 'shop') dispatch(getProducts(null, category))
  }, [category])

  useEffect(() => {
    setIsLoading(true)
    if (page === 'search') dispatch(getProducts(name))
  }, [name])

  useEffect(() => {
    setIsLoading(false)
  }, [products])

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
                  <>A-Z </>
                ) : (
                  <>{sortBy}</>
                )}
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
                {/* <a className="dropdown-item"  onClick={() => setSortBy('size')}>
                  Size
                </a>
                <a className="dropdown-item"  onClick={() => setSortBy('strength')}>
                  Strength
                </a> */}
                {/* <span className="dropdown-item" onClick={() => setSortBy('price')}>
                  Price
                </span> */}
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
          </div>
          <p className="company">Manufacturer</p>
          <p className="size">Size</p>
          {/* <p className="strength">Strength</p> */}
          <div className="price-container">
            <p>Price</p>
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
            typeof (customProducts) != "undefined" ? customProducts.map((product) => (
                  <Product
                    shopFont={shopFont}
                    view={view}
                    key={product.id}
                    product={product}
                    addCart={handleAddCart}
                    setSelectedProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                    isLoading={isLoading}
                    isCartLoading={isCartLoading}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    cart={cart}
                    category={product.customFields ? product.customFields[staging ? 19 : 10] ? product.customFields[staging ? 19 : 10].value : "" : ""}

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
