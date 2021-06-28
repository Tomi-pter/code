import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUsers } from '../../actions/admin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const AdminDashboard = () => {
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-5 header">
                    <h2 className="m-0">
                        Companies
                    </h2>
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
                                admin?.users.map((user, index) => (
                                    <tr key={`user-key-${index}`}>
                                        <td>{user.Attributes[7].Value}</td>
                                        <td>{user.UserStatus}</td>
                                        <td>
                                            <Link to={`admin/${user.Username}`} className="mr-5">View</Link>
                                            <a href="#" className="mr-5">Login</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}