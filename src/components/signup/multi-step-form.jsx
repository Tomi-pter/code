import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Basic from "./basic";
import Address from "./address";
// import Document from "./document";
import Account from "./account";
import Verification from "./verification";

const steps = [
  { id: "basic" },
  { id: "address" },
  { id: "account" },
  { id: "verification" }
];

const defaultData = {
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
  postalCode: "",
  country: "",
  countryCode: "",
  code: ""
};

const MultiStepForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "basic":
      return <Basic {...props} />;
    case "address":
      return <Address {...props} />;
    case "account":
      return <Account {...props} />;
    case "verification":
      return <Verification {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
