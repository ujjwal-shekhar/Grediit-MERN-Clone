import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import FormButton from '../common/FormButton';

const contactNumberRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

const RegisterForm = ({ onSubmit }) => {
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

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError('');
  }

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    setAgeError('');
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
      const extractedNumber = contactNumber.match(/\d+/g).join('').slice(-10);
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

    if (!lastName) {
        setLastNameError('Last Name is required');
        hasError = true;
    }

    if (!age) {
        setAgeError('Age is required');
        hasError = true;
    } else if (age < 13) {
        setAgeError('Must be atleast 13 years of age.');
        hasError = true;
    }

    if (!hasError) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <FormInput 
        label="First Name"
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        name="firstName"
        error={firstNameError}
        placeholder="Enter your first name"
      />
      <FormInput 
        label="Last Name"
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
        name="lastName"
        error={lastNameError}
        placeholder="Enter your last name"
      />
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
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        name="username"
        error={usernameError}
        placeholder="Enter your username"
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
      <FormInput 
        label="Contact Number"
        type="text"
        value={contactNumber}
        onChange={handleContactNumberChange}
        name="contactNumber"
        error={contactNumberError}
        placeholder="Enter your contact number"
      />

      <FormInput 
        label="Age"
        type="number"
        value={age}
        onChange={handleAgeChange}
        name="age"
        error={ageError}
        placeholder="Enter your age"
      />
      <FormButton text="Register" type="submit" />
    </form>
  );
};

export default RegisterForm;
