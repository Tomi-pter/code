import React, { useState, useEffect, useCallback } from 'react';

import InputContact from 'react-phone-number-input/input'

import Input from "../../shared/input";

export default function Basic ({ setForm, formData, navigation }) {
    const [isDisabled, setDisabled] = useState(false);

    const { next } = navigation;

    return <div className="card mb-0">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0">Become a Partner</h2>
            <span>We're happy you're here.</span>
            <div className="d-flex">
                <span>Already have an account? &nbsp;</span>
                <a>Login</a>
            </div>
        </div>

        <div className="personal-info d-flex flex-column">
            <div className="input-wrapper">
                <label>First Name</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Enter First Name"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Last Name</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Enter Last Name"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Phone Number</label>
                <InputContact
                    className="form-control"
                    country="US"
                    international
                    withCountryCallingCode
                    //   onChange={contactChange}
                    //   value={phoneNumber}
                />
            </div>
        </div>

        <hr/>

        <div className="company-info d-flex flex-column">
            <h4>Company Info</h4>
            <div className="input-wrapper">
                <label>Company Name</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Company"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Company Address</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Address"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Name of City</label>
                <Input
                    type="text"
                    name="givenName"
                    label="City"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Postal Code</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Postal Code"
                    // onChange={handleChange}
                    required
                />
            </div>
        </div>

        <hr/>

        <div className="billing-info d-flex flex-column">
            <h4>Billing Info</h4>
            <div className="input-wrapper">
                <label>Company Name</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Company"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Payable Contact</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Accounts Payable Email"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Payable Contact</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Accounts Payable Contact"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Phone Number</label>
                <InputContact
                    className="form-control"
                    country="US"
                    international
                    withCountryCallingCode
                    //   onChange={contactChange}
                    //   value={phoneNumber}
                />
            </div>
        </div>

        <button className="next-btn" onClick={next} disabled={isDisabled}>
            <span>Next Step</span>
        </button>
    </div>
}
