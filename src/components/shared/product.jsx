import React from 'react'
import { useHistory } from 'react-router'
import NoImage from '../../assets/img/unavailable.svg'
// import ProductImage from '../../assets/img/product-sample.png'
import { Link } from 'react-router-dom'

export const Product = ({
  view,
  product,
  addCart,
  setSelectedProduct,
  selectedProduct,
  isLoading,
  isCartLoading,
  quantity,
  setQuantity,
  shopFont,
  cart,
  category,
  subCategory,
  sortBy
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
  
  console.log(product)
  
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
            {/* <div className="product-image-head"></div> */}
            <div className="header-name-wrapper">
              <p className="flex-fill list-header-name">
                {product.name}
                {(!product?.qtyOnHand || product?.qtyOnHand === "" || product?.qtyOnHand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock. Please call for availability.</span>}
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
            {/* <img className="for-list pr-4" src={HeartImg} /> */}

            <div className="no-container for-list">
              {/* {product.num} */}
              <p className="item-no">{product.customFields && product.customFields[13] && product.customFields[13].value ? product.customFields[13].value : 'N/A'}</p>
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
                    {product.description}
                    {(!product?.qtyOnHand || product?.qtyOnHand === "" || product?.qtyOnHand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock. Please call for availability.</span>}
                  </p>
              ) : (
                  <p className="name">
                    {product.description}
                    {(!product?.qtyOnHand || product?.qtyOnHand === "" || product?.qtyOnHand === "0.0") && <span style={{color: "red", fontSize: "12px"}}><br /> Item is out of stock. Please call for availability.</span>}
                  </p>
              )}
              {view !== 'list' &&
                <>
                  {/* {product.num} */}
                  <p className="mb-0">ITEM #: {product.customFields && product.customFields[13] && product.customFields[13].value ? product.customFields[13].value : 'N/A'}</p>
                  <p>NDC: {product.ndc}</p>
                </>
              }
              {/* <p className="compare for-list">({compare_to})</p> */}
            </div>
            <p className="company for-list">
              {product.customFields && product.customFields[staging ? 15 : 3] && product.customFields[staging ? 15 : 3].value ? product.customFields[staging ? 15 : 3].value : 'N/A'}
            </p>
            <p className="size for-list">
              {product.customFields && product.customFields[staging ? 17 : 6] && product.customFields[staging ? 15 : 3].value ? product.customFields[staging ? 17 : 6].value: 'N/A'}
            </p>
            <p className="strength for-list">
              {product.customFields && product.customFields[staging ? 18 : 9] && product.customFields[staging ? 18 : 9].value ? product.customFields[staging ? 18 : 9].value: 'N/A'}
            </p>
            {/* <p className="strength for-list">
              {product.
              [9].value || '100'}
            </p> */}
            <div className="price-container">
              <p className="price">
                {!auth && shopFont ? (
                <span style={{ fontSize: '12.3295px' }}>
                <Link
                  to="/login"
                  style={{ textDecoration: 'underline', color: 'black' }}
                >
                  Login
                </Link>{' '}
                for Price
              </span>
                ) : !auth ? (
                  <span style={{ fontSize: '12.3295px' }}>
                    <Link
                      to="/login"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      Login
                    </Link>{' '}
                    for Price
                  </span>
                ) : (
                  <>$ { product.purchasePrice ? (product.purchasePrice) : '0' }</>
                )}
              </p>
              {/* <p className="ppu for-list">({ppu})</p> */}
            </div>
            {auth ? (
              <>
            <div className="buy-container d-flex">
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
                {selectedProduct === product && isCartLoading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <></>
                )}
              </button>

              </div>
              <div className={'header-price-wrapper ' + (view === "list" ? 'header-price-wrapper-show' : 'd-none')}>
              <p className="list-header-price">$ {product.purchasePrice}</p>
            </div>
           </>
           ) : (
              <>
               <span style={{ fontSize: '12.3295px' }} className="to-buy">
                    <Link
                      to="/login"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      Login
                    </Link>{' '}
                    to Buy
                  </span>
              </>
            )}
            <p className={'incart' + (auth ? ' for-list' : ' d-none')} >{incart()}</p>
          </div>
          {/* <div className={(view === "list " ? "d-block" : "d-none")}>
                        <div className="price-wrapper">
                            <div className="flex-fill">
                                <p className="price">${product.purchasePrice}</p>
                                <p className="ppu">({ppu})</p>
                            </div>
                            <div className="buy-container">
                                <button className={"cart-btn " + (selectedProduct === product && isLoading ? 'adding' : '')} onClick={() => addCart(product)}>
                                    {(selectedProduct === product && isLoading) ?
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <></>
                                    }
                                </button>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  )
}
