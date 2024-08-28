import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
