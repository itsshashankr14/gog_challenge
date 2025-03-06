// src/components/ScanQR.js
import React, { useState } from 'react';
import { QrReader} from 'react-qr-reader';
import '../styles/ScanQR.css';

function ScanQR() {
  const [qrResult, setQrResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQrResult(data);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="dashboard-section scanqr-section">
      <h2>Scan QR</h2>
      {!showScanner ? (
        <div className="scanqr-button-container">
          <button onClick={() => setShowScanner(true)} className="scanqr-button">
            Launch QR Scanner
          </button>
          {qrResult && (
            <p className="qr-result">
              Scanned QR Code: <strong>{qrResult}</strong>
            </p>
          )}
        </div>
      ) : (
        <div className="qr-reader-container">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <button onClick={() => setShowScanner(false)} className="close-scanner-button">
            Close Scanner
          </button>
        </div>
      )}
    </div>
  );
}

export default ScanQR;
