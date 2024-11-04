import React from 'react';
import './LoginScreen.css';

function LoginScreen({ onSwitchToSignUp }) {
    return (
        <div className="login-screen">
            <div className="login-container">
                <input type="text" placeholder="아이디" className="login-input" />
                <input type="password" placeholder="비밀번호" className="login-input" />
                <button className="login-button">로그인</button>
                <p className="signup-text" onClick={onSwitchToSignUp}>
                    아직 회원이 아니신가요? 회원가입
                </p>
            </div>
        </div>
    );
}

export default LoginScreen;
