import React from "react";

import AccountSuccessImg from "../../assets/img/Account/register.svg";

const ApprovalPage = () => {
	return <div className="approval-page d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
            <img src={AccountSuccessImg} alt="" />
            <h2>Thank you for registering!</h2>
            <p>
                We are excited to have you as our partner! Your account verification is in progress. Please expect a response within 24-48 hours.
            </p>
            <a
                href={process.env.REACT_APP_HOMEPAGE_URL}
                className="primaryButton"
            >
                Return to Homepage
            </a>
        </div>
    </div>
};

export default ApprovalPage;
