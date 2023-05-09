import React from "react";
import { HeaderNav } from "../components/partials/HeaderNav";
import { Footer } from "../components/partials/Footer";
// import SignupImage from "../assets/img/signup-img.png";
import { Helmet } from "react-helmet";

import MultiStepForm from "../components/signup/multi-step-form";
// import { Form } from "../components/signup/form";

import Logo from "../assets/img/logo-white.svg";

export const SignUpContainer = () => {
    return <>
        <Helmet>
            <title>Sign Up | Premier Pharmaceuticals</title>
        </Helmet>
        <div className="signup container-fluid d-flex flex-column align-items-center justify-content-center">
            <div className="logo-container">
                <img height={40} src={Logo}/>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <MultiStepForm />
                {/* <Form /> */}
                {/* <div className="newsletterWrapper d-flex align-items-center justify-content-center mt-5">
                    <div className="emailWrapper">
                    <h2>Want to learn more about how Premier Pharmaceuticals can help?</h2>
                    <iframe src="https://go.pardot.com/l/906322/2021-05-28/2tw2q" width="100%" type="text/html" frameborder="0" allowTransparency="true"></iframe>

                    </div>
                </div> */}
                {/* <div className="d-flex align-items-stretch emailGroup">
                        <input type="text" className="form-control " />
                        <div className="input-group-append d-flex align-items-center">
                        <button className="" type="button">Sign up</button>
                        </div>
                    </div> */}
            </div>
        </div>
        {/* <Footer /> */}
    </>
};
