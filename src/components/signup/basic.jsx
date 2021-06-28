import React, { useState, useEffect, useCallback } from "react";
import { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input'
import InputContact from 'react-phone-number-input/input'

import Input from "../shared/input";
import NextIcon from "../../assets/icon/next-white.svg";
import SignupImage from '../../assets/img/signup-img.png';
const Basic = ({ setForm, formData, navigation }) => {
  const { givenName, familyName, phoneNumber, company } = formData;
  const { next } = navigation;
  const [isDisabled, setDisabled] = useState(true);

  const contactChange = (value) => {
    setForm({
      target: {
        name: 'phoneNumber',
        value: value
      }
    })
  }

  const validation = useCallback(() => {
    // const phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phoneNumber);
    const phoneCheck = formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber) ? true : false;
    givenName && familyName && company && phoneNumber && phoneCheck ? setDisabled(false) : setDisabled(true);
  }, [givenName, familyName, phoneNumber, company])

  useEffect(() => {
    validation();
  }, [validation])

  return (
    <div className="card mb-0">
      <div className="d-flex">
        <div className="form-container">
          <div className="form">
            <h3>Sign Up</h3>
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
              <div className="form-group">
                <InputContact
                  country="US"
                  international
                  withCountryCallingCode
                  value={phoneNumber}
                  onChange={contactChange}
                  className="form-control"
                />
              </div>
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
        </div>
        <img className="signup-img" src={SignupImage} alt="" />
      </div>
    </div>

  );
};

export default Basic;
