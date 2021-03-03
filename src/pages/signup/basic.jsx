import React from "react";

import Input from "../../components/shared/input";
import NextIcon from "../../assets/icon/next-white.svg";

const Basic = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, email, phone } = formData;

  const { next } = navigation;

  return (
    <div className="form">
        <h4>Basic Information</h4>
        <Input
            label="First Name"
            name="firstName"
            type ="text"
            value={firstName}
            onChange={setForm}
        />
        <Input
            label="Last Name"
            name="lastName"
            type ="text"
            value={lastName}
            onChange={setForm}
        />
        <Input
            label="Email"
            name = "email"
            type ="email"
            value={email}
            onChange={setForm}
        />
         <Input
            label="Phone number"
            name = "phone"
            type ="text"
            value={phone}
            onChange={setForm}
        />
      <div className="d-flex align-items-center justify-content-end nav basic-nav">
        <button className="next" onClick={next}><span>Next Step</span> <img src={NextIcon} alt="" /></button>
      </div>
    </div>
  );
};

export default Basic;
