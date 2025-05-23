import React from 'react';
import './styles/op_port_header.css';

function Header()
{
    return(
        <header className="header">
            <div className="header-left">
                <h1 className="logo">NELCO</h1>
            </div>
            <div className="header-right">
                <nav className="nav-links top-nav-links">
                <span>News Feed</span>
                <span>Quick Actions</span>
                </nav>
                {/* <div className="header-icons">
                <i className="bell-icon"></i>
                <img 
                    src="https://via.placeholder.com/40" 
                    alt="User Avatar" 
                    className="user-avatar" 
                />
                </div> */}
            </div>
        </header>
    );
}

export default Header;