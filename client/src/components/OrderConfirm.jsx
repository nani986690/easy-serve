import React from 'react';

export default function OrderConfirm({ order, activeTable, onBackToMenu }) {
  const table = order?.table || activeTable;
  const items = order?.items || [];
  const total = order?.total || 0;

  return (
    <div className="confirm-page page-container" id="confirm">
      <div className="confirm-icon">
        <i className="fa-solid fa-check"></i>
      </div>
      <h1 className="confirm-title">Order Placed!</h1>
      <p className="confirm-sub">Hang tight, our chefs are preparing your food.</p>

      <div className="confirm-table-banner" id="confirm-table-banner">
        <i className="fa-solid fa-bell-concierge"></i> Delivering to{' '}
        <strong>Table {table}</strong>
      </div>

      <div className="eta">
        <i className="fa-regular fa-clock"></i> Estimated time:{' '}
        <span id="eta-time">20–25 min</span>
      </div>

      <div className="order-summary-card" id="confirm-items">
        <div
          className="os-row"
          style={{
            fontWeight: 600,
            borderBottom: '1px solid var(--border)',
            paddingBottom: '8px',
            marginBottom: '8px',
          }}
        >
          <span>Delivering to Table</span>
          <span style={{ color: 'var(--brand)' }}>Table {table}</span>
        </div>

        {items.map((i, idx) => (
          <div key={idx} className="os-row">
            <span>
              {i.name} ×{i.qty}
            </span>
            <span>₹{(i.price * i.qty).toFixed(2)}</span>
          </div>
        ))}

        <div className="os-row grand">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="steps-container mini-steps">
        <div className="step-card step-2">
          <div className="step-icon-box">
            <i className="fa-solid fa-receipt"></i>
          </div>
          <h4>Order received</h4>
          <p>Sent to kitchen queue</p>
        </div>
        <div className="step-card step-4">
          <div className="step-icon-box">
            <i className="fa-solid fa-fire-burner"></i>
          </div>
          <h4>Being prepared</h4>
          <p>Cooked fresh for you</p>
        </div>
        <div className="step-card step-3">
          <div className="step-icon-box">
            <i className="fa-solid fa-plate-wheat"></i>
          </div>
          <h4>Served to table</h4>
          <p>Staff brings to Table {table}</p>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onBackToMenu}>
        <i className="fa-solid fa-arrow-left"></i> Back to Menu
      </button>
    </div>
  );
}
