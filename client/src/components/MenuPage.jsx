import React, { useState } from 'react';
import MenuItemCard from './MenuItemCard';

export default function MenuPage({
  menuItems,
  categories,
  selectedCat,
  onSelectCat,
  cart,
  onAddToCart,
  onUpdateQty,
  activeTable,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.cat === selectedCat;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="menu-page page-container" id="menu">
      <div className="page-head">
        <div className="section-subtitle">OUR MENU</div>
        <h2 className="section-title">
          Fresh Food, <span>Made For Table {activeTable}</span>
        </h2>
        <p>Tap + to add an item to your order.</p>

        <div className="menu-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="menu-search-input"
            placeholder="Search dosa, biryani, coffee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="categories" id="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => onSelectCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid" id="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              qty={cart[item.id] || 0}
              onAddToCart={() => onAddToCart(item)}
              onUpdateQty={(delta) => onUpdateQty(item.id, delta)}
              showControls={true}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px 16px',
              color: 'var(--text2)',
            }}
          >
            <p>No dishes found matching your selection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
