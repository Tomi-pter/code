import React, { useState, useRef, useEffect } from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, postAvatar, putAccount } from '../../actions/account';

export const Addresses = ({ account }) => {
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
                            <tr >
                                <td scope="row">
                                    <div className="fullName">
                                        <p>{account.accountData?.given_name + ' ' + account.accountData?.family_name}</p>
                                        <div className="defaultText"><span>Default</span></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="address">
                                        {account.accountData?.address}
                                </div>
                                </td>
                                <td>
                                    <div className="mobileNumber">
                                    {account.accountData?.phone_number}
                                </div>
                                </td>
                                <td>
                                    <div className="edit-wrapper">
                                        <img className="edit-icon" src={EditIcon} alt="" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <div>
                        <button className="addAddressButton">+ Add New Address</button>
                    </div>
                </div>
                {/* <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={account.accountData?.address || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="city">City</label>
                        <input
                            name="city"
                            type="text"
                            defaultValue={account.accountData?.['custom:city'] || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="state">State</label>
                        <input
                            name="state"
                            type="text"
                            defaultValue={account.accountData?.['custom:state'] || ''}

                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="postal_code">Postal Code</label>
                        <input
                            name="postal_code"
                            type="text"
                            defaultValue={account.accountData?.['custom:postal_code'] || ''}

                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div> */}
            </div>
        </>
    )
}