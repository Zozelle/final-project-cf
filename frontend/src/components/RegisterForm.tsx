import React, { useState } from 'react';
import '../styles/Auth.css';

interface RegisterFormProps {
    onSignUpSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSignUpSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPass) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error('Sign up failed');
            onSignUpSuccess();
        } catch {
            setError('Sign up failed: Please try again.');
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
                    autoComplete="email"
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
            </div>
            <div className="form-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    autoComplete="new-password"
                />
            </div>
            <button type="submit">Sign Up</button>
            {error && <p className="auth-error">{error}</p>}
        </form>
    );
};

export default RegisterForm;