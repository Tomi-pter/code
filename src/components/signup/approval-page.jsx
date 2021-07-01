import React from "react";
import { HeaderNav } from '../partials/HeaderNav';
import { Footer } from '../partials/Footer';
import AccountSuccessImg from '../../assets/img/Account/account-success.png';
const ApprovalPage = () => {
    return (
        <>
            <HeaderNav />
            <div className="d-flex align-items-center justify-content-center approval-page">
                <div>
                    <div className="d-flex flex-column align-items-center justify-content-center card">
                        <img src={AccountSuccessImg} alt="" />
                        <p>Thank you for creating an account with Premier Pharmaceuticals. We are currently reviewing your account and will notify you within 1 business day once it is approved.</p>
                    </div>
                    <div className="buttonWrapper d-flex align-items-center justify-content-center">
                        <a href={process.env.REACT_APP_HOMEPAGE_URL} className="primaryButton">
                            Continue to Home Page
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ApprovalPage;
