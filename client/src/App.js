import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './Components/pages/AuthPage';
import Profile from './Components/pages/Profile.jsx';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

import Navbar from './Components/Dashboard/Navbar/Navbar.jsx';
import Followers from './Components/pages/Followers.jsx';
import Following from './Components/pages/Following.jsx';
import SubGreddiit from './Components/pages/SubGreddiit.jsx';

import jwt_decode from 'jwt-decode';
import MiniSubgreddiitCard from './Components/Subgreddiits/MiniSubgreddiitCard';
import UserSubgreddiits from './Components/pages/UserSubgreddiits';
import Unauthorized from './Components/pages/Unauthorized';
import AllSubgreddiits from './Components/pages/AllSubgreddiits';

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
// <3
const App = () => {
  // localStorage.clear()
  const [user, setUser] = useState(null);
  const [toRender, setToRender] = useState(false);
  const handleTestingButton = () => {
    console.log('user', user);
    // console.log((jwt_decode(localStorage.getItem("token"))._doc));
  }
  useEffect(() => {
    const loggedInUser = (localStorage.getItem("token"));
    if (loggedInUser) {
      const foundUser = (jwt_decode(loggedInUser))._doc;
      setUser(foundUser);
      console.log("onload ", user);
    }
    setToRender(true);
  }, []); 

  if (!toRender) return (<>Loading...</>);

  return (
      <>
      {user && <Navbar user={user} setUser={setUser}/>}
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
                      <Profile user={user} perms={"AUTH"}/>
                     </ProtectedRoute>}
        />

        <Route 
            path="/profile/:username/*"   
            element={<ProtectedRoute user={user}>
                    <Profile user={user} perms={"VIEW"}/>
                    </ProtectedRoute>}
        />
            
        <Route path="/profile/followers" 
              element={<ProtectedRoute user={user}>
                        <Followers user={user}/>
                      </ProtectedRoute>} 
        />
        <Route path="/profile/following" 
              element={<ProtectedRoute user={user}>
                        <Following user={user}/>
                      </ProtectedRoute>} 
        />

        <Route path="/subgreddiits/:subgreddiitName/*" 
              element={<ProtectedRoute user={user}>
                        <SubGreddiit />
                      </ProtectedRoute>} 
        />

        <Route path="/subgreddiits/my" 
              element={<ProtectedRoute user={user}>
                        <UserSubgreddiits user={user}/>
                      </ProtectedRoute>} 
        />

        <Route path="/subgreddiits/*" 
              element={<ProtectedRoute user={user}>
                        <AllSubgreddiits />
                      </ProtectedRoute>} 
        />
         
        <Route path="/unauthorized/*" 
              element={<ProtectedRoute user={user}>
                        <Unauthorized />
                      </ProtectedRoute>} 
        />
         {/* <Route path="/subgreddiits/sample" element={<SubGreddiit />}/> */}
      </Routes>
      </>
  );
}

export default App;
