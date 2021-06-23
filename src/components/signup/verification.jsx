import React from "react";
import { Link } from 'react-router-dom';

const Verification = ({ formData }) => {
    const { email } = formData;

    return (
        <div className="form">
            <h4>Account Verification</h4>
            <p>Your account {email} is now pending for approval by the admin</p>
            <div className="d-flex align-items-center justify-content-end nav verify">
                <Link to="/login">
                    <button className="submit">
                        Back to login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Verification;
