import React, { useEffect, useState } from 'react';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import './App.css';

function App() {
    const [logoUp, setLogoUp] = useState(false);

    useEffect(() => {
        // 2초 후 로고가 위로 올라가고 로그인 화면이 표시됩니다.
        const timer = setTimeout(() => {
            setLogoUp(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            <div className={`content-container ${logoUp ? 'logo-up' : ''}`}>
                <MainScreen />
                {logoUp && <LoginScreen />}
            </div>
        </div>
    );
}

export default App;
