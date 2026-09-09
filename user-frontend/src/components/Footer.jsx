// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <h4>About Marketplace</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
            <li><Link to="/">Blog</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Shipping Info</Link></li>
            <li><Link to="/">Returns</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Cookie Policy</Link></li>
            <li><Link to="/">Security</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" className="social-icon">📘</a>
            <a href="#twitter" className="social-icon">𝕏</a>
            <a href="#instagram" className="social-icon">📷</a>
            <a href="#linkedin" className="social-icon">💼</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;