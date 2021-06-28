import React from "react";
import { HeaderNav } from '../partials/HeaderNav';
import { Footer } from '../partials/Footer';
import AccountSuccessImg from '../../assets/img/Account/account-success.png';
import { Link } from 'react-router-dom';
const ApprovalPage = () => {
    return (
        <>
            <HeaderNav />
            <div className="d-flex align-items-center justify-content-center approval-page">
                <div>
                    <div className="d-flex flex-column align-items-center justify-content-center card">
                        <img src={AccountSuccessImg} alt="" />
                        <p>Your account is going through a 24 hour approval. We will let you know once it is approved.</p>
                    </div>
                    <div className="buttonWrapper d-flex align-items-center justify-content-center">
                        <Link to={process.env.REACT_APP_HOMEPAGE_URL} className="primaryButton">
                            Continue to Home Page
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ApprovalPage;
