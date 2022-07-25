import React, { useMemo } from 'react'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table' // React Table 7

// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length
  
    return (
        <input
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
  
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function DataTable({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                    ? String(rowValue)
                        .toLowerCase()
                        .startsWith(String(filterValue).toLowerCase())
                    : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

    return <>
        <table className='table table-hover' {...getTableProps()}>
            <thead className="thead-dark">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th scope='col'>
                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {
                                        column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''
                                    }
                                </span>
                                </div>
                                <div>
                                    {column.canFilter ? column.render('Filter') : null}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)

                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <th {...cell.getCellProps()}>{cell.render('Cell')}</th>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>
            {' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>
            {' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>
            {' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>
                {' '}
            <span>
                Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>
            {' '}
            </span>
            <span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>
            {' '}
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
            </select>
      </div>
    </>
}

export default DataTable;