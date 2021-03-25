import React from 'react';
import LogoWhite from '../../assets/img/logo-white.svg';
import Facebook from '../../assets/icon/facebook.svg';
import Google from '../../assets/icon/google.svg';
import Instagram from '../../assets/icon/instagram.svg';
import Linkedin from '../../assets/icon/linkedin.svg';
import Twitter from '../../assets/icon/twitter.svg';

export const Footer = () => {
    return (
        <div className="container-fluid d-flex align-items-center footer">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <a href="/">
                        <img className="logo" src={LogoWhite} width="203" height="62" alt="logo-white" />
                    </a>
                    <div className="d-flex justify-content-around align-items-center">
                        <a className='nav-link' href='/'>
                            <img src={Facebook} alt="facebook" />
                        </a>
                        <a className='nav-link' href='/'>
                            <img src={Twitter} alt="twitter" />
                        </a>
                        <a className='nav-link' href='/'>
                            <img src={Linkedin} alt="linkedin" />
                        </a>
                        <a className='nav-link' href='/'>
                            <img src={Google} alt="google" />
                        </a>
                        <a className='nav-link pr-0' href='/'>
                            <img src={Instagram} alt="instagram" />
                        </a>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <a className='nav-link' href='/'>
                        Privacy Policy
            </a>
                    <a className='nav-link' href='/'>
                        Terms and Conditions
            </a>
                    <a className='nav-link' href='https://getbootstrap.com/docs/4.1/components/navbar/'>
                        About Us
            </a>
                </div>
            </div>
        </div>
    );
};
