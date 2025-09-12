import React from 'react';
import './styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <p>© {new Date().getFullYear()} Paws & Pastries. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
