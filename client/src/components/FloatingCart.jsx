import React from 'react';

export default function FloatingCart({ cart, menuItems, onOpenCart, visible }) {
  const entries = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const count = entries.reduce((sum, [_, q]) => sum + q, 0);

  if (!visible || count === 0) return null;

  let total = 0;
  entries.forEach(([id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    if (item) total += item.price * qty;
  });

  return (
    <button
      className="float-cart"
      id="float-cart"
      onClick={onOpenCart}
      aria-label="View shopping cart"
    >
      <i className="fa-solid fa-cart-shopping"></i> View Cart •{' '}
      <span>
        {count} item{count > 1 ? 's' : ''}
      </span>{' '}
      • <span>₹{total.toFixed(2)}</span>
    </button>
  );
}
