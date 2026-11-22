import React, { useState } from 'react';

export default function Navbar({
  page,
  setPage,
  activeTable,
  isQrDetected,
  onTableBadgeClick,
  theme,
  toggleTheme,
  cartCount,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (targetPage, sectionId) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav id="navbar">
      <a
        className="nav-logo"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          handleNav('welcome');
        }}
      >
        <i className="fa-solid fa-qrcode"></i> QR Restaurant
      </a>

      <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
        <li>
          <button
            className={page === 'welcome' ? 'current' : ''}
            onClick={() => handleNav('welcome')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={page === 'menu' ? 'current' : ''}
            onClick={() => handleNav('menu')}
          >
            Menu
          </button>
        </li>
        <li>
          <button onClick={() => handleNav('welcome', 'how-it-works')}>
            How It Works
          </button>
        </li>
        <li>
          <button
            className={page === 'admin' ? 'current' : ''}
            onClick={() => handleNav('admin')}
          >
            Admin
          </button>
        </li>
      </ul>

      <div className="nav-right">
        <button
          className="nav-table"
          id="nav-table"
          onClick={onTableBadgeClick}
          title="Click to view/select table"
        >
          <i className="fa-solid fa-location-dot"></i> Table <strong>{activeTable}</strong>
          {isQrDetected && <span className="nav-qr-tag">QR</span>}
        </button>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          title="Toggle light/dark theme"
          aria-label="Toggle theme"
        >
          <i className={`fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
        </button>

        {(page === 'welcome' || page === 'menu') && (
          <button
            className="cart-btn"
            id="cart-nav-btn"
            onClick={onOpenCart}
            aria-label="Open cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-badge" id="cart-badge">{cartCount}</span>
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid fa-${mobileMenuOpen ? 'xmark' : 'bars'}`}></i>
        </button>
      </div>
    </nav>
  );
}
