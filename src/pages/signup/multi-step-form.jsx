import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Basic from "./basic";
import Address from "./address";
import Document from "./document";

const steps = [
  { id: "basic" },
  { id: "address" },
  { id: "document" }
];

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  documents: []
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
    case "document":
      return <Document {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;