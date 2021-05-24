import React from 'react';
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import SignupImage from '../assets/img/signup-img.png';

import MultiStepForm from "../components/signup/multi-step-form";

export const SignUpContainer = () => {
  return (
    <>
      <Header />
      <div className="container-fluid d-flex align-items-center signup">
        <div className="container signup-wrapper">
          <div className="card mb-0">
            <div className="d-flex">
              <div className="form-container">
                <h3>Sign Up</h3>
                <MultiStepForm />
              </div>
              <img className="signup-img" src={SignupImage} alt="" />
            </div>
          </div>
          <div className="newsletterWrapper d-flex align-items-center justify-content-center mt-5">
            <div className="emailWrapper">
              <h2>Want to learn more about how Premier Pharmaceuticals can help?</h2>
              <div className="d-flex align-items-stretch emailGroup">
                <input type="text" className="form-control " />
                <div className="input-group-append d-flex align-items-center">
                  <button className="" type="button">Sign up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};