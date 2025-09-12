import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            <div>
                <button onClick={() => setIsLogin(true)}>Login</button>
                <button onClick={() => setIsLogin(false)}>Register</button>
            </div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

export default Auth;
