import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './Components/pages/AuthPage';
import Profile from './Components/pages/Profile.jsx';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

import Navbar from './Components/Dashboard/Navbar/Navbar.jsx';
import Followers from './Components/pages/Followers.jsx';
import Following from './Components/pages/Following.jsx';


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
      {user && <Navbar setUser={setUser}/>}
      {/* <button onClick={handleTestingButton}>Test</button> */}
      <Routes>
        <Route path='/' element={
          user ? 
                <Navigate replace to="/profile" /> :
                <AuthPage user={user} setUser={setUser} />
        } />

        <Route path="/login" element={
        user ? 
              <Navigate replace to="/profile" /> :
              <AuthPage user={user} setUser={setUser} />
        } />

        <Route 
            path="/profile/*"   
            element={<ProtectedRoute user={user}>
                      <Profile />
                     </ProtectedRoute>}
        />
            
        <Route path="/profile/followers" 
              element={<ProtectedRoute user={user}>
                        <Followers />
                      </ProtectedRoute>} 
        />
        <Route path="/profile/following" 
              element={<ProtectedRoute user={user}>
                        <Following />
                      </ProtectedRoute>} 
        />
         
      </Routes>
      </>
  );
}

export default App;
