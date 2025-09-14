import React, { createContext, useState, type ReactNode } from 'react';

interface User {
    role: string;
    [key: string]: unknown;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (data: { token: string; user: User }) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = ({ token: newToken, user: newUser }: { token: string; user: User }) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!token;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};