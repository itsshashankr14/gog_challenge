// src/components/Rewards.js
import React, { useState } from "react";
import "../styles/Rewards.css";

function Rewards() {
  const [points, setPoints] = useState(105); // Example points, replace with dynamic data
  const [redeemed, setRedeemed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redeemCode, setRedeemCode] = useState("");

  const generateRedeemCode = () => {
    const code = "DD-" + Math.random().toString(36).substr(2, 8).toUpperCase();
    return code;
  };

  const handleRedeem = () => {
    if (points >= 100) {
      setRedeemed(true);
      setRedeemCode(generateRedeemCode());
      setErrorMessage("");
    } else {
      setErrorMessage("You need 100 points to claim the pass.");
    }
  };

  return (
    <div className="rewards-section">
      <h2>🎁 Rewards</h2>
      <p>Redeem your points for exclusive benefits such as fast-track passes and special gifts.</p>

      <div className="rewards-card">
        <h3>Your Total Points: <span>{points} ⭐</span></h3>
        
        {redeemed ? (
          <div className="reward-success">
            🎉 Congratulations! Your pass has been successfully claimed.  
            <p className="redeem-code">Redeem Code: <strong>{redeemCode}</strong></p>
          </div>
        ) : (
          <>
            <button onClick={handleRedeem} className="redeem-button">
              🎟️ Claim Free Pass
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="rewards-footer">
        <p>© {new Date().getFullYear()} Dharma Darshana. Your spiritual journey matters.</p>
      </footer>
    </div>
  );
}

export default Rewards;
