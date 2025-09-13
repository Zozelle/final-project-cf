import React, { useState } from 'react';
import './styles/Auth.css';

interface RegisterFormProps {
    onSignUpSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSignUpSuccess }) => {
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
            // Replace with your signup API
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error('Sign up failed');
            onSignUpSuccess();
        } catch (err) {
            setError('Sign up failed: Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <h2>Sign Up</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    autoComplete="new-password"
                />

                <button type="submit">Sign Up</button>
                {error && <p className="auth-error">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
