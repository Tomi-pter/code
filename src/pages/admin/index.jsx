import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getUsers, loginAdminUser } from '../../actions/admin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const AdminDashboard = () => {
    const admin = useSelector((state) => state.admin);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState('');
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLoginUser = (user) => {
        const formData = {username: user.Username}
        const profile = JSON.parse(localStorage.getItem('profile'));
        dispatch(loginAdminUser(formData, profile));
    }

    const handleLogout = () => {
        localStorage.removeItem('admin')
        history.push('/admin/login')
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
       if (search === '') {
        setCompanies(admin?.users)
       } else {
        const filterCompanies = admin?.users.filter(user => user.Attributes[7].Value.toLowerCase().includes(search.toLowerCase()))
        setCompanies(filterCompanies)
       }
    }, [search]);

    useEffect(() => {
        if (admin.loginError) {
            setShowError(true)
            setTimeout(function() {
                setShowError(false)
            }, 3000);
        }
        if (admin?.users) {
            setCompanies(admin.users)
        }
    }, [admin]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect( () => () => setShowError(false), [] );

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-4 header">
                    <h2 className="m-0">
                        Companies
                    </h2>
                    <button type="button" className="btn btn-danger" onClick={()=>handleLogout()}>Logout</button>
                </div>
                <div className="search-container input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            Search
                        </span>
                    </div>
                    <input className="form-control" type="text" value={search} placeholder="Company Name" onChange={handleChange} />
                </div>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companies.map((user, index) => (
                                    <tr key={`user-key-${index}`}>
                                        <td>{user.Attributes[7].Value}</td>
                                        <td>{user.UserStatus}</td>
                                        <td>
                                            <Link to={`admin/${user.Username}`} className="mr-5">View</Link>
                                            <button className="btn btn-primary" onClick={()=>handleLoginUser(user)} disabled={user.UserStatus === 'CONFIRMED' ? null : true}>Login</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="toast" className={"toast alert alert-danger " + (showError ? 'show' : '')} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" style={{position: 'absolute', bottom: '1rem', right: '1rem'}}>
                Let the user login atleast once!
            </div>
        </div>
    )
}
