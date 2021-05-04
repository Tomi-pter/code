import React, {useState, useEffect, useCallback} from "react";

import Input from "../shared/input";
import Dropdown from "../shared/dropdown";
import PrevIcon from "../../assets/icon/prev-green.svg";
import NextIcon from "../../assets/icon/next-white.svg";

const Address = ({ setForm, formData, navigation }) => {
  const { address, city, state, postalCode } = formData;
  const { previous, next } = navigation;
  const [isDisabled, setDisabled] = useState(true);
  const states = [
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],
    ["CT", "Connecticut"],
    ["DE", "Delaware"],
    ["DC", "District of Columbia"],
    ["FL", "Florida"],
    ["GA", "Georgia"],
    ["HI", "Hawaii"],
    ["ID", "Idaho"],
    ["IL", "Illinois"],
    ["IN", "Indiana"],
    ["IA", "Iowa"],
    ["KS", "Kansas"],
    ["KY", "Kentucky"],
    ["LA", "Louisiana"],
    ["ME", "Maine"],
    ["MD", "Maryland"],
    ["MA", "Massachusetts"],
    ["MI", "Michigan"],
    ["MN", "Minnesota"],
    ["MS", "Mississippi"],
    ["MO", "Missouri"],
    ["MT", "Montana"],
    ["NE", "Nebraska"],
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PA", "Pennsylvania"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI", "Wisconsin"],
    ["WY", "Wyoming"]
  ];

  const validation = useCallback(() => {
    address && city && state && postalCode ? setDisabled(false) : setDisabled(true);
  }, [address, city, state, postalCode])

  useEffect(() => {
    validation();
  }, [validation])

  return (
    <div className="form">
      <h4>Shipping Address</h4>
      <Input
        label="Address"
        name="address"
        type="text"
        value={address}
        onChange={setForm}
      />
      <Input label="City" name="city" type="text" value={city} onChange={setForm} />
      <Dropdown label="State" name="state" value={state} options={states} onChange={setForm} />
      <Input label="Postal Code" name="postalCode" type="text" value={postalCode} onChange={setForm} />
      <div className="d-flex align-items-center justify-content-end nav">
        <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
        <button className="next" onClick={next} disabled={isDisabled}><span>Next Step</span> <img src={NextIcon} alt="" /></button>
      </div>
    </div>
  );
};

export default Address;