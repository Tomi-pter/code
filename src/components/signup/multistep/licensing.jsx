import React, { useState, useEffect, useCallback } from 'react';

import {
    formatPhoneNumberIntl,
    isPossiblePhoneNumber,
} from "react-phone-number-input";

import Flatpickr from "react-flatpickr";
import Input from "../../shared/input";

export default function Licensing ({ formData, setFormData, navigation, onChange }) {
    const [isDisabled, setDisabled] = useState(false);

    const { next } = navigation;

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
		formData.methodOfCollection &&
        formData.stateLicenseNumber &&
        formData.stateLicenseExpirationDate
			? setDisabled(false)
			: setDisabled(true);
	}, [formData]);

    useEffect(() => {
        validation();
    }, [validation])

    return <div className="card mb-0">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0">Licensing</h2>
        </div>
        <div className="licensing-info d-flex flex-column">
            <div className="input-wrapper">
                <label>State License</label>
                <Input
                    type="text"
                    name="stateLicenseNumber"
                    label="Enter State License Number"
                    value={formData.stateLicenseNumber}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>State License Expiry Date</label>
                <Flatpickr
                    className="form-control"
                    value={formData.stateLicenseExpirationDate}
                    placeholder="State License Expiry Date"
                    options={{ minDate: "today" }}
                    onChange={([date]) => {
                        setFormData({
                            ...formData,
                            stateLicenseExpirationDate: date
                        });
                    }}
                />
            </div>
            <div className="input-wrapper">
                <label>Drug Enforcement Administration</label>
                <Input
                    type="text"
                    name="dea"
                    label="DEA (optional)"
                    value={formData.dea}
                    onChange={onChange}
                />
            </div>
            <div className="input-wrapper">
                <label>DEA Expiry Date</label>
                <Flatpickr
                    className="form-control"
                    value={formData.deaExpiry}
                    placeholder="DEA Expiry Date"
                    options={{ minDate: "today" }}
                    onChange={([date]) => {
                        setFormData({
                            ...formData,
                            deaExpiry: date
                        });
                    }}
                />
            </div>
        </div>
        <button className="next-btn" onClick={next} disabled={isDisabled}>
            <span>Proceed to Last Step</span>
        </button>
    </div>
}
