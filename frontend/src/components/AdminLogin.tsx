import React, { useState } from 'react';
import '../styles/Auth.css';
import { useAuth } from '../context/useAuth';

interface LoginFormProps {
    onLoginSuccess?: () => void;
}

const AdminLogin: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            const data = await res.json();
            const { token, user } = data;
            login({ token, user });
            onLoginSuccess?.();
        } catch {
            setError('Login failed: Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username:</label>
                <input
                    type="username"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
            <button type="submit">Log In</button>
            {error && <p className="auth-error">{error}</p>}
        </form>
    );
};

export default AdminLogin;
