import React from 'react';
import '../styles/Cats.css';

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
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, isAdmin = false, onEdit, onDelete }) => {
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
                {isAdmin && (
                    <div className="admin-action-buttons">
                        <button onClick={onEdit}>Edit</button>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatCard;
