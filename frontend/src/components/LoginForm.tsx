import React, { useState } from 'react';
import './styles/Auth.css';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Replace with your login API endpoint
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            onLoginSuccess();
        } catch (err) {
            setError('Login failed: Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
            />

            <label>Password:</label>
            <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
            />

            <button type="submit">Log In</button>
            {error && <p className="auth-error">{error}</p>}
        </form>
    );
};

export default LoginForm;
