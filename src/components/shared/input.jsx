import React from "react";

const Input = ({ label, children, type, ...otherProps }) => (
  <div>
    {type === "checkbox" || type === "radio" ? (
      <>
        <div className="form-group">
          <label>
              <input className="form-control" type={type} {...otherProps} />
              {label}
          </label>
        </div>
      </>
    ) : (
      <>
        <div className="form-group">
          {/* <label>{label}</label> */}
          <input className="form-control" type={type} placeholder={label} {...otherProps} />
        </div>
      </>
    )}
  </div>
);

export default Input;