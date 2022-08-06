import React from "react";

const Input = ({ title, type, name, placeholder, handleChange, value, onFocus, disabled }) => {
  return (
    <div className="form-group mb-3">
      <small>
        <label className="text-black">{title}</label>
      </small>
      <input
        className="form-control form-control-sm"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
        onFocus={onFocus}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
