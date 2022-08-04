import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getOrderLogs } from '../../actions/admin'

import Table from '../../components/commons/table'
import OrderDetails from './modal/orderDetails'
import styled from 'styled-components'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            },
        }

        th, td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
            preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })

        return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
        <option value="">All</option>
        {options.map((option, i) => (
            <option key={i} value={option}>
                {option}
            </option>
        ))}
        </select>
    )
}

export default props => {
    const dispatch = useDispatch()
    const admin = useSelector((state) => state.admin)

    const [logs, setLogs] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    /* React Table Columns */
    const columns =  useMemo(
        () => [
            {
                Header: 'Company Name',
                accessor: 'companyName',
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Subtotal',
                accessor: row => `$ ${row.subTotal.toFixed(2)}`,
                disableFilters: true
            },
            {
                Header: 'Shipping Fee',
                accessor: row => row.shippingFee === 0 ? '' : `$ ${row.shippingFee}`,
                disableFilters: true
            },
            {
                Header: 'Total',
                accessor: row => `$ ${row.total.toFixed(2)}`,
                disableFilters: true
            },
            {
                Header: 'Ordered By',
                accessor: 'role',
                Filter: SelectColumnFilter
            },
            {
                Header: 'Date',
                accessor: row => new Date(row.dateOrdered).toLocaleString(),
                disableFilters: true
            },
            {
                Header: 'Details',
                accessor: row => {
                    return <button className="edit-btn"
                        data-toggle="modal"
                        data-target="#orderDetailsModal"
                        onClick={() => setOrderDetails(row.items)}
                    >
                        Show
                    </button>
                },
                disableFilters: true,
                disableSortBy: true
            }
        ],
        []
    )

    /* Upon page load, get logs */    
    useEffect(() => {
        dispatch(getOrderLogs())
    }, [])

    useEffect(() => {
        setLogs(admin.logs.sort((a, b) => a.dateOrdered - b.dateOrdered).reverse())
    }, [admin])
    /* End of loading logs */

    return <>
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-4 header">
                    <h2 className="m-0">Order Logs</h2>
                </div>
                <div className="table-container custom-logs">
                    <Styles>
                        <Table columns={columns} data={logs}/>
                    </Styles>
                    <OrderDetails items={orderDetails}/>
                </div>
            </div>
        </div>
    </>
    
}
