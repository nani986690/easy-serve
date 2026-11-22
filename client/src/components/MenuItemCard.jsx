import React, { useState } from 'react';

export default function MenuItemCard({
  item,
  qty,
  onAddToCart,
  onUpdateQty,
  showControls = true,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="menu-card">
      <div className="menu-img">
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{item.emoji}</span>
        )}
      </div>

      <div className="menu-body">
        <div className="menu-tags">
          {item.veg && <span className="tag tag-veg">VEG</span>}
          {item.pop && (
            <span className="tag tag-pop">
              <i className="fa-solid fa-fire"></i> Popular
            </span>
          )}
        </div>

        <div className="item-row">
          <div className="item-info">
            <h5>{item.name}</h5>
            <p>₹{item.price.toFixed(2)}</p>
          </div>

          {showControls && qty > 0 ? (
            <div className="qty-ctrl">
              <button
                className="qty-btn"
                onClick={() => onUpdateQty(-1)}
                aria-label="Remove one"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="qty-num">{qty}</span>
              <button
                className="qty-btn"
                onClick={() => onUpdateQty(1)}
                aria-label="Add one"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="add-btn"
              onClick={onAddToCart}
              aria-label={`Add ${item.name}`}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>

        <div className="menu-desc">{item.desc}</div>
      </div>
    </div>
  );
}
