import React from 'react';
import ProductPlaceholder from '../../assets/img/product-placeholder-order.svg';

export const OrdersHistory = ({ account }) => {

    const formatDate = (ms) => {
        const date = new Date(ms);
        return date.toLocaleString('en-US', {
            month: 'long', // numeric, 2-digit, long, short, narrow
            day: '2-digit', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
        });
    }

    return (
        <>
            <ul className="nav align-item-center justify-content-around order-nav">
                <li className="active">All</li>
                <li>Delivered <div className="count">7</div></li>
                <li>In Transit <div className="count">2</div></li>
                <li>Pending <div className="count">1</div></li>
                <li>Canceled <div className="count">1</div></li>
            </ul>
            <div className="orders">
                { (!account?.accountOrders || account?.accountOrders?.length <= 0) &&
                    <div className="d-flex align-items-center justify-content-center orders-empty">No Order History</div>
                }
                {
                    account?.accountOrders?.map((order, index) => (
                        <div key={`key-${index}`} className="order">
                            <div className="d-flex align-item-center justify-content-between">
                                <div className="orderNo">Order #{index}</div>
                                <div className="amount">{(order.details.total / 100 )} USD</div>
                            </div>
                            <div className="d-flex align-item-center justify-content-between date-status-container">
                                <div className="date">Placed on {formatDate(order.details.dateOrdered)}</div>
                                <div className="status">{order.details.status}</div>
                            </div>
                            {order.details.items.map((item, index) => (
                                <div key={`item-${index}`} className="d-flex align-items-center item">
                                    <img src={ProductPlaceholder} alt="" />
                                    <div className="item-info">
                                        <p className="product-name">
                                            {item.productName}
                                        </p>
                                        {/* <p className="variant-text">
                                            Brand: Welchol
                                        </p> */}
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="item-info-end">
                                        {order.details.status === "Pending" ? 
                                            <p className="text-center">{order.details.status}</p>
                                            :
                                            <>
                                                <p>{order.details.status}</p>
                                                <p>{formatDate(order.details.dateOrdered)} - {formatDate(order.details.deliveredOn)}</p>
                                            </>
                                        }
                                    </div>
                                </div> 
                            ))}
                        </div>
                   ))
                }
            </div>
        </>
    )
}