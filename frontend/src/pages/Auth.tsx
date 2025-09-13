import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState<null | { email: string }>(null);

    const handleLoginSuccess = () => {
        setUser({ email: 'user@example.com' });
        alert('Login successful!');
    };

    const handleSignUpSuccess = () => {
        setUser({ email: 'newuser@example.com' });
        alert('Registration successful!');
    };

    if (user) {
        return (
            <div className="auth-page">
                <div className="auth-form" style={{ textAlign: 'center' }}>
                    <h2>Welcome, {user.email}!</h2>
                    <button
                        style={{
                            backgroundColor: '#b87f3a',
                            color: '#fff3e0',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                        onClick={() => setUser(null)}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <button
                    style={{ marginRight: '10px', padding: '8px 16px' }}
                    onClick={() => setIsLogin(true)}
                    disabled={isLogin}
                >
                    Login
                </button>
                <button
                    style={{ padding: '8px 16px' }}
                    onClick={() => setIsLogin(false)}
                    disabled={!isLogin}
                >
                    Register
                </button>
            </div>

            <div className="auth-form">
                {isLogin ? (
                    <>
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                        <p className="auth-prompt">
                            Are you new here?{' '}
                            <span className="auth-prompt-link" onClick={() => setIsLogin(false)}>
                Sign Up
              </span>
                        </p>
                    </>
                ) : (
                    <>
                        <RegisterForm onSignUpSuccess={handleSignUpSuccess} />
                        <p className="auth-prompt">
                            Already have an account?{' '}
                            <span className="auth-prompt-link" onClick={() => setIsLogin(true)}>
                Log In
              </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;
