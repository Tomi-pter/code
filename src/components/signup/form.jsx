import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import InputContact from "react-phone-number-input/input";

import Input from "../shared/input";
import Dropdown from "../shared/dropdown";

import { getCountries, getStates, getMethodsOfCollection } from "../../actions/auth";
import { signUp } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

import CheckGreen from "../../assets/icon/check-lgreen.svg";
import XGray from "../../assets/icon/x-gray.svg";
import SignupImage from "../../assets/img/signup-img.png";
import PPLogo from "../../assets/img/pp-logo.svg";

import Flatpickr from "react-flatpickr";
import moment from "moment";

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
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Form = () => {
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(defaultData);
  const [countries, setCountries] = useState([]);
  const [methodsOfCollection, setMethodsOfCollection] = useState([])
  const [states, setStates] = useState([]);
  const checkPasswordLenght = formData.password.length >= 8 ? true : false;
  const checkLetters = /^(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  const checkNumber = /^(?=.*[0-9])/.test(formData.password);
  const checkCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
    formData.password
  );
  const checkConfirmation =
    formData.password !== "" &&
    formData.confirm_password.includes(formData.password);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactChange = (value) =>
    setFormData({ ...formData, phoneNumber: value });
  const apContactChange = (value) =>
    setFormData({ ...formData, apPhone: value });

  const submit = () => {
    setIsLoading(true);
    setSubmitted(true);
    //State License Number & Expiration is required
    let form = {
        ...formData,
        stateLicenseExpirationDate: moment(formData.stateLicenseExpirationDate).format('YYYY-MM-DD')
    }
    //DEA Number & Expiration is optional
    if (formData.deaExpiry !== '') {
        form.deaExpiry = moment(formData.stateLicenseExpirationDate).format('YYYY-MM-DD')
    }

    dispatch(signUp(form))
  };

  useEffect(() => {
    setCountries(auth?.countriesData);
    setMethodsOfCollection(auth?.methodsOfCollectionData);

    if (auth?.statesData?.length > 0) {
      setStates(auth?.statesData);
    } else {
      setStates([]);
      setFormData({ ...formData, state: "" });
    }
    setIsLoading(false);
    if (!auth.authData?.message && submitted) {
      sleep(1000).then(() => history.push("/approval-page"));
    } else {
      setSubmitted(false);
    }
  }, [auth]);

  useEffect(() => {
    if (formData.country === "") {
      setFormData({ ...formData, country: "United States", countryCode: "US" });
      dispatch(getStates("US"));
    }
  }, [countries]);

  useEffect(() => {
    const {
      givenName,
      familyName,
      phoneNumber,
      company,
      address,
      city,
      state,
      postalCode,
      country,
      stateLicenseNumber,
      stateLicenseExpirationDate,
      email,
      password,
      confirm_password,
    } = formData;
    const phoneCheck =
      formatPhoneNumberIntl(phoneNumber) && isPossiblePhoneNumber(phoneNumber)
        ? true
        : false;
    const checkState = state === "" && states.length > 0 ? false : true;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordCheck =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[A-Za-z\d `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/.test(
        password
      );
    const passwordConfirm = password === confirm_password ? true : false;
    givenName &&
    familyName &&
    company &&
    phoneNumber &&
    phoneCheck &&
    address &&
    city &&
    postalCode &&
    country &&
    checkState &&
    stateLicenseNumber &&
    stateLicenseExpirationDate &&
    email &&
    password &&
    emailCheck &&
    passwordCheck &&
    passwordConfirm
      ? setDisabled(false)
      : setDisabled(true);
  }, [formData]);

  useEffect(() => {
    const selectedCountry = countries?.filter(
      (e) => e.name === formData.country
    );
    if (formData.country !== "" && selectedCountry) {
      const countryCode = selectedCountry[0]?.abbreviation;
      setFormData({ ...formData, countryCode });
      dispatch(getStates(countryCode));
    }
  }, [formData.country]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getMethodsOfCollection());
  }, []);

  return (
    <div className="card mb-0">
      <div className="d-flex">
        <div className="form-container">
          <div className="form">
            <h3 className="text-center">Getting Started</h3>
            <div className="text-center desc">
              <p>
                <b>We're happy you're here.</b>
              </p>
              <p>
                Don't have an account? <b>Enter your information below.</b>
              </p>
              <p>
                Have an account? <Link to="/login">Sign in here.</Link>
              </p>
            </div>
            <div className="">
                {console.log(formData)}
              <Input
                label="First Name"
                name="givenName"
                type="text"
                value={formData.givenName}
                onChange={onChange}
              />
              <Input
                label="Last Name"
                name="familyName"
                type="text"
                value={formData.familyName}
                onChange={onChange}
              />
              <div className="form-group">
                <InputContact
                  country="US"
                  international
                  withCountryCallingCode
                  value={formData.phoneNumber}
                  onChange={contactChange}
                  className="form-control"
                />
              </div>
              <Input
                label="Company"
                name="company"
                type="text"
                value={formData.company}
                onChange={onChange}
              />
              <Input
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={onChange}
              />
              <Input
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={onChange}
              />
              <Input
                label="Postal Code"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={onChange}
              />
              <Dropdown
                label="Country"
                name="country"
                value={formData.country}
                options={countries}
                onChange={onChange}
                valueKey={"name"}
              />
              <Dropdown
                id="state"
                label="State"
                name="state"
                value={formData.state}
                options={states}
                onChange={onChange}
                valueKey={"code"}
              />
              <div class="dropdown-divider mb-4"></div>
              <Input
                label="State License #"
                name="stateLicenseNumber"
                type="text"
                value={formData.stateLicenseNumber}
                onChange={onChange}
              />
              <div className="form-group">
                <Flatpickr
                  className="form-control"
                  value={formData.stateLicenseExpirationDate}
                  placeholder="State License Expiry Date"
                  options={{ minDate: 'today' }}
                  onChange={([date]) => {
                    setFormData({
                      ...formData,
                      stateLicenseExpirationDate: date,
                    });
                  }}
                />
              </div>
              <Input
                label="DEA (Optional)"
                name="dea"
                type="text"
                value={formData.dea}
                onChange={onChange}
              />
              <div className="form-group">
                <Flatpickr
                  className="form-control"
                  value={formData.deaExpiry}
                  placeholder="DEA Expiry Date"
                  options={{ minDate: 'today' }}
                  onChange={([date]) => {
                    setFormData({
                      ...formData,
                      deaExpiry: date,
                    });
                  }}
                />
              </div>
              <div class="dropdown-divider mb-4"></div>
              <Input
                label="Accounts Payable Email"
                name="apEmail"
                type="text"
                value={formData.apEmail}
                onChange={onChange}
              />
              <Input
                label="Accounts Payable Contact"
                name="apContact"
                type="text"
                value={formData.apContact}
                onChange={onChange}
              />
              <div className="form-group">
                <InputContact
                  country="US"
                  international
                  withCountryCallingCode
                  value={formData.apPhone}
                  onChange={apContactChange}
                  className="form-control"
                />
              </div>
              <Dropdown
                label="Preferred Collection Method"
                name="methodOfCollection"
                value={formData.methodOfCollection}
                options={methodsOfCollection}
                onChange={onChange}
                valueKey={"id"}
              />
              <div className="desc">
                <p>
                    * If paying by ACH/CC, we will contact you separately for more details.
                </p>
              </div>
              <div class="dropdown-divider mb-4"></div>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
              />
              <div className="form-group password-container">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={onChange}
                />
                <p
                  className={
                    "password-validation " +
                    (checkPasswordLenght ? "valid" : "")
                  }
                >
                  {checkPasswordLenght ? (
                    <img src={CheckGreen} alt="" />
                  ) : (
                    <img src={XGray} alt="" />
                  )}{" "}
                  Use 8 or more characters
                </p>
                <p
                  className={
                    "password-validation " + (checkLetters ? "valid" : "")
                  }
                >
                  {checkLetters ? (
                    <img src={CheckGreen} alt="" />
                  ) : (
                    <img src={XGray} alt="" />
                  )}{" "}
                  Use upper and lower case letters
                </p>
                <p
                  className={
                    "password-validation " + (checkNumber ? "valid" : "")
                  }
                >
                  {checkNumber ? (
                    <img src={CheckGreen} alt="" />
                  ) : (
                    <img src={XGray} alt="" />
                  )}{" "}
                  Use a number (e.g. 1234)
                </p>
                <p
                  className={
                    "password-validation " + (checkCharacter ? "valid" : "")
                  }
                >
                  {checkCharacter ? (
                    <img src={CheckGreen} alt="" />
                  ) : (
                    <img src={XGray} alt="" />
                  )}{" "}
                  Use a symbol (e.g. !@#$)
                </p>

                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={onChange}
                />
                <p
                  className={
                    "password-validation " + (checkConfirmation ? "valid" : "")
                  }
                >
                  {checkConfirmation ? (
                    <>
                      <img src={CheckGreen} alt="" />
                      Input password matched
                    </>
                  ) : (
                    <>
                      <img src={XGray} alt="" />
                      Input password does not matched
                    </>
                  )}{" "}
                </p>
              </div>
              <div>
                <label className="checkbox">
                  I accept{" "}
                  <a
                    target="_blank"
                    href="https://www.premierpharma.com/privacy-policy/"
                  >
                    Terms and Conditions
                  </a>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p
                className={
                  "text-center error " +
                  (auth.authData?.message ? "alert-danger" : "")
                }
              >
                {auth.authData?.message}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-end nav">
              <button
                className="submit"
                onClick={submit}
                disabled={isDisabled || !acceptTerms}
              >
                {isLoading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "SUBMIT"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column signup-img">
          <img className="logo" src={PPLogo} alt="" />
          <p>The pharmaceutical wholesaler you trust.</p>
        </div>
        {/* <img className="signup-img" src={SignupImage} alt="" /> */}
      </div>
    </div>
  );
};
