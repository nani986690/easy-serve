import React from 'react';

export default function Hero({
  activeTable,
  isQrDetected,
  onTableChange,
  onViewMenu,
  onHowItWorks,
}) {
  const tableOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (!tableOptions.includes(activeTable)) {
    tableOptions.push(activeTable);
    tableOptions.sort((a, b) => a - b);
  }

  return (
    <header className="hero">
      <div className="hero-qr">
        <i className="fa-solid fa-qrcode"></i>
      </div>

      <div className="table-bar">
        <div className={`table-chip ${isQrDetected ? 'qr-mode' : 'fallback-mode'}`} id="table-chip">
          <i className={`fa-solid fa-${isQrDetected ? 'qrcode' : 'location-dot'}`}></i>
          <span>Table <strong>{activeTable}</strong></span>
          <span className={`table-badge-tag ${isQrDetected ? 'qr-active' : 'fallback-mode'}`}>
            {isQrDetected ? 'QR Active' : 'Default Table'}
          </span>
        </div>

        <div className="table-selector-box" id="table-selector-box">
          <label htmlFor="table-select">
            <i className="fa-solid fa-chair"></i> {isQrDetected ? 'Change Table:' : 'Select Table:'}
          </label>
          <select
            id="table-select"
            className="table-select"
            value={activeTable}
            onChange={(e) => onTableChange(Number(e.target.value))}
          >
            {tableOptions.map((t) => (
              <option key={t} value={t}>
                Table {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="welcome-title">
        Welcome to <span>QR Restaurant</span>
      </h1>
      <p className="welcome-subtitle">
        Scan, order, and relax. Your food comes straight to Table {activeTable}.
      </p>

      <div className="hero-actions">
        <button className="btn btn-primary" onClick={onViewMenu}>
          <i className="fa-solid fa-book-open"></i> View Our Menu
        </button>
        <button className="btn btn-outline" onClick={onHowItWorks}>
          How it works
        </button>
      </div>

      <div className="welcome-info">
        <div className="info-item">
          <i className="fa-regular fa-clock"></i> Open until 11 PM
        </div>
        <div className="info-item">
          <i className="fa-solid fa-star"></i> 4.8 Rated
        </div>
        <div className="info-item">
          <i className="fa-solid fa-bolt"></i> Fast Service
        </div>
      </div>
    </header>
  );
}
