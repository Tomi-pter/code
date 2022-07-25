import React from 'react'

export default ({items}) => {
    return <div className="modal fade"
        id="orderDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="orderDetailsModal"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <h2 className="sub-title">
                        Order Details
                    </h2>

                    <div>
                        <ul>
                        {
                            items && items.map(item => {
                                return <li>
                                    <div>NDC: {`${item.ndc}`}</div>
                                    <div>ProductName: {`${item.productName}`}</div>
                                    <div>Price: {`$ ${item.price}`}</div>
                                    <div>Quantity: {`${item.quantity}`}</div>
                                </li>
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}