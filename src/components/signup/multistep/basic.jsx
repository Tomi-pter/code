import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getCountries,
    getStates,
    getMethodsOfCollection,
} from "../../../actions/auth";

import {
    formatPhoneNumberIntl,
    isPossiblePhoneNumber,
} from "react-phone-number-input";

import InputContact from 'react-phone-number-input/input'
import Input from "../../shared/input";
import Dropdown from "../../shared/dropdown";

export default function Basic ({ formData, setFormData, navigation, onChange }) {
    const auth = useSelector((state) => state.auth);

    const [countries, setCountries] = useState([]);
    const [methodsOfCollection, setMethodsOfCollection] = useState([]);
    const [states, setStates] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    const [submitted, setSubmitted] = useState(false);

    const { next } = navigation;

    const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));
    const contactChange = value => setFormData({ ...formData, phoneNumber: value });
    const apContactChange = value => setFormData({ ...formData, apPhone: value });

    const dispatch = useDispatch();
    const history = useHistory();

    const validation = useCallback(() => {
		// const phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phoneNumber);
		const phoneCheck =
			formatPhoneNumberIntl(formData.phoneNumber) &&
			isPossiblePhoneNumber(formData.phoneNumber)
				? true
				: false;

		formData.givenName &&
		formData.familyName &&
		formData.phoneNumber &&
		phoneCheck &&
		formData.company &&
		formData.address &&
		formData.city &&
		formData.postalCode &&
		formData.country &&
		formData.state &&
		formData.apEmail &&
		formData.apContact &&
		formData.apPhone &&
		formData.methodOfCollection
			? setDisabled(false)
			: setDisabled(true);
	}, [formData]);

    useEffect(() => {
        setCountries(auth?.countriesData);
        setMethodsOfCollection(auth?.methodsOfCollectionData);
    
        if (auth?.statesData?.length > 0) {
          setStates(auth?.statesData);
        }
        else {
          setStates([]);
          setFormData({ ...formData, state: "" });
        }

        setIsLoading(false);

        if (!auth.authData?.message && submitted) {
          sleep(1000).then(() => history.push("/approval-page"));
        }
        else {
          setSubmitted(false);
        }
    }, [auth]);

    useEffect(() => {
        if (formData.country === "") {
            setFormData({ ...formData, country: "United States", countryCode: "US" });
            dispatch(getStates("US"));
        }
    }, [countries]);

    useEffect(() => {
        const selectedCountry = countries?.filter((e) => e.name === formData.country);

        if (formData.country !== "" && selectedCountry) {
          const countryCode = selectedCountry[0]?.abbreviation;

          setFormData({ ...formData, countryCode });
          dispatch(getStates(countryCode));
        }
    }, [formData.country]);
    
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getMethodsOfCollection());
    }, []);

    useEffect(() => {
        validation();
    }, [validation])
    
    
    return <div className="card mb-0">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0">Become a Partner</h2>
            <span>We're happy you're here.</span>
            <div className="d-flex">
                <span>Already have an account? &nbsp;</span>
                <a href='/login'>Login</a>
            </div>
        </div>

        <div className="personal-info d-flex flex-column">
            <div className="input-wrapper">
                <label>First Name</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Enter First Name"
                    value={formData.givenName}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Last Name</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Enter Last Name"
                    value={formData.familyName}
                    onChange={onChange}
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
                    value={formData.phoneNumber}
                    onChange={contactChange}
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
                    name="company"
                    label="Company"
                    value={formData.company}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Company Address</label>
                <Input
                    type="text"
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Name of City</label>
                <Input
                    type="text"
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Postal Code</label>
                <Input
                    type="text"
                    name="postalCode"
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Country</label>
                <Dropdown
                    label="Country"
                    name="country"
                    value={formData.country}
                    options={countries}
                    onChange={onChange}
                    valueKey={"name"}
                />
            </div>

            <div className="input-wrapper">
                <label>State</label>
                <Dropdown
                    id="state"
                    label="State"
                    name="state"
                    value={formData.state}
                    options={states}
                    onChange={onChange}
                    valueKey={"code"}
                />
            </div>
        </div>

        <hr/>

        <div className="billing-info d-flex flex-column">
            <h4>Billing Info</h4>
            <div className="input-wrapper">
                <label>Accounts Payable Email</label>
                <Input
                    type="text"
                    name="apEmail"
                    label="Accounts Payable Email"
                    value={formData.apEmail}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Payable Contact</label>
                <Input
                    type="text"
                    name="apContact"
                    label="Accounts Payable Contact"
                    value={formData.apContact}
                    onChange={onChange}
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
                    value={formData.apPhone}
                    onChange={apContactChange}
                />
            </div>
            <div className="method-of-collection input-wrapper">
                <label>Preferred Collection Method</label>
                <Dropdown
                    label="Preferred Collection Method"
                    name="methodOfCollection"
                    value={formData.methodOfCollection}
                    options={methodsOfCollection}
                    onChange={onChange}
                    valueKey={"id"}
                />
            </div>
            <div className="desc">
                <p>
                  * If paying by ACH/CC, we will contact you separately for more
                  details.
                </p>
            </div>
        </div>

        <button className="next-btn" onClick={next} disabled={isDisabled}>
            <span>Next Step</span>
        </button>
    </div>
}
