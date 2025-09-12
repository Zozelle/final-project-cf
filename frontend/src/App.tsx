import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Reservation from './pages/Reservation';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    const isAuthenticated = false; // replace with context logic later

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cats" element={<Cats />} />
                    <Route
                        path="/reservation"
                        element={isAuthenticated ? <Reservation /> : <Navigate to="/login" />}
                    />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/login" element={<Auth />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
