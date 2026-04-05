import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import GetToken from './components/GetToken';
import Protect from './components/Protect';
import Navbar from './components/Navbar';

function App() {
  return (
    <>

      <Router>
        <div className="min-h-screen bg-gradient-to-r from-[#E9F1FF] to-[#FFE9F2]">
          <GetToken />
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Protect><Home /></Protect>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
