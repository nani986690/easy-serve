import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  menuItems,
  activeTable,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  isPlacingOrder,
}) {
  const cartEntries = Object.entries(cart).filter(([_, qty]) => qty > 0);

  let subtotal = 0;
  const itemsWithDetails = cartEntries.map(([id, qty]) => {
    const item = menuItems.find((i) => i.id === id) || {
      id,
      name: 'Item',
      price: 0,
      emoji: '🍽️',
    };
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    return { ...item, qty, lineTotal };
  });

  const tax = subtotal * 0.09;
  const grandTotal = subtotal + tax;

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        id="overlay"
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cart-drawer">
        <div className="drawer-head">
          <h2>
            <i className="fa-solid fa-cart-shopping"></i> Your Cart
          </h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-table-banner" id="cart-table-banner">
          <i className="fa-solid fa-location-dot"></i> Ordering for{' '}
          <strong>Table {activeTable}</strong>
        </div>

        <div className="cart-items" id="cart-items-list">
          {itemsWithDetails.length === 0 ? (
            <div className="cart-empty">
              <div className="icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
              <p>Your cart is empty</p>
              <p style={{ fontSize: '.8rem', marginTop: '8px', color: 'var(--text2)' }}>
                Add items from the menu to start ordering
              </p>
            </div>
          ) : (
            itemsWithDetails.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="ci-info">
                  <div className="ci-name">
                    {item.emoji} {item.name}
                  </div>
                  <div className="ci-price">
                    ₹{item.price.toFixed(2)} each
                  </div>
                </div>
                <div className="ci-ctrl">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    className="ci-remove"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {itemsWithDetails.length > 0 && (
          <div className="drawer-foot" id="cart-foot">
            <div className="totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (9%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={onPlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Placing Order...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Place Order (Table {activeTable})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
