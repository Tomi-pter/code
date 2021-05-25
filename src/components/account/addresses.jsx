import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import EditIcon from '../../assets/img/Account/edit-icon.svg';
import DeleteIcon from '../../assets/img/Account/delete-icon.svg';
import { addAddresses, getAllAddresses, deleteAddressesById, updateAddressesById, makeDefaultAddress } from '../../actions/account';
import { getCountries, getStates } from '../../actions/auth';
import Input from '../shared/input';
import Dropdown from "../shared/dropdown";

import { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input'
import InputContact from 'react-phone-number-input/input';

const defaultData = {
    givenName: "",
    familyName: "",
    email: "",
    mobileNumber: "",
    address: "",
    company: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
};

export const Addresses = ({ account }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const auth = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(defaultData);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [isDefaultSelected, setIsDefaultSelected] = useState(null);
    const [isDefaultLoading, setIsDefaultLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const dispatch = useDispatch();

    const validation = useCallback(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const phoneCheck = formatPhoneNumberIntl(formData.mobileNumber) && isPossiblePhoneNumber(formData.mobileNumber) ? true : false;
        const checkState = formData.state === "" && states.length > 0 ? false : true;
        formData.email !== "" && formData.mobileNumber !== "" && phoneCheck && emailCheck && formData.givenName !== "" && formData.familyName !== "" && formData.address !== "" && formData.city !== "" && formData.postalCode !== "" && formData.country !== "" && checkState ? setDisabled(false) : setDisabled(true);
    }, [formData, states]);

    const handleMakeDefaultAddress = (address) => {
        setIsDefaultSelected(address);
        setIsDefaultLoading(true);
        dispatch(makeDefaultAddress(user?.username, address.addressId));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const contactChange = (value) => {
        setFormData({...formData, mobileNumber: value});
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(defaultData);
        setStates([]);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        isEdit ? dispatch(updateAddressesById(user?.username, selectedAddress.addressId, formData)) : dispatch(addAddresses(user?.username, formData));
    }

    const addAddress = () => {
        setIsEdit(false);
        setShowModal(true);
    }

    const editAddress = (address) => {
        setIsEdit(true);
        setSelectedAddress(address);
        setFormData({
            givenName: address.details.givenName,
            familyName: address.details.familyName,
            email: address.details.email,
            mobileNumber: address.details.mobileNumber,
            address: address.details.address,
            company: address.details.company,
            city: address.details.city,
            postalCode: address.details.postalCode,
            country: address.details.country,
            state: address.details.state
        });
        setShowModal(true);
    };

    const removeAddress = (address) => {
        setIsDeleteLoading(true);
        setSelectedAddress(address);
        dispatch(deleteAddressesById(user?.username, address.addressId));
    };

    useEffect(() => {
        const isDefaultAddress = account?.addressesData?.find(address => address.isDefault === true);
        setDefaultAddress(isDefaultAddress);
        setShowModal(false);
        setFormData(defaultData);
        setSelectedAddress(null);
        setIsLoading(false);
        setIsDefaultSelected(null);
        setIsDefaultLoading(false);
        setIsEdit(false);
        setIsDeleteLoading(false);
        setStates([]);
    }, [account]);

    useEffect(() => {
        setCountries(auth?.countriesData);
        if (auth?.statesData?.length > 0) {
          setStates(auth?.statesData);
        } else {
          setStates([]);
          formData.state = "";
        }
    }, [auth])

    useEffect(() => {
        const selectedCountry = countries.filter(e => e.name === formData.country);
        if (formData.country !== "" && selectedCountry) dispatch(getStates(selectedCountry[0]?.id));
    }, [formData.country])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAllAddresses(user?.username));
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        validation();
    }, [validation]);

    return (
        <div className="addressesWrapper">
            <h2 className="sub-title">My Address Book</h2>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Address Details</th>
                        <th scope="col" className="d-none d-lg-table-cell"></th>
                        <th scope="col" className="d-none d-lg-table-cell"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        account?.addressesData?.map((item, index) => (
                            <tr key={index}>
                                <td className="w-100">
                                    <p className="mb-0">{item?.details?.givenName + ' ' + item?.details?.familyName}</p>
                                    <p className="mb-0">{item?.details?.address}</p>
                                    <p className="mb-0">{item?.details?.mobileNumber}</p>
                                    <div className="d-flex d-lg-none mt-5 align-items-center justify-content-between">
                                        <div>
                                            {defaultAddress?.addressId === item?.addressId && <div className="default">Default</div>}
                                            {defaultAddress?.addressId !== item?.addressId &&
                                                <button className="default-btn" onClick={() => handleMakeDefaultAddress(item)}>
                                                    {
                                                        isDefaultLoading && isDefaultSelected?.addressId === item.addressId ?
                                                            <div className="spinner-border text-success" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            : "Make Default"
                                                    }
                                                </button>
                                            }
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="edit-wrapper mr-4" onClick={() => editAddress(item)}>
                                                <img className="edit-icon" src={EditIcon} alt="" />
                                            </div>
                                            {isDeleteLoading && selectedAddress.addressId === item.addressId ?
                                                <div className="spinner-border text-danger delete-spinner" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <div className="edit-wrapper" onClick={() => removeAddress(item)}>
                                                    <img className="delete-icon" src={DeleteIcon} alt="" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td className="d-none d-lg-table-cell">
                                    {defaultAddress?.addressId === item?.addressId && <div className="default">Default</div>}
                                    {defaultAddress?.addressId !== item?.addressId &&
                                        <button className="default-btn" onClick={() => handleMakeDefaultAddress(item)}>
                                            {
                                                isDefaultLoading && isDefaultSelected?.addressId === item.addressId ?
                                                    <div className="spinner-border text-success" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    : "Make Default"
                                            }
                                        </button>
                                    }
                                </td>
                                <td className="d-none d-lg-table-cell">
                                    <div className="d-flex align-items-center">
                                        <div className="edit-wrapper mr-4" onClick={() => editAddress(item)}>
                                            <img className="edit-icon" src={EditIcon} alt="" />
                                        </div>
                                        {isDeleteLoading && selectedAddress.addressId === item.addressId ?
                                            <div className="spinner-border text-danger delete-spinner" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <div className="edit-wrapper" onClick={() => removeAddress(item)}>
                                                <img className="delete-icon" src={DeleteIcon} alt="" />
                                            </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    { !account?.addressesData && account?.addressesData?.length === 0 &&
                        <tr>
                            <td colSpan="3" className="text-center">No Addresses</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="col-12 d-flex align-items-center justify-content-end">
                <div>
                    <button className="addAddressButton" onClick={() => addAddress()}>+ Add New Address</button>
                </div>
            </div>

            <Modal id="addAddressModal" className="modalWrapper modal-dialog-centered" show={showModal} onHide={handleCloseModal}>
                <Modal.Body>
                    <h2 className="sub-title">{isEdit ? 'Edit Address' : 'Add New Address'}</h2>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="givenName">First Name</label>
                                <Input
                                    label="First Name"
                                    name="givenName"
                                    type="text"
                                    value={formData.givenName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="familyName">Last Name</label>
                                <Input
                                    label="Last Name"
                                    name="familyName"
                                    type="text"
                                    value={formData.familyName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <label htmlFor="email">Email</label>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="address">Phone Number</label>
                                <InputContact
                                    country="US"
                                    international
                                    withCountryCallingCode
                                    value={formData.mobileNumber}
                                    className="form-control"
                                    onChange={contactChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="password-input form-group">
                                <label htmlFor="address">Address</label>
                                <Input
                                    label="Address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="city">City</label>
                                <Input
                                    label="City"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="postalCode">Postal Code</label>
                                <Input
                                    label="Postal"
                                    name="postalCode"
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="country">Country</label>
                                <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} valueKey={'name'} />
                                {/* <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} /> */}
                            </div>
                        </div>
                        {states?.length > 0 && 
                            <div className="col-12 col-sm-6">
                                <div className="password-input form-group">
                                    <label htmlFor="state">State</label>
                                    <Dropdown id="state" label="State" name="state" value={formData.state} options={states} onChange={handleChange} valueKey={'code'} />
                                    {/* <Dropdown label="State" name="state" value={formData.state} options={states} onChange={handleChange} /> */}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="button-wrapper d-flex align-items-center justify-content-end">
                        <button className="cancelAddressButton close" onClick={handleCloseModal} data-dismiss="modal" aria-label="Close">
                            Cancel
                        </button>
                        <button className={"saveAddressesButton " + (isLoading ? 'loading' : '')} onClick={handleSubmit}  disabled={isDisabled && !isLoading}>
                            {isLoading ?
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                isEdit ? 'Save' : 'Add'
                            }
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}