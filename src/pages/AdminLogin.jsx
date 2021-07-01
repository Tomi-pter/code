import React, { useState } from 'react'
import { useHistory } from 'react-router';

const initialState = { username: "", password: "" };

export default props => {
    const [formData, setFormData] = useState(initialState);
    const [actionLoading, setActionLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        localStorage.setItem("admin", JSON.stringify({username: formData.username}));
        history.push("/admin");
    }

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card form-login">
                <h1 className="text-center mb-5">Admin Login</h1>
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
                    disabled={formData.username === "" && formData.password === "" && !actionLoading ? true : null}
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