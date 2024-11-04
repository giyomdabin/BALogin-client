import React from 'react';
import Logo from './Logo';
import './MainScreen.css';

function MainScreen({ logoUp }) {
    return (
        <div className={`main-screen ${logoUp ? 'animate-up' : ''}`}>
            <Logo />
        </div>
    );
}

export default MainScreen;
