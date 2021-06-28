import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getUsers, getCustomProducts, resetCustomProducts } from '../../actions/admin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const initialState = { productId: "", price: 0 };

export default props => {
    const admin = useSelector((state) => state.admin);
    const [username, setUsername] = useState('');
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [actionType, setActionType] = useState('add');
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAction = (action, product) => {
        if (action === 'add') {
            setFormData(initialState);
        } else {
            setFormData(product);
        }
        setActionType(action);
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        const company = admin.users.filter((user) => user.Username === username);
        setCompanyDetails(company[0]);
        setIsLoading(false);
    }, [admin]);

    useEffect(() => {
        setIsLoading(true);
        setUsername(props.match.params.id)
        dispatch(getUsers())
        dispatch(getCustomProducts(props.match.params.id));
    }, [dispatch, location]);

    useEffect(() => {
        console.log('render!');

        return () => dispatch(resetCustomProducts());
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-5 header">
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
                                <th scope="col">Product ID</th>
                                {/* <th scope="col">Name</th> */}
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading ?
                            <tr>
                                <td colSpan="3" className="text-center table-loader">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            :
                            admin?.customProducts?.length === 0 ? 
                                <tr>
                                    <td colSpan="3" className="text-center table-loader">
                                        No Custom Product Price
                                    </td>
                                </tr>
                                :
                                admin?.customProducts?.map((product, index) => (
                                    <tr key={`product-key-${index}`}>
                                        <td>{product.productId}</td>
                                        {/* <td>Product Name</td> */}
                                        <td>{product.price}</td>
                                        <td>
                                            <a href="#" className="mr-5" data-toggle="modal" data-target="#productModal" onClick={()=>handleAction('edit', product)}>Edit</a>
                                            <a href="#" className="mr-5">Delete</a>
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
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="FormControlInput1">Product ID</label>
                                <input type="text" name="productId" value={formData.productId} className="form-control" id="FormControlInput1" placeholder="Product ID" onChange={handleChange} />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="FormControlInput2">Product Name</label>
                                <input type="text" name="productName" value={formData.productName} className="form-control" id="FormControlInput2" placeholder="Product Name" onChange={handleChange} />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="FormControlInput3">Price</label>
                                <input type="number" name="price" value={formData.price} className="form-control" id="FormControlInput3" onChange={handleChange} />
                            </div>
                            <button type="button" className="btn btn-primary w-100">{actionType === 'add' ? 'Add' : 'Save changes'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}