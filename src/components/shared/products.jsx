import React, { useState, useEffect } from 'react'
import { Product } from './product'
import { useDispatch } from 'react-redux'
import { getCart, addCart } from '../../actions/cart'
import { getCustomProducts } from '../../actions/admin'
import { useSelector } from 'react-redux'
import { getProducts, getFavoriteProducts, requestPrice } from '../../actions/products'
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
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [sortBy, setSortBy] = useState('A-Z')
  const [filter, setFilter] = useState('name')
  const [order, setOrder] = useState('ASC')
  const [pageNumber, setPageNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const totalPageCount = Math.ceil(products?.count / 12);
  const [totalProduct, setTotalProduct] = useState(0);
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
      dispatch(getFavoriteProducts(user?.username, null, filter, order, null))
    } else {
      dispatch(getProducts(null, category, filter, order, null))
    }
    // dispatch(getProducts(null, category, filter, order, null));
    setSortBy(value);
  }

  const handlePageClick = (data) => {
    setIsLoading(true)
    window.scrollTo({top: 300,
      behavior: 'smooth'})
    var increment = data.selected + 1;
    setPageNumber(increment);

    if ((category !== '' && page === 'shop') || (page === 'search')) {
      if (category === 'Favorites') {
        dispatch(getFavoriteProducts(user?.username, null, filter, order, increment))
      } else {
        dispatch(getProducts(name, category, filter, order, increment))
      }
    }
  };

  const handleSearchFav = (e) => {
    setIsLoading(true)
    dispatch(getFavoriteProducts(user?.username, e.target.value, filter, order, 1))
  };

  const handleRequestPrice = (product) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const formData = {
      ndc: product.ndc,
      productName: product.name
    }
    setRequestLoading(true)
    setSelectedProduct(product)
    dispatch(requestPrice(user?.username, formData))
  }

  useEffect(() => {
      if (category === 'Favorites') {
        setCustomProducts(products?.products);
      } else {
        if (products?.products?.length > 0 && admin?.customProducts?.length > 0) {
            const customProductLookup = admin.customProducts.reduce((prods, prod) => {
                prods[prod.productId] = prod;

                return prods;
            }, {});

            const productsWithCustomPrice = products?.products.map(prod => {
                if (customProductLookup[prod.id] !== undefined) {
                    prod.purchasePrice = customProductLookup[prod.id].price;
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
      // setPageNumber(1)
      if (requestLoading && products.requestPriceSuccess) {
        setRequestSent(true)
        setTimeout(function() {
          setRequestSent(false)
        }, 3000);
      }
      setIsLoading(false)
      setRequestLoading(false)
  }, [products, admin]);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setIsLoading(false)
  //   // }, 1000)
  //   if ((category !== '' && page === 'shop') || (page === 'search')) {
  //     if (category === 'Favorites') {
  //       dispatch(getFavoriteProducts(user?.username, filter, order, pageNumber))
  //     } else {
  //       dispatch(getProducts(name, category, filter, order, pageNumber))
  //     }
  //   }
  // }, [pageNumber, filter, order])

  useEffect(() => {
    // setTimeout(() => {
      setQuantity(1)
      setSelectedProduct(null)
      setIsLoading(false)
    // }, 1000)
  }, [cart])

  useEffect(() => {
    setIsLoading(true)
    setTotalProduct(0)
    setPageNumber(1)
    if (category !== '' && page === 'shop') {
      if (category === 'Favorites') {
        // dispatch(getFavoriteProducts(user?.username))
        dispatch(getFavoriteProducts(user?.username, null, 'name', 'ASC', 1))
      } else {
        // dispatch(getProducts(null, category))
        dispatch(getProducts(name, category, 'name', 'ASC', 1))
      }
    }
  }, [category])

  useEffect(() => {
    setIsLoading(true)
    if (page === 'search') dispatch(getProducts(name))
  }, [name])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'))
    dispatch(getCart(user?.username))
    dispatch(getCustomProducts(user?.username))
  }, [])

  // useEffect(() => {
  //   setIsLoading(false)
  // }, [products])

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
          <p className="strength">Strength</p>
          <div className="price-container" style={{minWidth: category !== 'Favorites' && '100px'}}>
            <p>Price</p>
          </div>
          {/* <p className="buy-container"> */}
          { category === 'Favorites' && <p className={'buy' + (!user ? ' buy-offline' : ' buy-online')} style={!user ? { minWidth: '90px' } : { minWidth: '145px' }}>Buy</p>}
          <div className={'incart' + (!user || category !== 'Favorites' ? ' d-none' : ' d-block')}>
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
          {isLoading || !totalProduct ?
            <div className="container-fluid">
              <div className="spinner-container d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            :
            customProducts?.length === 0 ? 
            <div className="col-12 d-flex align-items-center justify-content-center text-center">
              No Favorite Product
            </div>
            :
            customProducts?.map((product) => (
              <Product
                shopFont={shopFont}
                view={view}
                key={product.id}
                product={product}
                addCart={handleAddCart}
                requestPrice={handleRequestPrice}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                isLoading={isLoading}
                isCartLoading={isCartLoading}
                requestLoading={requestLoading}
                requestSent={requestSent}
                quantity={quantity}
                setQuantity={setQuantity}
                cart={cart}
                category={product.customFields ? product.customFields[staging ? 19 : 10] ? product.customFields[staging ? 19 : 10].value : "" : ""}
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
          containerClassName={totalProduct === 0 ? 'pagination empty' : 'pagination'}
          activeClassName={'active'}
          initialPage={0}
        />
      </div>
    </div>
  )
}
