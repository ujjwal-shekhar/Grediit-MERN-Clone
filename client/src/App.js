import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './Components/pages/AuthPage';
import Profile from './Components/pages/Profile.jsx';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

import Navbar from './Components/Dashboard/Navbar/Navbar.jsx';

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const App = () => {
  // localStorage.clear()
  const [user, setUser] = useState(null);
  const handleTestingButton = () => {
    console.log('user', user);
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  return (
      <>
      <Navbar setUser={setUser}/>
      <button onClick={handleTestingButton}>Test</button>
      <Routes>
        <Route index element={
          user ? <Profile /> :
          <AuthPage user={user} setUser={setUser}/>
        } />
        <Route path="login" element={
          user ? <Profile /> :
          <AuthPage user={user} setUser={setUser}/>
        } />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </>
  );
}

export default App;
