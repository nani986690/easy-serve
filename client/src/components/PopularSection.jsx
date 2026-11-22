import React from 'react';
import MenuItemCard from './MenuItemCard';

export default function PopularSection({
  items,
  cart,
  onAddToCart,
  onUpdateQty,
  onViewMenu,
}) {
  const popularItems = items.filter((i) => i.pop).slice(0, 4);

  return (
    <section className="popular-section" id="popular">
      <div className="section-head">
        <h2 className="section-title">Popular right now</h2>
        <button className="btn btn-outline btn-sm" onClick={onViewMenu}>
          See full menu
        </button>
      </div>
      <div className="menu-grid">
        {popularItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            qty={cart[item.id] || 0}
            onAddToCart={() => onAddToCart(item)}
            onUpdateQty={(delta) => onUpdateQty(item.id, delta)}
            showControls={false}
          />
        ))}
      </div>
    </section>
  );
}
