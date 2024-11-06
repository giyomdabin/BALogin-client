import React, { useState, useEffect } from 'react';
import './LoginScreen.css';

function LoginScreen({ onSwitchToSignUp, onLoginSuccess, onGuestLogin }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isBeaconLoggingIn, setIsBeaconLoggingIn] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8081/login', {
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

    const startBeaconLogin = () => {
        setIsBeaconLoggingIn(true);
        const id = setInterval(async () => {
            try {
                // GET 요청으로 `/beacon-login`에 userId를 쿼리로 포함하여 전송
                const response = await fetch(`http://localhost:8081/beacon-login`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        clearInterval(id); // 비콘 로그인 성공 시 요청 중지
                        setIsBeaconLoggingIn(false);
                        onLoginSuccess(); // 로그인 성공 시 홈 화면으로 이동
                    }
                } else {
                    console.error('비콘 로그인 실패');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 1000); // 1초마다 요청
        setIntervalId(id);
    };

    useEffect(() => {
        // 컴포넌트 언마운트 시 인터벌을 정리
        return () => clearInterval(intervalId);
    }, [intervalId]);

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
                
                <div className="button-container">
                    <button className="login-button" onClick={handleLogin}>로그인</button>
                    <button
                        className="guest-login-button"
                        onClick={startBeaconLogin}
                        disabled={isBeaconLoggingIn} // 비콘 로그인 중일 때 버튼 비활성화
                    >
                        비콘 로그인
                    </button>
                </div>

                <p className="signup-text" onClick={onSwitchToSignUp}>
                    아직 회원이 아니신가요? 회원가입
                </p>
            </div>
        </div>
    );
}

export default LoginScreen;
