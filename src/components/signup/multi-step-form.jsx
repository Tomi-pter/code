import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStep } from "react-hooks-helper";

import Basic from "./multistep/basic";
import Licensing from "./multistep/licensing";
import Account from "./multistep/account";

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
    console.log(formData)
    const auth = useSelector((state) => state.auth);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const props = { auth, formData, setFormData, navigation, onChange };

    switch (id) {
        case "basic":
            return <Basic {...props} />;
        case "licensing":
            return <Licensing {...props} />;
        case "account":
            return <Account {...props} />;
        default:
            return null;
    }
};

export default MultiStepForm;
