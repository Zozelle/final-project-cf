import React, { useState, useEffect } from 'react';

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

interface CatEditorProps {
    cat: Cat;
    onSave: (cat: Cat) => void;
    onCancel: () => void;
}

const CatEditor: React.FC<CatEditorProps> = ({ cat, onSave, onCancel }) => {
    const [formData, setFormData] = useState(cat);

    // If the cat prop changes (e.g. switching edit target), update form data
    useEffect(() => {
        setFormData(cat);
    }, [cat]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form className="cat-editor-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Age:
                    <input type="text" name="age" value={formData.age} onChange={handleChange} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Color:
                    <input type="text" name="color" value={formData.color} onChange={handleChange} required />
                </label>
                <label>
                    Favorite Games:
                    <input type="text" name="favoriteGames" value={formData.favoriteGames} onChange={handleChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Specialty:
                    <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
                </label>
                <label>
                    Likes:
                    <input type="text" name="likes" value={formData.likes} onChange={handleChange} />
                </label>
            </div>
            <label>
                Image URL:
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </label>

            <div className="editor-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default CatEditor;
