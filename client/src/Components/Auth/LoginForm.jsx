import React, { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (!hasError) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        name="email"
        error={emailError}
        placeholder="Enter your email"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        name="password"
        error={passwordError}
        placeholder="Enter your password"
      />
      <FormButton text="Log in" type="submit" />
    </form>
  );
};

export default LoginForm;
