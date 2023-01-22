import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';

import AuthPage from './Components/pages/AuthPage';
import PrivateRoute from './Components/Auth/PrivateRoute.jsx';
import Profile from './Components/pages/Profile.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={AuthPage} />
        <PrivateRoute path="/profile" component={Profile} />
        <Navigate from="*" to="/login" />
      </Routes>
    </Router>
  );
}

export default App;
