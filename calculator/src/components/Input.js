import React from "react";

function Input({
  id,
  value,
  min = 1,
  max = 1000,
  step,
  label,
  onChange,
  children,
}) {
  return (
    <div className="form-group">
      <input
        type="number"
        id={id}
        className="form-input"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onChange={onChange}
        required
      />
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default Input;
