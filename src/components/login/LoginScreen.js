import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onSwitchToSignUp, onLoginSuccess }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    password,
                }),
            });

            if (response.status === 200) {
                onLoginSuccess();
            } else if (response.status === 400) {
                const result = await response.json();
                setErrorMessage(result.message || '아이디 또는 비밀번호를 확인해주세요.');
                setPassword(''); // 비밀번호 필드 초기화
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
            setPassword(''); // 비밀번호 필드 초기화
        }
    };

    return (
        <div className="login-screen">
            <div className="login-container">
                <input
                    type="text"
                    placeholder="아이디"
                    className="login-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="login-button" onClick={handleLogin}>로그인</button>
                <p className="signup-text" onClick={onSwitchToSignUp}>
                    아직 회원이 아니신가요? 회원가입
                </p>
            </div>
        </div>
    );
}

export default LoginScreen;
