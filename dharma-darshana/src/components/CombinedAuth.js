// src/components/CombinedAuth.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import "../styles/CombinedAuth.css";

function CombinedAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // Success or Error Message
  const [showAlert, setShowAlert] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Error messages mapping
  const firebaseErrorMessages = {
    "auth/email-already-in-use": "This email is already registered. Try logging in.",
    "auth/invalid-email": "Invalid email format. Please check your email.",
    "auth/user-not-found": "No account found. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Try again or reset your password.",
    "auth/weak-password": "Password must be at least 6 characters long.",
  };

  // Show success/error message
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (type === "success") setMessage({ text: "", type: "" }); // Clear success message
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      const userFriendlyMessage = firebaseErrorMessages[error.code] || "Login failed. Please try again.";
      setLoginAttempts((prev) => prev + 1);
      showMessage(userFriendlyMessage, "error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        displayName,
        email,
        createdAt: new Date(),
      });
  
      // Show success message
      const successMsg = document.createElement("div");
      successMsg.classList.add("success-message");
      successMsg.textContent = "🎉 Signup successful! Redirecting...";
      document.body.appendChild(successMsg);
  
      setTimeout(() => {
        successMsg.remove(); // Remove success message after animation
        setMode("login"); // Switch to login page
      }, 2500);
    } catch (error) {
      const userFriendlyMessage = firebaseErrorMessages[error.code] || "Signup failed. Please try again.";
      showMessage(userFriendlyMessage, "error");
    }
  };
  
  const handleForgotPassword = async () => {
    if (!email) {
      showMessage("Please enter your email to reset your password.", "error");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Password reset email sent! Check your inbox.", "success");
    } catch (error) {
      const userFriendlyMessage = firebaseErrorMessages[error.code] || "Error sending reset email.";
      showMessage(userFriendlyMessage, "error");
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setConfirmPassword("");
    setLoginAttempts(0);
  }, [mode]);

  return (
    <motion.div
      className="combined-auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      {showAlert && (
        <motion.div
          className={`alert ${message.type}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ y: -20, opacity: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      <motion.div
        className="intro-section"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.6 } }}
      >
        <h1>Welcome to Dharma Darshana</h1>
        <p>Earn rewards by collecting plastic waste and enjoy a fast-track darshan pass.</p>
      </motion.div>

      <motion.div
        className="form-section"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      >
        {mode === "login" ? (
          <motion.form
            onSubmit={handleLogin}
            className="auth-form"
            whileHover={{ scale: 1.02 }}
          >
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {loginAttempts >= 3 && (
              <p className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </p>
            )}
            <p className="toggle-text">
              Don't have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign Up</span>
            </p>
          </motion.form>
        ) : (
          <motion.form
            onSubmit={handleSignup}
            className="auth-form"
            whileHover={{ scale: 1.02 }}
          >
            <h2>Sign Up</h2>
            <input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
            <p className="toggle-text">
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default CombinedAuth;
