import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import NoImage from '../../assets/img/unavailable.svg';

import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../actions/account';

import ReactPaginate from 'react-paginate';

export const OrdersHistory = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const account = useSelector((state) => state.account);
    const [orders, setOrders] = useState([]);
    const totalPageCount = Math.ceil(account?.ordersData?.count / 5);
    const [status, setStatus] = useState('All');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formatDate = (ms) => {
        const date = new Date(ms);
        return date.toLocaleString('en-US', {
            month: 'long', // numeric, 2-digit, long, short, narrow
            day: '2-digit', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
        });
    }

    const calcSubTotal = (items) => {
        let subTotal = 0;

        for(let i=0;i<items.length;i++) {
            let price = items[i].price
            let quantity = items[i].quantity
            subTotal = subTotal + (price * quantity)
        }

        return subTotal.toFixed(2)
    }

    const renderOrder = (order, index) => {
        return (
            <div key={`key-${index}`} className="order">
                <div className="d-flex align-items-start justify-content-between date-status-container">
                    <div className="orderNo">
                        <p className="d-flex">Order #{order.salesOrderNumber}</p>
                        {order.trackingNumber && <p>Tracking <a href={`https://www.fedex.com/fedextrack/?trknbr=${order.trackingNumber}`} target="_blank">#{order.trackingNumber}</a></p>}
                        <p>Placed on {formatDate(order.details.dateOrdered)}</p>
                    </div>
                    <div className="status">{order.details.shipComplete ? 'Shipped' : 'Processing'}</div>
                    {/* <div>
                        <p>Discount: ${(order.details.discount / 100).toFixed(2)}</p>
                        <p>Sub Total: ${(order.details.discount / 100).toFixed(2)}</p>
                        <p className="amount">Total: ${(order.details.total / 100).toFixed(2)}</p>
                    </div> */}
                </div>
                {/* <div className="d-flex align-item-center justify-content-between date-status-container">
                    <div className="date">Placed on {formatDate(order.details.dateOrdered)}</div>
                    <div className="status">{order.status}</div>
                </div>
                <div className="d-flex align-item-center justify-content-between">
                    <div className="d-flex align-item-center">
                        <div className="date">Shipping Fee:</div>
                        <div className="date">{order.details.shippingFee}</div>
                    </div>
                </div> */}
                {order.details.items.map((item, index) => (
                    <Link to={`/product/${item.productId}`} key={`item-${index}`} className="d-flex align-items-center item">
                        <img width="50" src={item.imageUrl !== "" ? item.imageUrl : NoImage} alt="" />
                        <div className="item-info">
                            <p className="product-name">
                                {item.productName}
                            </p>
                            {
                                item.ndc
                                ? <p>NDC: {item.ndc} </p>
                                : ''
                            }
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-info-end text-left">
                            {order.details.shipComplete &&
                                <>
                                    <p className="text-left">Get by</p>
                                    <p className="text-left">{formatDate(order?.getBy)}</p>
                                </>
                            }
                        </div>
                    </Link>
                ))}
                <div className="mt-2">
                    {/* <div className="orderNo">
                        <p className="d-flex">Order #{order.salesOrderNumber}</p>
                        <p>Placed on {formatDate(order.details.dateOrdered)}</p>
                        <div className="status">{order.status}</div>
                    </div> */}
                    {/* <div> */}
                    {/* order.details.subTotal.toFixed(2) */}
                        <div className="d-flex align-items-center justify-content-between">
                            <b>Subtotal:</b> <div>${calcSubTotal(order.details.items)}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>Shipping Fee:</div> <div>${order.details.shippingFee.toFixed(2)}</div>
                        </div>
                        {order.details.discount > 0 &&
                            <div className="d-flex align-items-center justify-content-between">
                                <div>Discount:</div> <div>${order.details.discount.toFixed(2)}</div>
                            </div>
                        }
                        <div className="d-flex align-items-center justify-content-between mt-5">
                            <div className="amount">Total:</div> <div>${order.details.total.toFixed(2)}</div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        )
    }

    const handlePageClick = (data) => {
        setLoading(true);
        // let s = status === 'All' ? null : status;
        let p = data.selected + 1;
        setPage(p);
        setOrders([]);
        // dispatch(getOrders(user?.username, s, p));
    }

    const handleStatusClick = (s) => {
        setLoading(true)
        // let newStatus = s === 'All' ? null : s;
        setStatus(s);
        setPage(1);
        setOrders([]);
        // dispatch(getOrders(user?.username, newStatus, 1));
    }

    useEffect(() => {
        if(account?.ordersData?.orders) {
            const sorted = account?.ordersData?.orders?.sort((a,b) => (a.salesOrderNumber < b.salesOrderNumber) ? 1 : ((b.salesOrderNumber < a.salesOrderNumber) ? -1 : 0));
            setOrders(sorted);
        }
        setLoading(false)
    },[account]);

    useEffect(() => {
        let s = status === 'All' ? null : status;
        dispatch(getOrders(user?.username, s, page));
    },[status, page]);

    useEffect(() => {
        // dispatch(getOrders(user?.username, null, 1));
        setStatus('All')
    },[]);

    return (
        <>
            <ul className="nav align-item-center justify-content-around order-nav">
                <li className={status === "All" ? "active" : ""}><div onClick={() => handleStatusClick('All')}>All</div></li>
                <li className={status === "Processing" ? "active" : ""}><div onClick={() => handleStatusClick('Processing')}>Processing</div></li>
                <li className={status === "Shipped" ? "active" : ""}><div onClick={() => handleStatusClick('Shipped')}>Shipped</div></li>
            </ul>
            <div className="orders">
                {
                    orders.length === 0 ?
                    <div className="d-flex align-items-center justify-content-center orders-empty">
                        {
                            !account?.ordersData || loading ? 
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        :
                            'No Order History'
                        }
                    </div>
                    :
                    orders.map((order, index) => (
                        renderOrder(order, index)
                    ))
                }
                <div className="pagination-orders">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPageCount}
                        onPageChange={handlePageClick}
                        containerClassName={(account?.ordersData?.count === 0 || loading) ? 'pagination empty' : 'pagination'}
                        activeClassName={'active'}
                        // initialPage={0}
                        forcePage={parseInt(page) - 1}
                    />
                </div>
            </div>
        </>
    )
}
