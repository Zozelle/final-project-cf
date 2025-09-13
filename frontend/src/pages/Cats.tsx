import React, { useEffect, useState } from 'react';
import './styles/Cats.css';

type Cat = {
    id: string;
    name: string;
    age: string;
    color: string;
    favoriteGames: string;
    specialty: string;
    likes: string;
    imageUrl: string;
};

const CatsPage: React.FC = () => {
    // In production, fetch this list from your DB/backend
    const [cats, setCats] = useState<Cat[]>([]);
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

    useEffect(() => {
        // Replace with your API call!
        fetch('/api/cats')
            .then(resp => resp.json())
            .then(data => {
                setCats(data);
                setSelectedCat(data[0]);
            });
    }, []);

    return (
        <div className="cats-page">
            <h2 className="cats-title">The Real Stars of the Café</h2>
            <div className="cats-content">
                <div className="cats-list">
                    {cats.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-selector${selectedCat?.id === cat.id ? ' active' : ''}`}
                            onClick={() => setSelectedCat(cat)}
                        >
                            <span className="cat-avatar">{/* Insert avatar or icon here, e.g., <img src={cat.imageUrl} /> */}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
                {selectedCat && (
                    <div className="cat-info-card">
                        <div className="cat-image">
                            {/* Show cat image or placeholder */}
                            <img src={selectedCat.imageUrl || '/default-cat.svg'} alt={selectedCat.name} />
                        </div>
                        <div className="cat-details">
                            <div><strong>Name:</strong> {selectedCat.name}</div>
                            <div><strong>Age:</strong> {selectedCat.age}</div>
                            <div><strong>Color:</strong> {selectedCat.color}</div>
                            <div><strong>Favorite games:</strong> {selectedCat.favoriteGames}</div>
                            <div><strong>Specialty:</strong> {selectedCat.specialty}</div>
                            <div><strong>What he likes:</strong> {selectedCat.likes}</div>
                            {/* Implement edit/remove as needed */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatsPage;
