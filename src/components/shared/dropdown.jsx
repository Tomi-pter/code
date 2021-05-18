import React from "react";

const Dropdown = ({ label, options, ...others }) => (
  <>
    <div className="form-group">
        {/* <label>{label}</label> */}
        <select className="form-control" {...others} required>
            <option value="" disabled hidden>{label}</option>
            {options.map(([value, name], index) => (
                <option value={value} key={`key-${value}-${index}`}>{name}</option>
            ))}
        </select>
    </div>
  </>
);

export default Dropdown;