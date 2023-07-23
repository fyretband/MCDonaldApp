import React from "react";
import "../Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/locations">Locations</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-social-icons">
          <a href="https://www.facebook.com/McDonalds">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/McDonalds">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/mcdonalds/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-disclaimer">
        &copy; {new Date().getFullYear()} McDonald's. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
