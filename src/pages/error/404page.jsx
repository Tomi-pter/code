import React from 'react';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import { Link } from "react-router-dom";

export const ErrorPageContainer = () => {
    return (
        <>
            <HeaderNav />
            <div className="d-flex flex-column align-items-center justify-content-center errorPage">
                <h1 className="error-heading-text">404</h1>
                <p className="error-subheading-text">Something went wrong</p>
                <Link to="/shop" className="primaryButton">
                    Back to browse
                </Link>
            </div>
            <Footer />
        </>
    )
}