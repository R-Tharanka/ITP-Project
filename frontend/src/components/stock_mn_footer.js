import React from 'react';
import './styles/stock_mn_footer.css'; 

const St_Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#terms">Terms and Conditions</a>
        <a href="#privacy">Privacy Policy</a>
      </div>
      <div className="footer-socials">
        <a href="#facebook">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="#instagram">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="#youtube">
          <i className="fa fa-youtube-play"></i>
        </a>
        <a href="#linkedin">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
      <hr className="footer-divider" />
      <div className="footer-copyright">
        © 2024 NELCO
      </div>
    </footer>
  );
};

export default St_Footer;
