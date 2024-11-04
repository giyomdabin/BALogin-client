import React from 'react';
import './SignUpScreen.css';

function SignUpScreen({ onSwitchToLogin }) {
    return (
        <div className="signup-screen">
            <div className="signup-container">
                <input type="text" placeholder="이름" className="signup-input" />
                <input type="text" placeholder="아이디" className="signup-input" />
                <input type="password" placeholder="비밀번호" className="signup-input" />
                <input type="password" placeholder="비밀번호 확인" className="signup-input" />
                
                <div className="button-container">
                    <button className="signup-button">회원가입</button>
                    <button className="cancel-button" onClick={onSwitchToLogin}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
