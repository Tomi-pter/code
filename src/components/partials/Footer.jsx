import React from 'react';
import Logo from '../../assets/img/footer-logo.svg';
import Facebook from '../../assets/icon/facebook.svg';
import Instagram from '../../assets/icon/instagram.svg';
import Linkedin from '../../assets/icon/linkedin.svg';

export const Footer = () => {
    return (
        <div className="footer container-fluid d-flex flex-column">
            <span className="text-md-left text-center">Join Our Partners and get exclusive access to new collections.</span>
            <div class="footer-input-container d-flex flex-md-row flex-column align-items-center">
                <input
                    className="footer-input"
                    placeholder="example@domain.com"
                    type="text"
                />
                <button>Subscribe</button>
            </div>
            <img className="footer-logo" src={Logo} alt="Footer Logo"/>
            <div className="footer-links d-flex flex-md-row flex-column align-items-center justify-content-between">
                <div className="footer-columns d-flex flex-md-row flex-column align-items-md-start align-items-center text-md-left text-center">
                    <div className="footer-column d-flex flex-column">
                        <div className="column-heading">Legal</div>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/terms-conditions`}>Terms & Conditions</a>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/terms-conditions`}>Privacy Policy</a>
                    </div>

                    <div className="footer-column d-flex flex-column">
                        <div className="column-heading">Support</div>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/faq`}>FAQs</a>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/contact-us`}>Contact Us</a>
                    </div>

                    <div className="footer-column d-flex flex-column">
                        <div className="column-heading">Company</div>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}>About Us</a>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/shop`}>Products</a>
                        <a className="footer-link" href={`${process.env.REACT_APP_BACKEND_URL}/consulting`}>Consulting</a>
                        <a className="footer-link" href={`${process.env.REACT_APP_HOMEPAGE_URL}/careers`}>Careers</a>
                    </div>
                </div>
                <div className="social-links d-flex flex-column">
                    <div className="social-link d-flex align-items-center">
                        <img src={Facebook} alt="facebook" />
                        <a href='https://www.facebook.com/PremierPharmaceuticalsLLC' target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>
                    </div>
                    <div className="social-link d-flex align-items-center">
                        <img src={Instagram} alt="instagram" />
                        <a href='https://www.instagram.com/premierpharmaceuticals/' target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                    </div>
                    <div className="social-link d-flex align-items-center">
                        <img src={Linkedin} alt="linkedin" />
                        <a href='https://www.linkedin.com/company/premier-pharmaceuticals' target="_blank" rel="noopener noreferrer">
                            Linkedin
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

{/* <div className="container-fluid d-flex align-items-center footer">
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
                Privacy Policy / Terms and Conditions
            </a>
            {/* <a className='nav-link' href={`${process.env.REACT_APP_HOMEPAGE_URL}/terms-conditions`}>
                Terms and Conditions
            </a> */}
            {/*<a className='nav-link' href={`${process.env.REACT_APP_HOMEPAGE_URL}/about-us`}>
                About Us
            </a>
        </div>
    </div>
</div> */}