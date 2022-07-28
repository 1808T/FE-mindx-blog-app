import React from "react";

const Input = ({ title, type, name, placeholder, handleChange, value, onFocus }) => {
  return (
    <div className="form-group p-2">
      <small>
        <label className="text-black">{title}</label>
      </small>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Input;
