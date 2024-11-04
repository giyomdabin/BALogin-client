import React, { useEffect, useState } from 'react';
import MainScreen from './components/main/MainScreen';
import LoginScreen from './components/login/LoginScreen';
import SignUpScreen from './components/login/SignUpScreen';
import './App.css';

function App() {
    const [logoUp, setLogoUp] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoUp(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            <div className={`content-container ${logoUp ? 'logo-up' : ''}`}>
                <MainScreen />
                {logoUp && (
                    isSignUp 
                        ? <SignUpScreen onSwitchToLogin={() => setIsSignUp(false)} /> 
                        : <LoginScreen onSwitchToSignUp={() => setIsSignUp(true)} />
                )}
            </div>
        </div>
    );
}

export default App;
