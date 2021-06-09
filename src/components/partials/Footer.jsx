import React from 'react';
import LogoWhite from '../../assets/img/logo-white.svg';
import Facebook from '../../assets/icon/facebook.svg';
import Instagram from '../../assets/icon/instagram.svg';
import Linkedin from '../../assets/icon/linkedin.svg';

export const Footer = () => {
    return (
        <div className="container-fluid d-flex align-items-center footer">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <a href={process.env.REACT_APP_HOMEPAGE_URL}>
                        <img className="logo" src={LogoWhite} width="152.25" height="46.49" alt="logo-white" />
                    </a>
                    <div className="d-flex justify-content-around align-items-center">
                        <a className='nav-link' href='https://www.facebook.com/PremierPharmaceuticalsLLC' target="_blank" rel="noopener noreferrer">
                            <img src={Facebook} alt="facebook" />
                        </a>
                        <a className='nav-link' href='https://www.linkedin.com/company/premier-pharmaceuticals' target="_blank" rel="noopener noreferrer">
                            <img src={Linkedin} alt="linkedin" />
                        </a>
                        <a className='nav-link pr-0' href='https://www.instagram.com/premierpharmaceuticals/' target="_blank" rel="noopener noreferrer">
                            <img src={Instagram} alt="instagram" />
                        </a>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center bottom-nav">
                    <a className='nav-link' href={`${process.env.REACT_APP_HOMEPAGE_URL}/privacy-policy`}>
                        Privacy Policy
                    </a>
                    <a className='nav-link' href={`${process.env.REACT_APP_HOMEPAGE_URL}/terms-conditions`}>
                        Terms and Conditions
                    </a>
                    <a className='nav-link' href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}>
                        About Us
                    </a>
                </div>
            </div>
        </div>
    );
};
