import React from 'react';
import './Logo.css';

function Logo() {
    return (
        <div className="logo">
            <img src="/running.png" alt="Running Logo" className="logo-image" />
            <span className="logo-text">BALogin</span>
            <img src="/auth.png" alt="Auth Icon" className="logo-image" />
        </div>
    );
}

export default Logo;
