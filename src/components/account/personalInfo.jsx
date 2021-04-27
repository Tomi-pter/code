import React from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';

export const PersonalInfo = ({ account }) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between profile-container">
                <div className="d-flex align-items-center">
                    <img className="profilePic mr-4" src={ProfilePic} alt="" />
                    <div>
                        <p className="mb-0 name"> {account.accountData?.given_name + ' ' + account.accountData?.family_name} </p>
                        <a href="#!" className="change-btn">Change Profile Photo</a>
                    </div>
                </div>
                <a href="#!" className="edit-btn">
                    <img src={EditIcon} alt="" />
                </a>
            </div>
            <h2 className="sub-title">Account Information</h2>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            name="first_name"
                            type="text"
                            value={account.accountData?.given_name || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            name="last_name"
                            type="text"
                            value={account.accountData?.family_name || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="email">E-mail Address</label>
                        <input
                            name="email"
                            type="email"
                            value={account.accountData?.email || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="email">Mobile Number</label>
                        <input
                            name="phone_number"
                            type="text"
                            value={account.accountData?.phone_number || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="company">Company Name</label>
                        <input
                            name="company"
                            type="text"
                            value={account.accountData?.['custom:company'] || ''}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <h2 className="sub-title">Shipping Address</h2>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            type="text"
                            value={account.accountData?.address || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="city">City</label>
                        <input
                            name="city"
                            type="text"
                            value={account.accountData?.['custom:city'] || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="state">State</label>
                        <input
                            name="state"
                            type="text"
                            value={account.accountData?.['custom:state'] || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="postal">Postal Code</label>
                        <input
                            name="postal"
                            type="text"
                            value={account.accountData?.['custom:postal_code'] || ''}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </>
    )
}