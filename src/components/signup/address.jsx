import React, { useState, useEffect, useCallback } from "react";

import Input from "../shared/input";
import Dropdown from "../shared/dropdown";
import PrevIcon from "../../assets/icon/prev-green.svg";
import NextIcon from "../../assets/icon/next-white.svg";
import { getCountries, getStates } from '../../actions/auth';
import { useDispatch, useSelector } from "react-redux";
import SignupImage from '../../assets/img/signup-img.png';
const Address = ({ setForm, formData, navigation }) => {
  const auth = useSelector((state) => state.auth);
  const { address, city, state, postalCode, country } = formData;
  const { previous, next } = navigation;
  const [isDisabled, setDisabled] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();

  const validation = useCallback(() => {
    const checkState = state === "" && states.length > 0 ? false : true;
    address && city && postalCode && country && checkState ? setDisabled(false) : setDisabled(true);
  }, [address, city, postalCode, country, state, states])

  useEffect(() => {
    validation();
  }, [validation])

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch])

  useEffect(() => {
    setCountries(auth?.countriesData);
    if (auth?.statesData?.length > 0) {
      setStates(auth?.statesData);
    } else {
      setStates([]);
      setForm({
        target: {
          name: 'state',
          value: ""
        }
      })
    }

  }, [auth])

  useEffect(() => {
    const selectedCountry = countries.filter(e => e.name === country);
    if (country !== "" && selectedCountry) {
      const countryCode = selectedCountry[0]?.abbreviation;
      setForm({
        target: {
          name: 'countryCode',
          value: countryCode
        }
      })
      dispatch(getStates(countryCode));
    }
  }, [country])

  return (
    <div className="card mb-0">
      <div className="d-flex">
        <div className="form-container">
          <div className="form">
            <h3>Sign Up</h3>
            <h4>Shipping Address</h4>
            <Input
              label="Address"
              name="address"
              type="text"
              value={address}
              onChange={setForm}
            />
            <Input label="City" name="city" type="text" value={city} onChange={setForm} />
            <Input label="Postal Code" name="postalCode" type="text" value={postalCode} onChange={setForm} />
            <Dropdown label="Country" name="country" value={country} options={countries} onChange={setForm} valueKey={'name'} />
            {country && states?.length > 0 && <Dropdown id="state" label="State" name="state" value={state} options={states} onChange={setForm} valueKey={'code'} />}
            <div className="d-flex align-items-center justify-content-end nav">
              <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
              <button className="next" onClick={next} disabled={isDisabled}><span>Next Step</span> <img src={NextIcon} alt="" /></button>
            </div>
          </div>
        </div>
        <img className="signup-img" src={SignupImage} alt="" />
      </div>
    </div>

  );
};

export default Address;