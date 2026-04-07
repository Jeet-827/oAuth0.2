import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import GetToken from './components/GetToken';
import Protect from './components/Protect';
import Navbar from './components/Navbar';
import Post from './pages/Post';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`min-h-screen bg-gradient-to-r from-[#E9F1FF] to-[#FFE9F2] transition-all duration-300 ${!isAuthPage ? 'pl-64' : ''}`}>
      <GetToken />
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Protect><Home /></Protect>} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
