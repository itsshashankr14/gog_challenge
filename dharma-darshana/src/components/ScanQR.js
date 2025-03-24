// src/components/ScanQR.js
import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/ScanQR.css";

function ScanQR() {
  const [qrResult, setQrResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }, // Adjust size
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setQrResult(decodedText);
        scanner.clear(); // Stop scanning after success
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="dashboard-section scanqr-section">
      <h2>Scan QR</h2>
      <div id="qr-reader" className="qr-reader-container" ref={scannerRef}></div>
      {qrResult && <p className="qr-result">Scanned Result: {qrResult}</p>}
    </div>
  );
}

export default ScanQR;
