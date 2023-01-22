import './App.css';
import { useState } from 'react';
import AuthPage from './Components/pages/AuthPage';
import Profile from './Components/pages/Profile.jsx';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
      <Routes>
        <Route index element={<AuthPage setUser={setUser}/>} />
        <Route path="login" element={<AuthPage />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    // <AuthPage />
  );
}

export default App;
