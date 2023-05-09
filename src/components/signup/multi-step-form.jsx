import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStep } from "react-hooks-helper";

import Basic from "./multistep/basic";
import Licensing from "./multistep/licensing";
import Account from "./multistep/account";

import Arrow from "../../assets/img/Account/arrow.svg"
import Step1 from "../../assets/img/Account/1-current.svg"
import Step2 from "../../assets/img/Account/2-current.svg"

import Step2Next from "../../assets/img/Account/2-next.svg"
import Step3Next from "../../assets/img/Account/3-next.svg"

import Done from "../../assets/img/Account/done.svg"
// import Basic from "./basic";
import Address from "./address";
// import Document from "./document";
// import Account from "./account";
import Verification from "./verification";

const steps = [
  { id: "basic" },
  { id: "licensing" },
  { id: "account" },
  { id: "verification" }
];

export const MultiStepForm = () => {
    const [formData, setFormData] = useState({
        givenName: "",
        familyName: "",
        email: "",
        password: "",
        confirm_password: "",
        phoneNumber: "",
        address: "",
        company: "",
        city: "",
        state: "",
        stateLicenseNumber: "",
        stateLicenseExpirationDate: "",
        dea: "",
        deaExpiry: "",
        apEmail: "",
        apContact: "",
        apPhone: "",
        methodOfCollection: "",
        postalCode: "",
        country: "",
        countryCode: "",
        code: "",
    });

    const auth = useSelector((state) => state.auth);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const props = { auth, formData, setFormData, navigation, onChange };

    switch (id) {
        case "basic":
            return <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="signup-progress d-flex align-items-center justify-content-between">
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Step1}/>
                        <span>Step 1</span>
                    </div>
                    <div>
                        <img height={14} src={Arrow}/>
                    </div>
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Step2Next}/>
                        <span>Step 2</span>
                    </div>
                    <div>
                        <img height={14} src={Arrow}/>
                    </div>
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Step3Next}/>
                        <span>Step 3</span>
                    </div>
                </div>
                <Basic {...props} />;
            </div>
        case "licensing":
            return <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="signup-progress d-flex align-items-center justify-content-between">
                        <div className="step d-flex align-items-center justify-content-center">
                            <img height={20} width={20} src={Done}/>
                            <span>Step 1</span>
                        </div>
                        <div>
                            <img height={14} src={Arrow}/>
                        </div>
                        <div className="step d-flex align-items-center justify-content-center">
                            <img height={20} width={20} src={Step2}/>
                            <span>Step 2</span>
                        </div>
                        <div>
                            <img height={14} src={Arrow}/>
                        </div>
                        <div className="step d-flex align-items-center justify-content-center">
                            <img height={20} width={20} src={Step3Next}/>
                            <span>Step 3</span>
                        </div>
                    </div>
                    <Licensing {...props} />;
                </div>
        case "account":
            return <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="signup-progress d-flex align-items-center justify-content-between">
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Done}/>
                        <span>Step 1</span>
                    </div>
                    <div>
                        <img height={14} src={Arrow}/>
                    </div>
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Done}/>
                        <span>Step 2</span>
                    </div>
                    <div>
                        <img height={14} src={Arrow}/>
                    </div>
                    <div className="step d-flex align-items-center justify-content-center">
                        <img height={20} width={20} src={Step3Next}/>
                        <span>Step 3</span>
                    </div>
                </div>
                <Account {...props} />;
            </div>
        default:
            return null;
    }
};

export default MultiStepForm;
