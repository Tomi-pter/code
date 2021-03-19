import React from 'react';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';
import { Link } from "react-router-dom";

export const ErrorPage = () => {
    return (
        <>
            <HeaderNav />
            <div className="errorPage">
                <div className="container-fluid">
                    <div className="section-container position-relative d-flex flex-column align-items-center justify-content-around">
                        <div className="errorMessage flex-fill">
                            <h1 className="error-heading-text">404</h1>
                            <p className="error-subheading-text">Something went wrong</p>
                        </div>
                        <div className="buttonWrapper d-flex align-items-center justify-content-around">
                                <div>
                                    <Link to="" className="primaryButton">
                                        Back to browse
                                </Link>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}