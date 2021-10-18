import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';
import NoImage from '../../assets/img/unavailable.svg';

export const OrdersHistory = ({ account }) => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('All');
    const filterProcessingOrders = orders?.filter(order => order.status === 'Processing');
    const filterShippedOrders = orders?.filter(order => order.status === 'Shipped');

    const formatDate = (ms) => {
        const date = new Date(ms);
        return date.toLocaleString('en-US', {
            month: 'long', // numeric, 2-digit, long, short, narrow
            day: '2-digit', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
        });
    }

    const renderOrder = (order, index) => {
        return (
            <div key={`key-${index}`} className="order">
                <div className="d-flex align-items-start justify-content-between date-status-container">
                    <div className="orderNo">
                        <p className="d-flex">Order #{order.salesOrderNumber}</p>
                        <p>Placed on {formatDate(order.details.dateOrdered)}</p>
                    </div>
                    <div className="status">{order.status}</div>
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
                            {order.status === 'Shipped' &&
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
                        <div className="d-flex align-items-center justify-content-between">
                            <b>Subtotal:</b> <div>${order.details.subTotal.toFixed(2)}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>Shipping Fee:</div> <div>${(order.details.shippingFee / 100).toFixed(2)}</div>
                        </div>
                        {order.details.discount > 0 &&
                            <div className="d-flex align-items-center justify-content-between">
                                <div>Discount:</div> <div>${(order.details.discount / 100).toFixed(2)}</div>
                            </div>
                        }
                        <div className="d-flex align-items-center justify-content-between mt-5">
                            <div className="amount">Total:</div> <div>${(order.details.total/100).toFixed(2)}</div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        )
    }

    const renderOrders = () => {
        if (status === "All") {
            return (
                orders.length === 0 ?
                    <div className="d-flex align-items-center justify-content-center orders-empty">No Order History</div>
                :
                    orders.map((order, index) => (
                        renderOrder(order, index)
                    ))
            )
        }
        if (status === "Processing") {
            return (
                filterProcessingOrders.length === 0 ?
                    <div className="d-flex align-items-center justify-content-center orders-empty">No Processing Order/s</div>
                :
                filterProcessingOrders.map((order, index) => (
                    renderOrder(order, index)
                ))
            )
        }
        if (status === "Shipped") {
            return (
                filterShippedOrders.length === 0 ?
                    <div className="d-flex align-items-center justify-content-center orders-empty">No Shipped Order/s</div>
                :
                filterShippedOrders.map((order, index) => (
                    renderOrder(order, index)
                ))
            )
        }
    }

    useEffect(()=>{
        if( account?.accountOrders) {
            const sorted = account?.accountOrders?.sort((a,b) => (a.salesOrderNumber < b.salesOrderNumber) ? 1 : ((b.salesOrderNumber < a.salesOrderNumber) ? -1 : 0));
            setOrders(sorted);
        }
    },[account]);

    return (
        <>
            <ul className="nav align-item-center justify-content-around order-nav">
                <li className={status === "All" ? "active" : ""} onClick={()=>setStatus('All')}>All</li>
                <li className={status === "Processing" ? "active" : ""} onClick={()=>setStatus('Processing')}>Processing <div className="count">{filterProcessingOrders.length}</div></li>
                <li className={status === "Shipped" ? "active" : ""} onClick={()=>setStatus('Shipped')}>Shipped <div className="count">{filterShippedOrders.length}</div></li>
            </ul>
            <div className="orders">
                {renderOrders()}
            </div>
        </>
    )
}
