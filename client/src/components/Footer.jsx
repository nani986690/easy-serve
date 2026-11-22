import React from 'react';

export default function Footer({ setPage }) {
  const handleLink = (pageName, sectionId) => {
    setPage(pageName);
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
    <footer className="site-footer">
      <div
        className="nav-logo"
        style={{ display: 'inline-flex', cursor: 'pointer', marginBottom: '8px' }}
        onClick={() => handleLink('welcome')}
      >
        <i className="fa-solid fa-qrcode"></i> QR Restaurant
      </div>
      <p>Scan, order, and relax. Fast & contactless table ordering.</p>
      <div className="footer-links">
        <button onClick={() => handleLink('menu')}>Menu</button>
        <button onClick={() => handleLink('welcome', 'how-it-works')}>
          How It Works
        </button>
        <button onClick={() => handleLink('admin')}>Admin Dashboard</button>
      </div>
    </footer>
  );
}
