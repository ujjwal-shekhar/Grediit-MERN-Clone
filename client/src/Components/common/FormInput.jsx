import React from 'react';

const FormInput = ({ className, label, type, value, onChange, name, error }) => {
  return (
    <div className={className}>
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormInput;
