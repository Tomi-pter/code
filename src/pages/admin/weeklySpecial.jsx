import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Modal } from 'react-bootstrap'
import Input from '../../components/shared/input'
import { getProductQueue, upsertProductToQueue, getAutomationDate, setAutomationDate } from '../../actions/admin'
import { getAdminProducts, getCategories } from '../../actions/products'

import fuzzysort from 'fuzzysort'

export default props => {
    const dispatch = useDispatch()
    const admin = useSelector((state) => state.admin)
    const products = useSelector((state) => state.products.adminProducts)
    const categories = useSelector((state) => state.products.categories)
    const categoryMap = useSelector((state) => state.products.categories.reduce((acc, category) => {
        acc[category.id] = category.name

        return acc
    }, {}))
    const [updateTime, setUpdateTime] = useState()
    const [updateDay, setUpdateDay] = useState()

    const [productQueue, setProductQueue] = useState([])
    const [weeklySpecial, setWeeklySpecial] = useState({})

    const [searchName, setSearchName] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(null)
    /* MISCELLANEOUS STATES */
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    /* HANDLERS */
    const handleCloseModal = () => {
        setIsEdit(false)
        setShowModal(false)
    }
    
    const handleUpdateTimeChange = event => {
        const { name, value } = event.target

        setUpdateTime(value)
        
    }

    const handleUpdateDayChange = event => {
        const { name, value } = event.target

        setUpdateDay(value)
    }

    const submitAutomationDate = () => {
        if (updateTime) {
            const [hours, minutes] = updateTime.split(':')
            
            dispatch(setAutomationDate({ 
                hours: hours,
                minutes: minutes,
                dayOfWeek: updateDay
            }))
        }
    }

    const handleChange = event => {
        const { name, value } = event.target

        setWeeklySpecial({ ...weeklySpecial, [name]: value })
    }

    const handleProductSearchChange = event => {
        setSearchLoading(true)

        let element = document.getElementById('resultBox')

        if (element) {
            element.style.display = 'block'
        }

        setSearchName(event.target.value)
    }

    const selectProductFromDropdown = product => {
        const productCategory = categories.find(category => category.name === product.category)

        setWeeklySpecial({
            id: product.id,
            name: product.name,
            category: productCategory.id,
            oldPrice: product.cost
        })

        setSearchName('')
    }

    const handleEdit = product => {
        setWeeklySpecial({
            id: product.id,
            name: product.name,
            category: product.category,
            oldPrice: product.oldPrice,
            newPrice: null
        })
        setIsEdit(true)
        setShowModal(true)
    }

    const handleProductSubmit = (event) => {
        if (
            !weeklySpecial.id || !weeklySpecial.name || !weeklySpecial.category ||
            !weeklySpecial.oldPrice || !weeklySpecial.newPrice
        ) {
            console.log('Invalid object')
        }

        dispatch(upsertProductToQueue(weeklySpecial))

        setShowModal(false)
    }

    const handleMouseEnter = () => {
        let element = document.getElementById("resultBox");

        if (element) {
          element.style.display = "block"
        }
    }
    
    const handleMouseLeave = (e) => {
        let element = document.getElementById("resultBox")

        if (element) {
            element.style.display = "none"
        }
    }
    /* END OF HANDLERS */

    /* UTIL FUNCTIONS */
    const preventMinus = event => {
        if (event.charCode === 45) {
            event.preventDefault()
        }
    }

    const preventPasteNegative = event => {
        const clipboardData = event.clipboardData || window.clipboardData
        const pastedData = parseFloat(clipboardData.getData('text'))
    
        if (pastedData < 0) {
            event.preventDefault()
        }
    }
    /* END OF UTIL FUNCTIONS */
    useEffect(() => {
        let searchResult, changeTimer

        if (searchName !== '') {
            changeTimer = setTimeout(() => {
                searchResult = fuzzysort.go(searchName, products, {
                    keys: ['name', 'ndc']
                })
   
                setSearchResults(searchResult)
                setSearchLoading(false)
            }, 1000)
        }
    }, [searchName])

    useEffect(() => {
        dispatch(getProductQueue())
        dispatch(getAdminProducts())
        dispatch(getCategories())
        dispatch(getAutomationDate())
    }, [])

    useEffect(() => {
        setProductQueue(admin.productQueue)
        setUpdateTime(`${admin.cronHours}:${admin.cronMinutes}`)
        setUpdateDay(admin.cronDayOfWeek)
    }, [admin])

    return <>
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <Modal
                    id='weeklySpecialsModal'
                    className='modalWrapper modal-dialog-centered'
                    show={showModal}
                    onHide={handleCloseModal}
                >
                    <Modal.Body>
                        <h2 className="sub-title">{isEdit ? 'Update' : 'Add'} Weekly Special Product</h2>
                        <div className="row">
                            <div
                                className="col"
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleMouseEnter}
                            >
                                <div className="search-container">
                                    <Input
                                        name='id'
                                        type='text'
                                        autoComplete='off'
                                        value={searchName}
                                        placeholder='Search... Product Name'
                                        onChange={handleProductSearchChange}
                                        disabled={isEdit}
                                    />
                                    {
                                        searchName
                                        && searchName !== ''
                                        && <ul id='resultBox' className='suggestions'>
                                            {
                                                searchLoading
                                                && <li>
                                                    <p>Searching products...</p>
                                                </li>
                                            }
                                            {
                                                !searchLoading
                                                && searchResults.length > 0
                                                && searchResults.map(result => {
                                                    return <li
                                                            key={result.obj.id}
                                                            onClick={() => selectProductFromDropdown(result.obj)}
                                                        >
                                                        <p>{result.obj.name}</p>
                                                    </li>
                                                })
                                            }
                                            {
                                                !searchLoading
                                                && searchResults.length === 0
                                                && <li>
                                                    <p>Product Not Found</p>
                                                </li>
                                            }
                                        </ul>
                                    }
                                </div>

         
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                <label htmlFor="address">Product Name</label>
                                    <Input
                                        label='Product Name'
                                        name='name'
                                        type='text'
                                        value={weeklySpecial.name}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                <label htmlFor="address">Category</label>
                                    <Input
                                        label='Category'
                                        name='category'
                                        type='text'
                                        value={categoryMap[weeklySpecial.category] || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                <label htmlFor="address">Old Price</label>
                                    <Input
                                        label='$ XX.XX'
                                        name='oldPrice'
                                        type='number'
                                        value={weeklySpecial.oldPrice}
                                        min='0'
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                <label htmlFor="address">New Price</label>
                                    <Input
                                        label='$ XX.XX'
                                        name='newPrice'
                                        type='number'
                                        min='0'
                                        onChange={handleChange}
                                        onKeyPress={preventMinus}
                                        onPaste={preventPasteNegative}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="button-wrapper d-flex align-items-center justify-content-end">
                            <button
                                className="cancelAddressButton close"
                                onClick={handleCloseModal}
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                            Cancel
                            </button>

                            <button
                                className="saveAddressesButton"
                                onClick={handleProductSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="d-flex align-items-center justify-content-between mb-4 header">
                    <h2 className="m-0">Weekly Specials</h2>
                </div>

                <div className="time-settings">
                    <input
                        className="select-hour-and-minute form-control"
                        type="time"
                        name="updateTime"
                        value={updateTime}
                        onChange={handleUpdateTimeChange}
                        required
                    />

                    <select
                        className="select-day form-control"
                        id="categoryType"
                        value={updateDay}
                        onChange={handleUpdateDayChange}
                    >
                        <option value='1'>Sunday</option>
                        <option value='2'>Monday</option>
                        <option value='3'>Tuesday</option>
                        <option value='4'>Wednesday</option>
                        <option value='5'>Thursday</option>
                        <option value='6'>Friday</option>
                        <option value='7'>Saturday</option>
                    </select>

                    <button
                        className="btn btn-primary mb-4"
                        onClick={() => submitAutomationDate()}
                    >
                        Update Time
                    </button>
                </div>

                <div className="table-container">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr role="row">
                                <th scope="col">Product</th>
                                <th scope="col">Category</th>
                                <th scope="col">Old Price</th>
                                <th scope="col">New Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody role="rowgroup">

                        </tbody>
                        {
                            productQueue.length
                            ? productQueue && productQueue.map(product => {
                                return <tr role="row">
                                    <td role="cell">
                                        {product.name}
                                    </td>
                                    <td role="cell">
                                        {product.category}
                                    </td>
                                    <td role="cell">
                                        {product.oldPrice}
                                    </td>
                                    <td role="cell">
                                        {product.newPrice}
                                    </td>
                                    <td role="cell">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            })
                            : <>No product in queue</>
                        }
                    </table>
                </div>

                <div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(true)}
                    >
                        Add New
                    </button>
                </div>

            </div>
        </div>
    </>
}
