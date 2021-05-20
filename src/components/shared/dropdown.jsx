import React from "react";

const Dropdown = ({ id, label, options, valueKey, ...others }) => (
  <>
    <div className="form-group">
        <select id="id" className="form-control" {...others} required>
            <option value="" disabled hidden>{label}</option>
            {options && options.map((option, index) => (
                option.name !== 'Unknown' && <option value={option[valueKey]} key={`key-${option.id}-${index}`}>{option.name}</option>
            ))}
        </select>
    </div>
  </>
);

export default Dropdown;