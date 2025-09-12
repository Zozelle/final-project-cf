import React from 'react';
import './styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-bg">
            <main className="home-main">
                <h1 className="home-title">Paws & Pastries</h1>
                <h2 className="home-subtitle">Coffee, Cats, and Cozy Vibes</h2>
                <div className="home-divider"></div>
                <p className="home-description">
                    Welcome to Paws & Pastries, where the aroma of fresh coffee meets the soothing purr of feline friends.<br />
                    Tucked away in a peaceful corner of the city, our café is a haven for cat lovers, students, remote workers,
                    and anyone in need of a little pawsitivity.<br />
                    Sip on artisan drinks, nibble on delicious pastries, and spend quality time with our adorable rescue cats.<br />
                    Whether you’re looking to unwind, get some work done, or maybe even meet your future fur-ever friend,
                    there’s a comfy seat (or a cat bed) waiting for you here.
                </p>
            </main>
        </div>
    );
};

export default Home;
