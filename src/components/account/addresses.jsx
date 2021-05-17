import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hooks-helper";

import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import DeleteIcon from '../../assets/img/Account/delete-icon.svg';
import { addAddresses, getAllAddresses, getAddressesById, deleteAddressesById } from '../../actions/account';
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
const states = [
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],
    ["CT", "Connecticut"],
    ["DE", "Delaware"],
    ["DC", "District of Columbia"],
    ["FL", "Florida"],
    ["GA", "Georgia"],
    ["HI", "Hawaii"],
    ["ID", "Idaho"],
    ["IL", "Illinois"],
    ["IN", "Indiana"],
    ["IA", "Iowa"],
    ["KS", "Kansas"],
    ["KY", "Kentucky"],
    ["LA", "Louisiana"],
    ["ME", "Maine"],
    ["MD", "Maryland"],
    ["MA", "Massachusetts"],
    ["MI", "Michigan"],
    ["MN", "Minnesota"],
    ["MS", "Mississippi"],
    ["MO", "Missouri"],
    ["MT", "Montana"],
    ["NE", "Nebraska"],
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PA", "Pennsylvania"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI", "Wisconsin"],
    ["WY", "Wyoming"]
];
export const Addresses = ({ account }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [formData, setForm] = useForm(defaultData);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectShipping, setSelectShipping] = useState(null);
    const [selectBilling, setSelectBilling] = useState(null);

    const [selectedShipping, setSelectedShipping] = useState(null);
    const [selectedBilling, setSelectedBilling] = useState(null);

    const [defaultAddress, setDefaultAddress] = useState(null);
    const [checked, setChecked] = useState(true);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const { email, mobileNumber, givenName, familyName, address, city, state, postalCode, country } = formData;
    const dispatch = useDispatch();
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const addresses = useSelector((state) => state.account.addressesData);
    const validation = useCallback(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const phoneCheck = formatPhoneNumberIntl(mobileNumber) && isPossiblePhoneNumber(mobileNumber) ? true : false;
        email && mobileNumber && phoneCheck && emailCheck && givenName && familyName && address && city && state && postalCode && country ? setDisabled(false) : setDisabled(true);
    }, [email, mobileNumber, givenName, familyName, address, city, state, postalCode, country])

    const contactChange = (value) => {
        setForm({
            target: {
                name: 'mobileNumber',
                value: value
            }
        })
    }
    const handleSubmit = () => {
        setIsLoading(true);
        setSubmitted(true);
        dispatch(addAddresses(user?.username, formData));
        sleep(500).then(() => {
            dispatch(getAllAddresses(user?.username));
            setShowModal(false);
        })
    }
    const removeAddress = (id) => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(deleteAddressesById(user?.username, id));
        sleep(500).then(() => {
            dispatch(getAllAddresses(user?.username));
        })

    };

    useEffect(() => {
        setSelectedShipping(account?.addressesData[0]);
        setDefaultAddress(account?.addressesData[0]);
        setSelectedBilling(selectedShipping);
        setSelectBilling(selectedShipping);
        setSelectShipping(selectedShipping);
        setIsLoading(false);
    }, [account,]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAllAddresses(user?.username));
    }, [dispatch]);

    useEffect(() => {
        validation();
    }, [validation])
    return (
        <>
            <div className="addressesWrapper">
                <h2 className="sub-title">My Address Book</h2>
                <div className="customer-info">
                    
                    {addresses.length > 0 ?
                        <ul className="infos-list">

                            {
                                addresses?.map((item, index) => (
                                    <li key={`key-${item.addressId}`} onClick={() => setSelectShipping(item)}>
                                        <div className={"indicator " + (selectShipping === item ? "active" : "")}>
                                            <div className="center"></div>
                                        </div>
                                        <div className="d-flex align-items-center info-container">
                                            <div className="info">
                                                <div className="d-flex align-items-center name">{item.details.givenName + " " + item?.details?.familyName} {defaultAddress === item && <div className="default">Default</div>}</div>
                                                <p>{item.details.address + " " + item.details.city + " " + item.details.country + " " + item.details.postalCode}</p>
                                                <p>{item.details.mobileNumber}</p>
                                                <p>{item.details.email}</p>
                                                {defaultAddress !== item && <button onClick={() => setDefaultAddress(item)} className="default-btn">Make Default</button>}
                                            </div>
                                            <div className="edit-wrapper" onClick={() => removeAddress(item.addressId)}>
                                                <img className="edit-icon" src={DeleteIcon} alt="" />
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        :
                        <div>
                            No Addresses
                    </div>
                    }

                </div>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <div>
                        <button className="addAddressButton" onClick={() => setShowModal(true)}>+ Add New Address</button>
                    </div>
                </div>
                <Modal id="addAddressModal" className="modalWrapper modal-dialog-centered" show={showModal} onHide={handleClose}>
                    <Modal.Body>
                        <h2 className="sub-title">Add New Address</h2>
                        
                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="givenName">First Name</label>
                                    <Input
                                        label="First Name"
                                        name="givenName"
                                        type="text"
                                        value={givenName}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="familyName">Last Name</label>
                                    <Input
                                        label="Last Name"
                                        name="familyName"
                                        type="text"
                                        value={familyName}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email">Email</label>
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="address">Phone Number</label>
                                    <InputContact
                                        country="US"
                                        international
                                        withCountryCallingCode
                                        value={mobileNumber}
                                        onChange={contactChange}
                                        className="form-control"
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
                                        value={address}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="city">City</label>
                                    <Input
                                        label="City"
                                        name="city"
                                        type="text"
                                        value={city}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="state">State</label>
                                    <Dropdown label="State" name="state" value={state} options={states} onChange={setForm} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="postalCode">Postal Code</label>
                                    <Input
                                        label="Postal"
                                        name="postalCode"
                                        type="text"
                                        value={postalCode}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="password-input form-group">
                                    <label htmlFor="country">Country</label>
                                    <Input
                                        label="Country"
                                        name="country"
                                        type="text"
                                        value={country}
                                        onChange={setForm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="button-wrapper d-flex align-items-center justify-content-end">
                            <button className="cancelAddressButton close" onClick={() => setShowModal(false)} data-dismiss="modal" aria-label="Close">
                                Cancel
                                                        </button>
                            <button className="saveAddressesButton" disabled={isDisabled} onClick={handleSubmit}>
                                Add
                                        {/* {isLoading ?
                                            <div className="spinner-border text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <>
                                                Add Card
                                                        </>
                                        } */}
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* <div className="modal fade" id="addAddressModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">

                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}