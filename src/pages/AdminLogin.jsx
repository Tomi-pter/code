import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

import { loginAdmin } from '../actions/admin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const initialState = { username: "", password: "" };

export default props => {
    const admin = useSelector((state) => state.admin);
    const [formData, setFormData] = useState(initialState);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        setError('');
        setActionLoading(true);
        dispatch(loginAdmin(formData, history));
    }

    useEffect(() => {
        if (admin.adminLoginError) {
            setError(admin.adminLoginError.message);
        }
        setActionLoading(false);
    }, [admin]);

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card form-login">
                <h1 className="text-center">Admin Login</h1>
                <div className="error">
                    {error}
                </div>
                <div className="form-group">
                    <label htmlFor="FormControlInput1">Username</label>
                    <input type="text" name="username" value={formData.username} className="form-control" id="FormControlInput1" placeholder="Username" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="FormControlInput2">Password</label>
                    <input type="password" name="password" value={formData.password} className="form-control" id="FormControlInput2" placeholder="Password" onChange={handleChange} />
                </div>
                <button 
                    type="button" 
                    className="btn btn-primary d-flex align-items-center justify-content-center w-100" 
                    onClick={handleSubmit}
                    disabled={(formData.username !== "" && formData.password !== "") ? actionLoading ? true : null : true}
                >
                    {
                        actionLoading &&
                        <div className="spinner-border text-light spinner-border-sm mr-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    Login
                </button>
            </div>
        </div>
    )
}