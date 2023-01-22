import React from 'react';

const FormButton = ({ className, text, type, onClick, disabled }) => {
  return (
    <div className={className}>
    <button type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
    </div>
  );
};

export default FormButton;
