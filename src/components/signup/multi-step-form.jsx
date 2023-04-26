import React from "react";
import { useForm, useStep } from "react-hooks-helper";

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
    case "licensing":
      return <Licensing {...props} />;
    case "account":
      return <Account {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
