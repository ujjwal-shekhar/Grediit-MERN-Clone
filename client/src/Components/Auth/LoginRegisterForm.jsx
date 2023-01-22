import React, { useState } from 'react';
import Tabs from '../common/Tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (data) => {
    console.log('Login data: ', data);
    // code to handle login goes here
  };

  const handleRegisterSubmit = (data) => {
    console.log('Register data: ', data);
    // code to handle registration goes here
  };

  return (
    <div>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange}>
        <div label="Login">
          <LoginForm onSubmit={handleLoginSubmit} />
        </div>
        <div label="Register">
          <RegisterForm onSubmit={handleRegisterSubmit} />
        </div>
      </Tabs>
    </div>
  );
};

export default LoginRegisterForm;
