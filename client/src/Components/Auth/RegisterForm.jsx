import React, { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

const contactNumberRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
    setContactNumberError('');
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError('');
  }

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

    if (!contactNumber) {
      setContactNumberError('Contact Number is required');
      hasError = true;
    } else if (!contactNumberRegex.test(contactNumber)) {
      setContactNumberError('Contact Number is invalid');
      hasError = true;
    } else {
      const extractedNumber = phoneNumber.match(/\d+/g).join('').slice(-10);
      setContactNumber(extractedNumber);
      setContactNumberError('');
    }

    if (!username) {
        setUsernameError('Username is required');
        hasError = true;
    }

    if (!firstName) {
        setFirstNameError('First Name is required');
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
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        name="password"
        error={passwordError}
      />
      <FormInput 
        label="Contact Number"
        type="text"
        value={contactNumber}
        onChange={handleContactNumberChange}
        name="contactNumber"
        error={contactNumberError}
      />
      <FormInput 
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        name="username"
        error={usernameError}
      />
      <FormButton text="Log in" type="submit" />
    </form>
  );
};

export default LoginForm;
