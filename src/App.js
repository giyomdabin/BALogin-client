import React, { useEffect, useState } from 'react';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import './App.css';

function App() {
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        // 2초 후 로그인 화면으로 전환
        const timer = setTimeout(() => setShowLogin(true), 2000);
        return () => clearTimeout(timer); // 컴포넌트가 제거될 때 타이머 정리
    }, []);

    return (
        <div className="App">
            {showLogin ? <LoginScreen /> : <MainScreen />}
        </div>
    );
}

export default App;
