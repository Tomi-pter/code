import React, { useState } from 'react';

import Input from "../../shared/input";

export default function Licensing ({ setForm, formData, navigation }) {
    const [isDisabled, setDisabled] = useState(false);

    const { previous, next } = navigation;

    return <div className="card mb-0">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0">Licensing</h2>
        </div>
        <div className="licensing-info d-flex flex-column">
            <div className="input-wrapper">
                <label>State License</label>
                <Input
                    type="text"
                    name="givenName"
                    label="Enter State License Number"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Expiry Date</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Enter License Expiry Date"
                    // onChange={handleChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Drug Enforcement Administration</label>
                <Input
                    type="text"
                    name="givenName"
                    label="DEA (optional)"
                    required
                />
            </div>
            <div className="input-wrapper">
                <label>Expiry Date</label>
                <Input
                    type="text"
                    name="familyName"
                    label="Enter DEA Expiry Date"
                    // onChange={handleChange}
                />
            </div>
        </div>
        <button className="next-btn" onClick={next} disabled={isDisabled}>
            <span>Proceed to Last Step</span>
        </button>
    </div>
}
