import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './Components/pages/AuthPage';
import Profile from './Components/pages/Profile.jsx';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

import Navbar from './Components/Dashboard/Navbar/Navbar.jsx';
import Followers from './Components/pages/Followers.jsx';
import Following from './Components/pages/Following.jsx';
import SubGreddiit from './Components/pages/SubGreddiit.jsx';
import ChatRoom from './Components/pages/ChatRoom.jsx';

import jwt_decode from 'jwt-decode';
import MiniSubgreddiitCard from './Components/Subgreddiits/SG_Page_Components/MiniSubgreddiitCard';
import UserSubgreddiits from './Components/pages/UserSubgreddiits';
import Unauthorized from './Components/pages/Unauthorized';
import AllSubgreddiits from './Components/pages/AllSubgreddiits';
import SavedPosts from './Components/pages/SavedPosts';

import Loading from './Components/pages/Loading';

import axios from 'axios';

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
  // const [loggedInUser, setLoggedInUser] = useState(null);
  const [toRender, setToRender] = useState(false);
  const handleTestingButton = () => {
    console.log('user', user);
    // console.log((jwt_decode(localStorage.getItem("token"))._doc));
  }
  useEffect(() => {
    const loggedInUser= localStorage.getItem("token");
    // console.log("loggedInUser", loggedInUser);
    if (loggedInUser) {
      console.log("entered")
      const tempUser = jwt_decode(loggedInUser)._doc;
      console.log("tempUser : ", tempUser);
      // console.log("foundUser : ", foundUser);
      axios.get(
        "http://localhost:8080/users/" + tempUser.username,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
        .then(res => {
          console.log("res.data ", res.data);
          setUser(res.data);
          setToRender(true);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setToRender(true);
    }
    // setToRender(true);
}, []);

  if (!toRender) return (<Loading />);

  return (
    <>
      {user && <Navbar user={user} setUser={setUser} />}
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
            <Profile user={user} setUser={setUser} perms={"AUTH"} />
          </ProtectedRoute>}
        />

        <Route
          path="/profile/:username/*"
          element={<ProtectedRoute user={user}>
            <Profile user={user} setUser={setUser} perms={"VIEW"} />
          </ProtectedRoute>}
        />

        <Route path="/profile/followers"
          element={<ProtectedRoute user={user}>
            <Followers user={user} />
          </ProtectedRoute>}
        />
        <Route path="/profile/following"
          element={<ProtectedRoute user={user}>
            <Following user={user} />
          </ProtectedRoute>}
        />

        <Route path="/subgreddiits/:subgreddiitName/*"
          element={<ProtectedRoute user={user}>
            <SubGreddiit />
          </ProtectedRoute>}
        />

        <Route path="/subgreddiits/my"
          element={<ProtectedRoute user={user}>
            <UserSubgreddiits user={user} />
          </ProtectedRoute>}
        />

        <Route path="/subgreddiits/*"
          element={<ProtectedRoute user={user}>
            <AllSubgreddiits user={user} />
          </ProtectedRoute>}
        />

        <Route path="/saved_posts/*"
          element={<ProtectedRoute user={user}>
            <SavedPosts user={user}/>
          </ProtectedRoute>}
        />
        <Route path="/chat_room/*"
          element={<ProtectedRoute user={user}>
            <ChatRoom user={user}/>
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
