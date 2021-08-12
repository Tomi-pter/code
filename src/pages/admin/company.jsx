import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getUsers, getCustomProducts, resetCustomProducts, createCustomProduct, updateCustomProduct, removeCustomProduct } from '../../actions/admin';
import { getSearch } from '../../actions/products';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const initialState = { ndc: "", price: "" };

export default props => {
    const admin = useSelector((state) => state.admin);
    const search = useSelector((state) => state.search);
    const [username, setUsername] = useState('');
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [actionType, setActionType] = useState('add');
    const [searchResult, setSearchResult] = useState([]);
    const [searchSelect, setSearchSelect] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAction = (action, product) => {
        setErrorMsg('')
        if (action === 'add') {
            setFormData({...initialState, username });
        } else {
            setFormData(product);
        }
        setActionType(action);
    }

    const handleChange = (e) => {
        let value;
        if (e.target.name === 'ndc' && e.target.value !== "") {
            setSearchSelect(false);
            dispatch(getSearch(e.target.value));
        }
        e.target.name === 'ndc' ? value = e.target.value : value = parseFloat(e.target.value);
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSearchClick = (ndc) => {
        setSearchSelect(true);
        setFormData({ ...formData, ndc });
    }

    const handleSubmit = () => {
        if (actionType === 'add') {
            setActionLoading(true);
            dispatch(createCustomProduct(formData));
        } else {
            setActionLoading(true);
            dispatch(updateCustomProduct(formData.customPricingId, formData));
        }
    }

    const handleDelete = (product) => {
        dispatch(removeCustomProduct(product.customPricingId));
    }

    useEffect(() => {
        if (admin.error) {
            setErrorMsg(admin?.error?.message);
        } else {
            document.getElementById("closeModal").click();
            setErrorMsg('')
        }
        const company = admin.users.filter((user) => user.Username === username);
        setCompanyDetails(company[0]);
        setIsLoading(false);
        setActionLoading(false);
        setSearchResult([]);
    }, [admin]);

    useEffect(() => {
       if(search?.products) setSearchResult(search?.products);
    }, [search]);

    useEffect(() => {
        setIsLoading(true);
        setUsername(props.computedMatch.params.id)
        dispatch(getUsers())
        dispatch(getCustomProducts(props.computedMatch.params.id));
    }, [dispatch, location]);

    useEffect( () => () => {
        dispatch(resetCustomProducts())
        window.onunload = () => {
            localStorage.removeItem('admin')
        }
    }, []);

    // console.log(admin?.customProducts);

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-4 header">
                    <Link to={`/admin`}>{'< Back'}</Link>
                    <h2 className="m-0">
                        {companyDetails && `${companyDetails?.Attributes[7].Value}'s Custom Price List`}
                    </h2>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#productModal" onClick={()=>handleAction('add')}>
                        Add Product
                    </button>
                </div>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Product NDC</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading ?
                            <tr>
                                <td colSpan="4" className="text-center table-loader">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            :
                            admin?.customProducts?.length === 0 ?
                                <tr>
                                    <td colSpan="4" className="text-center table-loader">
                                        No Custom Product Price
                                    </td>
                                </tr>
                                :
                                admin?.customProducts?.map((product, index) => (
                                    <tr key={`product-key-${index}`}>
                                        <td>{product.ndc ? product.ndc : 'N/A'}</td>
                                        <td>{product.productName ? product.productName : 'N/A'}</td>
                                        <td>{product.price.toFixed(2)}</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-secondary mr-3" data-toggle="modal" data-target="#productModal" onClick={()=>handleAction('edit', product)}>Edit</button>
                                            <button type="button" className="btn btn-outline-danger" onClick={()=>handleDelete(product)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="productModal" tabIndex="-1" role="dialog" aria-labelledby="productModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productModalTitle">{actionType === 'add' ? 'Add' : 'Edit'} Product</h5>
                            <button id="closeModal" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="text-danger text-small error-msg">
                                {errorMsg}
                            </p>
                            <div className="form-group">
                                <label htmlFor="FormControlInput1">Product NDC</label>
                                <div className="ndc-container">
                                    <input type="text" name="ndc" value={formData.ndc} className="form-control" id="FormControlInput1" placeholder="Product NDC" onChange={handleChange} disabled={actionType === 'add' ? null : true}/>
                                    {searchResult.length > 0 && !searchSelect &&
                                        <div className="search-result-container">
                                           <ul>
                                               {
                                                   searchResult.map((product, index) => (
                                                       <li key={`product-search-${index}`} onClick={() => handleSearchClick(product.ndc)}>
                                                           {product.name}
                                                       </li>
                                                    ))
                                               }
                                           </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="FormControlInput2">Price</label>
                                <input type="number" min="1" name="price" step="any" value={formData.price} className="form-control" id="FormControlInput2" onChange={handleChange} />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center justify-content-center w-100"
                                onClick={handleSubmit}
                                disabled={(formData.ndc !== "" && formData.price !== "") ? actionLoading ? true : null : true}
                            >
                                {
                                    actionLoading &&
                                    <div className="spinner-border text-light spinner-border-sm mr-3" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                                {actionType === 'add' ? 'Add' : 'Save changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
