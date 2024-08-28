import React from 'react';
import Sidebar from '../components/SideBar/SideBar'; 
import { Route, Routes } from 'react-router-dom';
import "../style.css";
import AllRequests from './allRequest';

const HomePage = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='content'>
        <Routes>
          <Route path="all-requests" element={<AllRequests />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
