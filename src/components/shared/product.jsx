import React from 'react'
import { useHistory } from 'react-router'
import NoImage from '../../assets/img/unavailable.svg'

import { Link } from 'react-router-dom'

const renderActionButton = (selectedProduct, product, quantity, handleChange, addCart, isCartLoading, requestStock, requestLoading) => {
    if (product?.totalquantityonhand <= 0) {
        return <div>
              <button className="btn btn-primary sale-rep-btn" onClick={()=>requestStock(product)}>
                  {requestLoading && selectedProduct === product ? 
                      <div className="spinner-border text-primary mr-0" style={{ width: '20px', height: '20px'}} role="contact rep">
                          <span className="sr-only">Loading...</span>
                      </div>
                      : 
                      'Contact Sales Rep'
                  }
              </button>
            </div>
    }

    return <div className="buy-container d-flex">
            <input
                className="qty for-list mr-2"
                type="number"
                min="1"
                placeholder="1"
                value={selectedProduct === product ? quantity : 1}
                onChange={handleChange}
            />
            <button
                className={
                    'cart-btn ' +
                    (selectedProduct === product && isCartLoading ? 'adding' : '')
                }
                onClick={() => addCart(product)}
            >
                {
                    selectedProduct === product && isCartLoading
                    ? <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    : <></>
                }
            </button>
        </div>
}

export const Product = ({
  view,
  product,
  addCart,
  requestStock,
  setSelectedProduct,
  selectedProduct,
  isLoading,
  isCartLoading,
  requestedProductPrice,
  requestLoading,
  requestSent,
  quantity,
  setQuantity,
  shopFont,
  cart,
  category,
  subCategory,
  sortBy,
  selectedCategory
}) => {
  const auth = localStorage.getItem('profile')
  const staging = process.env.REACT_APP_SQUARE_APPLICATION_ID.includes("sandbox");
  const history = useHistory()

  const incart = () => {
    const incartCheck = cart?.cartData?.filter(item => item.productId === parseInt(product.id));
    return incartCheck[0] ? incartCheck[0].quantity : 0;
  }

  const viewProduct = (id) => {
    history.push(`/product/${id}`)
  }

  const handleChange = (e) => {
    setSelectedProduct(product)
    setQuantity(parseInt(e.target.value))
  }

  // const handleRequestedCheck = (ndc) => {
  //   const requestedCheck = requestedProductPrice.filter(item => item.ndc === ndc);
  //   if (requestedCheck[0]) {
  //     const lastRequest = new Date(requestedCheck[0]?.lastRequested);
  //     const hour= 1000 * 60 * 60;
  //     const hourago = Date.now() - (hour * 24);

  //     return lastRequest > hourago;
  //   } else {
  //     return false
  //   }
  // }

  return (
    <div className={view === 'list' ? ' col-12' : 'col-12 col-md-6 col-lg-4'}>
      <div
        className={
          'product ' +
          (category === 'Pharmaceuticals'
            ? 'pharma-product'
            : category === 'Animal Health'
            ? 'vet-product'
            : 'medsurg-product')
        }
      >
        <div className="mobile-wrapper">
          <div
            className={
              'mobile-list-header ' + (view === 'list' ? ' d-flex' : 'd-none')
            }
          >
            <div className="header-name-wrapper">
              <p className="flex-fill list-header-name">
                {product.displayname}
                {(!product?.totalquantityonhand || product?.totalquantityonhand === "" || product?.totalquantityonhand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock.</span>}
              </p>
            </div>

          </div>
        </div>
        <div className={'product-details-container'}>
          <div className="img-container">
            <div>
              <img src={product.url  ? product.url : NoImage} alt=""   onClick={() => viewProduct(product.id)}/>
            </div>
          </div>
          <div className="details-container">
            <div className="no-container for-list">
              <p className="item-no">{product.productNumber || 'N/A'}</p>
              <p className="ndc">{product.ndc}</p>
            </div>
            <div
              className="name-container"
              onClick={() => viewProduct(product.id)}
              style={{
                minHeight: view === 'list' || shopFont ? '0px' : '12vh',
              }}
            >
              {shopFont ? (
                  <p style={{ fontSize: '11.4183px !important' }}>
                    {product.displayname}
                    {(!product?.totalquantityonhand || product?.totalquantityonhand === "" || product?.totalquantityonhand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock.</span>}
                  </p>
              ) : (
                  <p className="name">
                    {product.displayname}
                    {(!product?.totalquantityonhand || product?.totalquantityonhand === "" || product?.totalquantityonhand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock.</span>}
                  </p>
              )}
              {view !== 'list' &&
                <>
                  <p className="mb-0">ITEM #: {product.productNumber || "N/A"}</p>
                  <p>NDC: {product.ndc}</p>
                </>
              }
            </div>
            <p className="company for-list">
              {product.manufacturer || 'N/A'}
            </p>
            <p className="size for-list">
              {product.bottleSize || 'N/A'}
            </p>
            <p className="strength for-list">
              {product.drugStrength || 'N/A'}
            </p>
            <div className="price-container">
              <p className="price">
                {(!auth && shopFont || !auth) ? 
                  <span style={{ fontSize: '12.3295px' }}>
                    <Link
                      to="/login"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      Login
                    </Link>{' '}
                    for Price
                  </span>
                :
                  <>$ { product.cost % 1 === 0 ? parseInt(product.cost) : product.cost }</>
                }
              </p>
            </div>
            {auth ? 
              renderActionButton(selectedProduct, product, quantity, handleChange, addCart, isCartLoading, requestStock, requestLoading)
            :
              <span style={{ fontSize: '12.3295px' }} className="to-buy">
                    <Link
                      to="/login"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      Login
                    </Link>{' '}
                    to Buy
              </span>
            }
            <p className={'incart' + (auth ? ' for-list' : ' d-none')} >{incart()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
