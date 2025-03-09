// src/components/CombinedAuth.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/CombinedAuth.css';

function CombinedAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Display alert for 3 seconds (includes error code and message)
  const showAlertMessage = (message, type = "error") => {
    setErrorMsg(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginAttempts(0);
      navigate('/dashboard'); // On successful login, redirect to Dashboard
    } catch (error) {
      console.log("Login error code:", error.code);
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setLoginAttempts(prev => prev + 1);
      }
      showAlertMessage(`Error (${error.code}): ${error.message}`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showAlertMessage("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        displayName,
        email,
        createdAt: new Date(),
      });
      setMode('login'); // Switch to login mode after signup
      showAlertMessage("Signup successful! Please log in.", "success");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMode('login');
        showAlertMessage("User already exists. Please log in.");
      } else {
        showAlertMessage(`Error (${error.code}): ${error.message}`);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showAlertMessage("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      showAlertMessage("Password reset email sent! Check your inbox.", "success");
    } catch (error) {
      showAlertMessage(`Error (${error.code}): ${error.message}`);
    }
  };

  // Clear form fields when switching modes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setConfirmPassword('');
    setLoginAttempts(0);
  }, [mode]);

  return (
    <div className="combined-auth-container">
      {showAlert && <div className="alert">{errorMsg}</div>}
      <div className="intro-section">
        <h1>Welcome to Dharma Darshana</h1>
        <p>
          Embrace a spiritual journey with a sustainable twist! Our platform rewards you for keeping the pilgrimage site clean.
          Collect plastic waste, earn points, and receive a fast-track darshan pass.
          Join us to make a positive impact on the environment while enhancing your spiritual experience.
        </p>
      </div>
      <div className="form-section">
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {loginAttempts >= 3 && (
              <p className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </p>
            )}
            <p className="toggle-text">
              Don't have an account?{" "}
              <span onClick={() => setMode('signup')}>Sign Up</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            <p className="toggle-text">
              Already have an account?{" "}
              <span onClick={() => setMode('login')}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default CombinedAuth;
