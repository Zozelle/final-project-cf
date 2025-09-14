import React from 'react';
import '../styles/Menu.css';

const menuData = {
    Coffee: [
        "Espresso",
        "Americano",
        "Latte",
        "Cappuccino",
    ],
    Pastries: [
        "Croissant",
        "Scone",
        "Cinnamon Roll",
        "Chocolate muffin"
    ],
    Teas: [
        "English Breakfast",
        "Earl Grey",
        "Chamomile",
        "Green Tea"
    ]
};

const MenuPage: React.FC = () => {
    return (
        <div className="menu-page">
            <h2 className="menu-title">Our Menu</h2>
            <div className="menu-book">
                {Object.entries(menuData).map(([category, items]) => (
                    <section key={category} className="menu-category">
                        <h3 className="category-title">{category}</h3>
                        <ul className="menu-items">
                            {items.map(item => (
                                <li key={item} className="menu-item">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
