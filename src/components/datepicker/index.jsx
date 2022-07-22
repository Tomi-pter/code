import React from "react";
import "../../assets/js/flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export const DatePicker = ({ placeholder }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      data-toggle="flatpickr"
    ></input>
  );
};
