import React, { useState } from 'react';

export default function AdminDashboard({
  orders,
  onRefresh,
  onUpdateStatus,
  onDeleteOrder,
}) {
  const [tableFilter, setTableFilter] = useState('all');

  // Discover all distinct tables present in orders
  const distinctTables = [...new Set(orders.map((o) => o.table))].sort(
    (a, b) => a - b
  );

  const filteredOrders =
    tableFilter === 'all'
      ? orders
      : orders.filter((o) => String(o.table) === String(tableFilter));

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;

  const cols = [
    {
      status: 'New',
      dot: 'var(--red)',
      next: 'Preparing',
      actionText: 'Start Preparing',
      badgeClass: 'badge-new',
    },
    {
      status: 'Preparing',
      dot: 'var(--yellow)',
      next: 'Served',
      actionText: 'Mark Served',
      badgeClass: 'badge-prep',
    },
    {
      status: 'Served',
      dot: 'var(--green)',
      next: null,
      actionText: null,
      badgeClass: 'badge-served',
    },
  ];

  const getOrderId = (o) => o._id || o.id;

  return (
    <div className="admin-page page-container" id="admin">
      <div className="admin-header">
        <h2 className="admin-title">
          <i className="fa-solid fa-chart-line"></i> Kitchen & Orders Dashboard
        </h2>

        <div className="admin-controls">
          <button
            className="btn btn-outline btn-sm"
            onClick={onRefresh}
            title="Refresh Orders"
          >
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>

          <select
            className="filter-select"
            id="table-filter"
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
          >
            <option value="all">All Tables ({orders.length})</option>
            {distinctTables.map((t) => (
              <option key={t} value={t}>
                Table {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="revenue-grid" id="revenue-grid">
        <div className="rev-card">
          <div
            className="rev-icon"
            style={{ color: '#E85D04', background: 'rgba(232, 93, 4, 0.15)' }}
          >
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <div>
            <div className="rev-label">Total Revenue</div>
            <div className="rev-val">₹{totalRevenue.toFixed(0)}</div>
            <div className="rev-sub">Live from Database</div>
          </div>
        </div>

        <div className="rev-card">
          <div
            className="rev-icon"
            style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.15)' }}
          >
            <i className="fa-solid fa-receipt"></i>
          </div>
          <div>
            <div className="rev-label">Total Orders</div>
            <div className="rev-val">{orders.length}</div>
            <div className="rev-sub">Real-time counter</div>
          </div>
        </div>

        <div className="rev-card">
          <div
            className="rev-icon"
            style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.15)' }}
          >
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div>
            <div className="rev-label">Avg Order Value</div>
            <div className="rev-val">₹{avgOrder.toFixed(0)}</div>
            <div className="rev-sub">Across all tables</div>
          </div>
        </div>
      </div>

      <div className="kanban" id="kanban">
        {cols.map((col) => {
          const colOrders = filteredOrders.filter((o) => o.status === col.status);
          return (
            <div
              key={col.status}
              className="kanban-col"
              style={{ borderTopColor: col.dot }}
            >
              <div className="col-head">
                <div
                  className="col-dot"
                  style={{ background: col.dot }}
                ></div>
                <span className="col-title">{col.status}</span>
                <span className="col-count">{colOrders.length}</span>
              </div>

              {colOrders.length === 0 ? (
                <p
                  style={{
                    fontSize: '.85rem',
                    color: 'var(--text2)',
                    textAlign: 'center',
                    padding: '24px 0',
                  }}
                >
                  No {col.status.toLowerCase()} orders
                </p>
              ) : (
                colOrders.map((o) => {
                  const id = getOrderId(o);
                  return (
                    <div key={id} className="order-card">
                      <div className="oc-head">
                        <span className="oc-table">
                          <i className="fa-solid fa-chair"></i> Table {o.table}
                        </span>
                        <span className="oc-time">{o.time || ''}</span>
                      </div>

                      <div className="oc-items">
                        {(o.items || []).map((it, idx) => (
                          <span key={idx}>
                            {it.name} ×{it.qty}
                            {idx < o.items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>

                      {o.note && (
                        <div className="oc-note">
                          <i className="fa-solid fa-note-sticky"></i> {o.note}
                        </div>
                      )}

                      <div className="oc-footer">
                        <span className="oc-total">
                          ₹{(o.total || 0).toFixed(2)}
                        </span>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {col.actionText ? (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => onUpdateStatus(id, col.next)}
                            >
                              {col.actionText}
                            </button>
                          ) : (
                            <span className="status-badge badge-served">
                              <i className="fa-solid fa-check"></i> Done
                            </span>
                          )}

                          <button
                            className="btn btn-outline btn-sm"
                            style={{ padding: '4px 8px', borderColor: 'transparent' }}
                            onClick={() => onDeleteOrder(id)}
                            title="Delete order"
                          >
                            <i className="fa-solid fa-trash" style={{ color: '#ef4444' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
