// src/components/ScanQR.js
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './ScanQR.css';

function ScanQR() {
  const [qrResult, setQrResult] = useState(null);
  const [showScanner, setShowScanner] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setQrResult(data);
      // Optionally, hide scanner after a successful scan:
      // setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    if (err && err.name === "NotAllowedError") {
      setQrResult("Camera permission is required. Please allow access to your camera and refresh the page.");
    } else {
      setQrResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className="dashboard-section scanqr-section">
      <h2>Scan QR</h2>
      {showScanner ? (
        <div className="qr-reader-container">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            constraints={{ facingMode: "environment" }}
          />
          <button 
            onClick={() => setShowScanner(false)} 
            className="close-scanner-button">
            Close Scanner
          </button>
          {qrResult && (
            <p className="qr-result">{qrResult}</p>
          )}
        </div>
      ) : (
        <div className="scanqr-button-container">
          <button 
            onClick={() => setShowScanner(true)} 
            className="scanqr-button">
            Launch QR Scanner
          </button>
          {qrResult && (
            <p className="qr-result">{qrResult}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ScanQR;
