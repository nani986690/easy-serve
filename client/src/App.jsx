import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularSection from './components/PopularSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import MenuPage from './components/MenuPage';
import CartDrawer from './components/CartDrawer';
import OrderConfirm from './components/OrderConfirm';
import AdminDashboard from './components/AdminDashboard';
import FloatingCart from './components/FloatingCart';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { categories, defaultMenuItems } from './data/defaultMenu';

export default function App() {
  const [page, setPage] = useState('welcome');
  const [theme, setTheme] = useState('light');
  const [activeTable, setActiveTable] = useState(1);
  const [isQrDetected, setIsQrDetected] = useState(false);

  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [selectedCat, setSelectedCat] = useState('All');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // ── Show Toast Helper ──
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2200);
  };

  // ── Read URL Search Params on Mount (?table=5) ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    const parsed = parseInt(tableParam, 10);

    if (tableParam !== null && !isNaN(parsed) && parsed > 0) {
      setActiveTable(parsed);
      setIsQrDetected(true);
    } else {
      setActiveTable(1);
      setIsQrDetected(false);
    }
  }, []);

  // ── Sync Theme with HTML Attribute ──
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // ── Table Change Handler ──
  const handleTableChange = (newTable) => {
    const parsed = parseInt(newTable, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setActiveTable(parsed);
      setIsQrDetected(true);

      // Reflect in browser address bar without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('table', parsed);
      window.history.replaceState({}, '', url.toString());

      showToast(`Table set to Table ${parsed}`);
    }
  };

  const scrollToTableSelector = () => {
    setPage('welcome');
    setTimeout(() => {
      const el = document.getElementById('table-selector-box');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  // ── Fetch Menu from API ──
  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        }
      }
    } catch (err) {
      console.warn('Backend /api/menu not reachable, using default menu items.', err);
    }
  };

  // ── Fetch Orders from API ──
  const fetchOrders = async (tableNum) => {
    try {
      const url = tableNum ? `/api/orders?table=${tableNum}` : '/api/orders';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to load orders from backend:', err);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  // ── Cart Operations ──
  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    showToast(`${item.emoji || '🍽️'} ${item.name} added!`);
  };

  const handleUpdateQty = (itemId, delta) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      const updated = { ...prev };
      if (next <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const totalCartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  // ── Place Order ──
  const handlePlaceOrder = async () => {
    const keys = Object.keys(cart);
    if (!keys.length) return;

    let sub = 0;
    const items = keys.map((id) => {
      const item = menuItems.find((i) => i.id === id) || {
        id,
        name: 'Item',
        price: 0,
      };
      const qty = cart[id];
      sub += item.price * qty;
      return { id, name: item.name, qty, price: item.price };
    });

    const tax = sub * 0.09;
    const total = +(sub + tax).toFixed(2);

    setIsPlacingOrder(true);
    try {
      const payload = {
        table: Number(activeTable),
        items,
        total,
        note: '',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Order creation failed');
      }

      const savedOrder = await res.json();
      setLastOrder(savedOrder);
      setCart({});
      setIsCartOpen(false);
      setPage('confirm');
      showToast('🎉 Order placed successfully!');
      fetchOrders();
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ── Admin Actions ──
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');
      showToast(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Order removed');
      fetchOrders();
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to delete order');
    }
  };

  return (
    <div className="app-root">
      <Navbar
        page={page}
        setPage={setPage}
        activeTable={activeTable}
        isQrDetected={isQrDetected}
        onTableBadgeClick={scrollToTableSelector}
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {page === 'welcome' && (
          <div className="page-container">
            <Hero
              activeTable={activeTable}
              isQrDetected={isQrDetected}
              onTableChange={handleTableChange}
              onViewMenu={() => setPage('menu')}
              onHowItWorks={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <PopularSection
              items={menuItems}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQty={handleUpdateQty}
              onViewMenu={() => setPage('menu')}
            />

            <FeaturesSection />

            <HowItWorks />
          </div>
        )}

        {page === 'menu' && (
          <MenuPage
            menuItems={menuItems}
            categories={categories}
            selectedCat={selectedCat}
            onSelectCat={setSelectedCat}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            activeTable={activeTable}
          />
        )}

        {page === 'confirm' && (
          <OrderConfirm
            order={lastOrder}
            activeTable={activeTable}
            onBackToMenu={() => setPage('menu')}
          />
        )}

        {page === 'admin' && (
          <AdminDashboard
            orders={orders}
            onRefresh={() => fetchOrders()}
            onUpdateStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        )}
      </main>

      <Footer setPage={setPage} />

      <FloatingCart
        cart={cart}
        menuItems={menuItems}
        onOpenCart={() => setIsCartOpen(true)}
        visible={page === 'welcome' || page === 'menu'}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        menuItems={menuItems}
        activeTable={activeTable}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
        isPlacingOrder={isPlacingOrder}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
