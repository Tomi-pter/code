import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hooks-helper";

import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { addAddresses, getAllAddresses, getAddressesById } from '../../actions/account';
import Input from '../shared/input';
import Dropdown from "../shared/dropdown";

const defaultData = {
    givenName: "",
    familyName: "",
    phoneNumber: "",
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
    const { givenName, familyName, address, city, state, postalCode, country } = formData;
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.account.addressesData);
    const validation = useCallback(() => {
        givenName && familyName && address && city && state && postalCode && country ? setDisabled(false) : setDisabled(true);
    }, [givenName, familyName, address, city, state, postalCode, country])
    const handleSubmit = () => {
        setIsLoading(true);
        setSubmitted(true);
        dispatch(addAddresses(user?.username, formData));
        dispatch(getAllAddresses(user?.username));
        console.log(formData);
    }
    
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
                <div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Full Name</th>
                                <th scope="col">Shipping Address</th>
                                <th scope="col">Mobile Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addresses?.map((item, index) => (
                                    <tr >
                                        <td scope="row">
                                            <div className="fullName">
                                                <p>{account.accountData?.given_name + ' ' + account.accountData?.family_name}</p>
                                                {/* <div className="defaultText"><span>Default</span></div> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="address">
                                                {item?.details?.address}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mobileNumber">
                                                {item?.details?.phone_number}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="edit-wrapper">
                                                <img className="edit-icon" src={EditIcon} alt="" />
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <div>
                        <button data-toggle="modal" data-target="#addAddressModal" className="addAddressButton">+ Add New Address</button>
                    </div>
                </div>
                <div className="modal fade" id="addAddressModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2 className="sub-title">Add New Address</h2>
                                <div className="row">
                                    <div className="col">
                                        <div className="password-input form-group">
                                            <label htmlFor="confirmNewPassword">First Name</label>
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
                                            <label htmlFor="confirmNewPassword">Last Name</label>
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
                                        <div className="password-input form-group">
                                            <label htmlFor="confirmNewPassword">Address</label>
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
                                            <label htmlFor="confirmNewPassword">City</label>
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
                                            <label htmlFor="confirmNewPassword">State</label>
                                            <Dropdown label="State" name="state" value={state} options={states} onChange={setForm} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="password-input form-group">
                                            <label htmlFor="confirmNewPassword">Postal Code</label>
                                            <Input
                                                label="Postal Code"
                                                name="postalCode"
                                                type="text"
                                                value={postalCode}
                                                onChange={setForm}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="password-input form-group">
                                            <label htmlFor="confirmNewPassword">Country</label>
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
                                    <button className="cancelAddressButton close" data-dismiss="modal" aria-label="Close">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}