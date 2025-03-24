import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import ScanQR from './ScanQR';
import Points from './Points';
import Rewards from './Rewards';
import ContactUs from './ContactUs';
import Swal from 'sweetalert2'; // Import SweetAlert2 for animations
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [points, setPoints] = useState(50);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const emailPrefix = user.email.split('@')[0];
      setUserName(emailPrefix);
    }

    const storedPoints = parseInt(localStorage.getItem('userPoints')) || 50;
    setPoints(storedPoints);
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        sessionStorage.clear();

        // Show logout success animation
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000, // Show for 2 seconds
          showConfirmButton: false,
          backdrop: true,
        });

        // Redirect to login page after 2.2 seconds (ensuring alert is fully shown)
        setTimeout(() => {
          navigate('/'); // Now it works properly!
        }, 2200);

      })
      .catch((error) => {
        console.error('Logout Error:', error);
        Swal.fire({
          title: "Logout Failed!",
          text: "Something went wrong. Try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-pic"></div>
          <h3 className="user-name">{userName}</h3>
        </div>
        <h2 className="app-title">Dharma Darshana</h2>
        <nav>
          <ul>
            <li><NavLink to="/dashboard" end>Home</NavLink></li>
            <li><NavLink to="/dashboard/scanqr">Scan QR</NavLink></li>
            <li><NavLink to="/dashboard/points">Points</NavLink></li>
            <li><NavLink to="/dashboard/rewards">Rewards</NavLink></li>
            <li><NavLink to="/dashboard/contact">Contact Us</NavLink></li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Dashboard Content */}
      <main className="dashboard-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-section">
                <h2>🏡 Welcome to Dharma Darshana</h2>
                <p>
                  Immerse yourself in a journey of spiritual enlightenment and community service.
                  Every act of cleaning and contribution brings you closer to inner peace and a sacred environment.
                </p>

                {/* Spiritual Experience Section */}
                <div className="spiritual-experience">
                  <h2>✨ Enhance Your Spiritual Journey ✨</h2>
                  <p>“The journey of a thousand miles begins with one step.” Embrace every moment with gratitude and mindfulness.</p>
                  <p>Engage in spiritual activities, earn rewards, and contribute to a cleaner, divine space.</p>
                  <p>May your path be filled with peace and wisdom. 🙏</p>
                </div>

                {/* Points Tracker Section (only in Home) */}
                <div className="points-tracker">
                  <span className="points-text">🌟 Points: <strong>{points}</strong>/100</span>
                  <div className="points-bar">
                    <div className="points-fill" style={{ width: `${(points / 100) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            }
          />
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
