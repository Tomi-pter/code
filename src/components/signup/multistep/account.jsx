import React, { useState } from 'react';

import Input from "../../shared/input";

export default function Account ({ setForm, formData, navigation }) {
    return <div className="card mb-0">
        <div className="signup-header d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0">Create Login</h2>
        </div>
        <div className="account-info d-flex flex-column">
            <div className="input-wrapper">
                <label>Email</label>
                    <Input
                        type="email"
                        name="email"
                        label="Enter your Email"
                        // value={email}
                        // onChange={setForm}
                    />
            </div>
            <div className="input-wrapper">
                <label>Set Password</label>
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    // value={password}
                    // onChange={setForm}
                />
            </div>
            <div className="input-wrapper">
                <label>Confirm Password</label>
                <Input
                    type="password"
                    name="confirm_password"
                    label="Confirm Password"
                    // value={confirm_password}
                    // onChange={setForm}
                />
            </div>
        </div>
        <div className="checkbox-container d-flex align-items-center">
            <label>
                <input type="checkbox"/>
                I accept{" "}
                <a
                    target="_blank"
                    href="https://www.premierpharma.com/privacy-policy/"
                >
                    Terms and Conditions
                </a>
            </label>
        </div>
        <button className="next-btn">
            <span>Complete Registration</span>
        </button>
    </div>
}
