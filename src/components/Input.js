import React from "react";

const Input = ({ title, type, name, placeholder, handleChange, value }) => {
  return (
    <div className="form-group p-2">
      <small>
        <label className="text-muted">{title}</label>
      </small>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default Input;
