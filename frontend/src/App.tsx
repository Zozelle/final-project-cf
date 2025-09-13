import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Reservation from './pages/Reservation';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cats" element={<Cats />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/login" element={<Auth />} />
                    {/* Add signup route if separate */}
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
