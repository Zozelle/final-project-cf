import React, { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import CatEditor from '../components/CatEditor';
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

// Temporary admin flag; replace with real auth check as needed
const isAdmin = false;

const Cats: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
    const [editingCat, setEditingCat] = useState<Cat | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetch('/api/cats')
            .then(resp => resp.json())
            .then(data => {
                setCats(data);
                setSelectedCat(data[0] || null);
            })
            .catch(() => {
                setCats([]);
                setSelectedCat(null);
            });
    }, []);

    const handleDelete = async (catId: string) => {
        if (!window.confirm('Are you sure you want to delete this cat?')) return;
        const resp = await fetch(`/api/cats/${catId}`, { method: 'DELETE' });
        if (resp.ok) {
            const updatedCats = cats.filter(c => c.id !== catId);
            setCats(updatedCats);
            setSelectedCat(updatedCats[0] || null);
            setEditingCat(null);
        } else {
            alert('Failed to delete cat.');
        }
    };

    const handleStartEdit = (cat?: Cat) => {
        if (cat) {
            setEditingCat(cat);
            setIsAdding(false);
        } else {
            setEditingCat({
                id: '',
                name: '',
                age: '',
                color: '',
                favoriteGames: '',
                specialty: '',
                likes: '',
                imageUrl: '',
            });
            setIsAdding(true);
        }
    };

    const handleSave = async (catData: Cat) => {
        if (isAdding) {
            const resp = await fetch('/api/cats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(catData),
            });
            if (resp.ok) {
                const newCat = await resp.json();
                const updatedCats = [...cats, newCat];
                setCats(updatedCats);
                setSelectedCat(newCat);
            } else {
                alert('Failed to add cat.');
            }
        } else {
            const resp = await fetch(`/api/cats/${catData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(catData),
            });
            if (resp.ok) {
                const updatedCats = cats.map(c => (c.id === catData.id ? catData : c));
                setCats(updatedCats);
                setSelectedCat(catData);
            } else {
                alert('Failed to update cat.');
            }
        }
        setEditingCat(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingCat(null);
        setIsAdding(false);
    };

    return (
        <div className="cats-page">
            <h2 className="cats-title">The Real Stars of the Café</h2>
            <div className="cats-content">
                <div className="cats-list">
                    {cats.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-selector${selectedCat?.id === cat.id ? ' active' : ''}`}
                            onClick={() => { setSelectedCat(cat); setEditingCat(null); }}
                        >
                            {cat.name}
                        </button>
                    ))}
                    {isAdmin && !editingCat && (
                        <button onClick={() => handleStartEdit()} className="add-cat-button">
                            + Add New Cat
                        </button>
                    )}
                </div>

                <div className="cat-info-container">
                    {editingCat ? (
                        <CatEditor
                            cat={editingCat}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : selectedCat ? (
                        <CatCard
                            cat={selectedCat}
                            isAdmin={isAdmin}
                            onEdit={() => handleStartEdit(selectedCat)}
                            onDelete={() => handleDelete(selectedCat.id)}
                        />
                    ) : (
                        <div className="cat-info-card no-cats">
                            <span>No cats available</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cats;
