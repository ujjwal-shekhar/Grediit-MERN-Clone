import './App.css';
import { useState } from 'react';
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
  const [user, setUser] = useState(null);
  const handleTestingButton = () => {
    console.log('user', user);
  }
  return (
      <>
      <Navbar />
      {/* <button disabled={true} onClick={handleTestingButton}>Test</button> */}
      <Routes>
        <Route index element={<AuthPage user={user} setUser={setUser}/>} />
        <Route path="login" element={<AuthPage setUser={setUser}/>} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </>
    // <AuthPage />
  );
}

export default App;
