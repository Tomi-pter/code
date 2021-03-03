import React from 'react';
import '../../assets/js/flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export const DatePicker = () => {
  return (
    <input
      type='text'
      class='form-control'
      placeholder='Flatpickr example'
      data-toggle='flatpickr'
    ></input>
  );
};
