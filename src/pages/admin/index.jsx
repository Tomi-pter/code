import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getUsers, loginAdminUser, confirmUser, importUser } from '../../actions/admin';
import { getCountries, getStates } from '../../actions/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input';
import InputContact from 'react-phone-number-input/input';
import Dropdown from "../../components/shared/dropdown";

import CheckGreen from '../../assets/icon/check-lgreen.svg';
import XGray from '../../assets/icon/x-gray.svg';

const initialState = {
    givenName: "",
    familyName: "",
    fishbowlCustomerId: "",
    email: "",
    password: "",
    confirm_password: "",
    phoneNumber: "",
    address: "",
    company: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    countryCode: ""
};

export const AdminDashboard = () => {
    const admin = useSelector((state) => state.admin);
    const auth = useSelector((state) => state.auth);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState('');
    const [showError, setShowError] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const checkPasswordLenght = formData.password.length >= 8 ? true : false;
    const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
    const checkNumber = /^(?=.*[0-9])/.test(formData.password);
    const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(formData.password);
    const confirmPasswordCheck = formData.password !== '' && formData.password === formData.confirm_password;

    const handleLoginUser = (user) => {
        const formData = {username: user.Username}
        const profile = JSON.parse(localStorage.getItem('profile'));
        dispatch(loginAdminUser(formData, profile));
    }

    const handleLogout = () => {
        localStorage.removeItem('admin')
        history.push('/admin/login')
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleConfirmUser = (user) => {
        setConfirmLoading(true);
        setSelectedUser(user.Username);
        const formData = {username: user.Username};
        dispatch(confirmUser(formData, user));
    }

    const openImportForm = () => {
        setFormData(initialState);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactChange = (value) => {
        setFormData({ ...formData, phoneNumber: value})
    }

    const handleSubmit = () => {
        setActionLoading(true)
        dispatch(importUser(formData));
    }

    useEffect(() => {
        const {
            givenName,
            familyName,
            fishbowlCustomerId,
            email,
            password,
            confirm_password,
            phoneNumber,
            address,
            company,
            city,
            state,
            postalCode,
            country
        } = formData;

        const phoneCheck = formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber) ? true : false;
        const checkState = state === "" && states.length > 0 ? false : true;
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(password);
        const passwordConfirm = password === confirm_password ? true : false;
        fishbowlCustomerId && givenName && familyName && company && phoneNumber && phoneCheck && address && city && postalCode && country && checkState && email && password && emailCheck && passwordCheck && passwordConfirm ? setDisabled(false) : setDisabled(true);
    }, [formData])

    useEffect(() => {
        if (search === '') {
            setCompanies(admin?.users)
        } else {
            const filterCompanies = admin?.users.filter(user => user.Attributes[7].Value.toLowerCase().includes(search.toLowerCase()))
            setCompanies(filterCompanies)
        }
    }, [search]);

    useEffect(() => {
        if (admin.loginError || admin.confirmError) {
            setErrorMsg(admin.loginError ? 'Let the user login atleast once!' : 'Error Confirming User!')
            setShowError(true)
            setTimeout(function() {
                setShowError(false)
            }, 3000);
        }
        if (admin?.users) {
            setCompanies(admin.users)
        }
        setConfirmLoading(false);
        setActionLoading(false);
        if (!admin.importError) {
            document.getElementById("closeImportUserModal").click();
        }
    }, [admin]);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        setCountries(auth?.countriesData);
        if (auth?.statesData?.length > 0) {
          setStates(auth?.statesData);
        } else {
          setStates([]);
          setFormData({ ...formData, state: "" })
        }
    }, [auth])
    
    useEffect(() => {
        const selectedCountry = countries.filter(e => e.name === formData.country);
        if (formData.country !== "" && selectedCountry) {
            const countryCode = selectedCountry[0]?.abbreviation;
            setFormData({ ...formData, countryCode })
            dispatch(getStates(countryCode));
        }
    }, [formData.country])

    useEffect( () => () => {
        setShowError(false)
        window.onunload = () => {
            localStorage.removeItem('admin')
        }
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center admin-pages">
            <div className="card container">
                <div className="d-flex align-items-center justify-content-between mb-4 header">
                    <h2 className="m-0">
                        Companies
                    </h2>
                    <button type="button" className="btn btn-danger" onClick={()=>handleLogout()}>Logout</button>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="search-container input-group mr-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                Search
                            </span>
                        </div>
                        <input className="form-control" type="text" name="search" value={search} placeholder="Company Name" onChange={handleSearchChange} autoComplete="off" />
                    </div>
                    <button type="button" className="btn btn-primary import-btn" data-toggle="modal" data-target="#importUserModal" onClick={()=>openImportForm()}>
                        Import User
                    </button>
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
                                        <td>
                                            {
                                                (user.UserStatus === "CONFIRMED" || user.UserStatus === "RESET_REQUIRED") ? user.UserStatus : 
                                                <button className="btn btn-success" onClick={()=>handleConfirmUser(user)} disabled={confirmLoading ? true : null}>
                                                    {
                                                        confirmLoading && user.Username === selectedUser ?
                                                        <div className="spinner-border text-light spinner-border-sm" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        :
                                                        'Confirm'
                                                    }    
                                                </button>
                                            }
                                        </td>
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
                {errorMsg}
            </div>
            <div className="modal fade" id="importUserModal" tabIndex="-1" role="dialog" aria-labelledby="importUserTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="importUserTitle">Import User</h5>
                            <button id="closeImportUserModal" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="fishbowlCustomerId">Fishbowl Customer ID</label>
                                        <input type="text" name="fishbowlCustomerId" value={formData.fishbowlCustomerId} className="form-control" id="fishbowlCustomerId" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fname">First Name</label>
                                        <input type="text" name="givenName" value={formData.givenName} className="form-control" id="fname" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lname">Last Name</label>
                                        <input type="text" name="familyName" value={formData.familyName} className="form-control" id="lname" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Contact Number</label>
                                        <InputContact
                                            country="US"
                                            international
                                            withCountryCallingCode
                                            value={formData.phoneNumber}
                                            onChange={contactChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input type="text" name="company" step="any" value={formData.company} className="form-control" id="company" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" name="address" value={formData.address} className="form-control" id="address" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" name="city" value={formData.city} className="form-control" id="city" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postalCode">Postal Code</label>
                                        <input type="text" name="postalCode" step="any" value={formData.postalCode} className="form-control" id="postalCode" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} valueKey={'name'} />
                                    </div>
                                    {formData.country && states?.length > 0 && 
                                        <div className="form-group">
                                            <label htmlFor="state">State</label>
                                            <Dropdown id="state" label="State" name="state" value={formData.state} options={states} onChange={handleChange} valueKey={'code'} />
                                        </div>
                                    }
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" value={formData.email} className="form-control" id="email" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" value={formData.password} className="form-control" id="password" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input type="password" name="confirm_password" step="any" value={formData.confirm_password} className="form-control" id="confirm_password" onChange={handleChange} />
                                    </div>
                                    <div className="row">
                                        <p className={"col-5 password-validation " + (checkPasswordLenght ? 'text-success' : 'text-secondary')}>{checkPasswordLenght ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} min 8 characters</p>
                                        <p className={"col-7 password-validation " + (checkLetters ? 'text-success' : 'text-secondary')}>{checkLetters ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} upper & lower case letters</p>
                                        <p className={"col-5 password-validation " + (checkNumber && checkCharacter ? 'text-success' : 'text-secondary')}>{checkNumber && checkCharacter ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} number & symbol</p>
                                        <p className={"col-7 password-validation " + (confirmPasswordCheck ? 'text-success' : 'text-secondary')}>{confirmPasswordCheck ? <img src={CheckGreen} alt="" /> : <img src={XGray} alt="" />} confirm password</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary d-flex align-items-center justify-content-center w-100 mb-3"
                                        onClick={handleSubmit}
                                        disabled={isDisabled || actionLoading}
                                    >
                                        {
                                            actionLoading &&
                                            <div className="spinner-border text-light spinner-border-sm mr-3" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        }
                                        Import
                                    </button>
                                    <p className="text-danger text-small error-msg">
                                        {admin?.importError?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
