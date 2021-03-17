import React from 'react';
import { Header } from '../components/partials/Header';
import { Footer } from '../components/partials/Footer';
import SignupImage from '../assets/img/signup-img.png';

import MultiStepForm from "../components/signup/multi-step-form";

export const SignUp = () => {
  return (
    <>
        <Header />
        <div className="container-fluid signup">
            <div className="container">
               <div className="card mb-0">
                  <div className="d-flex">
                    <div className="form-container">
                      <h3>Sign Up</h3>
                      <MultiStepForm />
                    </div>
                    <img className="signup-img" src={SignupImage} alt="" />
                  </div>
               </div>
            </div>
        </div>
        <Footer />
    </>
  );
};