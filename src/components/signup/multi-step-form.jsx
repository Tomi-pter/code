import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Basic from "./basic";
import Address from "./address";
// import Document from "./document";
import Account from "./account";

const steps = [
  { id: "basic" },
  { id: "address" },
  { id: "account" }
];

const defaultData = {
  givenName: "",
  familyName: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  company: "",
  city: "",
  state: "",
  postalCode: ""
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
    default:
      return null;
  }
};

export default MultiStepForm;