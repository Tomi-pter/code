import React from "react";

import Input from "../../components/shared/input";
import Dropdown from "../../components/shared/dropdown";
import PrevIcon from "../../assets/icon/prev-green.svg";
import NextIcon from "../../assets/icon/next-white.svg";

const Address = ({ setForm, formData, navigation }) => {
  const { address, city, state, zip } = formData;

  const { previous, next } = navigation;

  const states = [
    ["NSW", "New South Wales"],
    ["VIC", "Victoria"],
    ["WA", "Western Australia"]
  ];

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
      <Input label="Zip" name="zip" type="text"value={zip} onChange={setForm} />
      <div className="d-flex align-items-center justify-content-end nav">
        <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
        <button className="next" onClick={next}><span>Next Step</span> <img src={NextIcon} alt="" /></button>
      </div>
    </div>
  );
};

export default Address;