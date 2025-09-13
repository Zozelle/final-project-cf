import React, { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
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
    const [cats, setCats] = useState<Cat[]>([]);
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

    useEffect(() => {
        fetch('/api/cats')
            .then(resp => resp.json())
            .then(data => {
                setCats(data);
                setSelectedCat(data[0]);
            })
            .catch(() => {
                setCats([]);
                setSelectedCat(null);
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
                            <span className="cat-avatar">{/* optionally use <img src={cat.imageUrl} /> */}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
                {selectedCat ? (
                    <CatCard cat={selectedCat} />
                ) : (
                    <div className="cat-info-card no-cats">
                        <span>No cats available</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatsPage;
