import React, { useState, useEffect, useCallback } from "react";

import Input from "../shared/input";
import NextIcon from "../../assets/icon/next-white.svg";

const Basic = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, email, phone } = formData;
  const { next } = navigation;
  const [isDisabled, setDisabled] = useState(true);

  const validation = useCallback(() => {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phone);
    firstName && lastName && email && phone && emailCheck && phoneCheck ? setDisabled(false) : setDisabled(true);
  }, [firstName, lastName, email, phone])

  useEffect(() => {
    validation();
  }, [validation])

  return (
    <div className="form">
      <h4>Basic Information</h4>
      <div className="">
        <Input
          label="First Name"
          name="firstName"
          type="text"
          value={firstName}
          onChange={setForm}
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          value={lastName}
          onChange={setForm}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={setForm}
        />
        <Input
          label="Phone number"
          name="phone"
          type="text"
          value={phone}
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
