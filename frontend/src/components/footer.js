import React from 'react';
import './styles/footer.css';  

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">About</a>
                <a href="#">Terms and Conditions</a>
                <a href="#">Privacy Policy</a>
            </div>
            <div className="footer-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <hr className="footer-divider" />
            <p className="footer-copyright">© 2024 NELCO</p>
        </footer>
    );
}

export default Footer;
