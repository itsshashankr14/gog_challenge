// src/components/Dashboard.js
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import ScanQR from './ScanQR';
import Points from './Points';
import Rewards from './Rewards';
import ContactUs from './ContactUs';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dharma Darshana</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/scanqr" className={({ isActive }) => (isActive ? "active" : "")}>
                Scan QR
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/points" className={({ isActive }) => (isActive ? "active" : "")}>
                Points
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/rewards" className={({ isActive }) => (isActive ? "active" : "")}>
                Rewards
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="scanqr" element={<ScanQR />} />
          <Route path="points" element={<Points />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="contact" element={<ContactUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
