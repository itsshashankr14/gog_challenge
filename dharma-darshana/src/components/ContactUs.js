// src/components/ContactUs.js
import React from "react";
import "../styles/ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-us-section">
      <h2>📞 Contact Us</h2>
      <p>Have questions or need assistance? We are here to help!</p>

      <div className="contact-info">
        <h3>📍 Address:</h3>
        <p>Dharma Darshana Office, Temple Street, City, State, 123456</p>

        <h3>📧 Email:</h3>
        <p>
          <a href="mailto:support@dharmadarshana.com">
            support@dharmadarshana.com
          </a>
        </p>

        <h3>📞 Phone:</h3>
        <p>
          <a href="tel:+911234567890">+91 12345 67890</a>
        </p>
      </div>

      {/* Optional: Embed Google Maps Location */}
      <div className="map-container">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093705!2d144.95373531531573!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf4c3d7b6e5d2d6!2sYour+Location!5e0!3m2!1sen!2sin!4v1617951882097!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: "0", borderRadius: "8px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer Section */}
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} Dharma Darshana. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a> |
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> 🐦 Twitter</a> |
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> 📸 Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
