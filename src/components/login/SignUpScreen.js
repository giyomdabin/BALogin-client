import React, { useState } from 'react';
import './SignUpScreen.css';

function SignUpScreen({ onSwitchToLogin }) {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호를 확인해주세요.');
            setPassword('');           // 비밀번호 필드 초기화
            setConfirmPassword('');     // 비밀번호 확인 필드 초기화
        } else {
            setErrorMessage(''); // 오류 메시지 초기화
            try {
                const response = await fetch('http://localhost:8080/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        userId,
                        password,
                    }),
                });
                
                if (response.ok) {
                    alert('회원가입 성공!');
                    onSwitchToLogin(); // 성공 후 로그인 화면으로 돌아가기
                } else {
                    alert('회원가입 실패. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('서버 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="signup-screen">
            <div className="signup-container">
                <input
                    type="text"
                    placeholder="이름"
                    className="signup-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="아이디"
                    className="signup-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    className="signup-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                
                <div className="button-container">
                    <button className="cancel-button" onClick={onSwitchToLogin}>취소</button>
                    <button className="signup-button" onClick={handleSignUp}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
