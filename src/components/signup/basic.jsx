import React, { useState, useEffect, useCallback } from "react";

import Input from "../shared/input";
import NextIcon from "../../assets/icon/next-white.svg";

const Basic = ({ setForm, formData, navigation }) => {
  const { givenName, familyName, phoneNumber, company } = formData;
  const { next } = navigation;
  const [isDisabled, setDisabled] = useState(true);

  const validation = useCallback(() => {
    const phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phoneNumber);
    givenName && familyName && company && phoneNumber && phoneCheck ? setDisabled(false) : setDisabled(true);
  }, [givenName, familyName, phoneNumber, company])

  useEffect(() => {
    validation();
  }, [validation])

  return (
    <div className="form">
      <h4>Basic Information</h4>
      <div className="">
        <Input
          label="First Name"
          name="givenName"
          type="text"
          value={givenName}
          onChange={setForm}
        />
        <Input
          label="Last Name"
          name="familyName"
          type="text"
          value={familyName}
          onChange={setForm}
        />
        <Input
          label="Phone number"
          name="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={setForm}
        />
        <Input 
          label="Company" 
          name="company" 
          type="text" 
          value={company} 
          onChange={setForm} 
        />
      </div>
      <div className="d-flex align-items-center justify-content-end nav basic-nav">
        <button className="next" onClick={next} disabled={isDisabled} ><span>Next Step</span> <img src={NextIcon} alt="" /></button>
      </div>
    </div>
  );
};

export default Basic;
