// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UmpiresList from './pages/UmpiresList';
import Home from './pages/Home';
import Availability from './pages/Availability';
import UserProfile from './pages/userProfile';

function App() {
  return (
    <AuthProvider>
      <div className='bg-gradient-to-br from-blue-500 via-green-600 to-blue-500 bg-opacity-60'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/umpires" element={<UmpiresList />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
