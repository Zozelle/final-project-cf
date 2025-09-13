import React from 'react';
import '../pages/styles/Cats.css'

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

interface CatCardProps {
    cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
    return (
        <div className="cat-info-card">
            <div className="cat-image">
                <img src={cat.imageUrl || '/default-cat.svg'} alt={cat.name} />
            </div>
            <div className="cat-details">
                <div><strong>Name:</strong> {cat.name}</div>
                <div><strong>Age:</strong> {cat.age}</div>
                <div><strong>Color:</strong> {cat.color}</div>
                <div><strong>Favorite games:</strong> {cat.favoriteGames}</div>
                <div><strong>Specialty:</strong> {cat.specialty}</div>
                <div><strong>Likes:</strong> {cat.likes}</div>
            </div>
        </div>
    );
};

export default CatCard;
