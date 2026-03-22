// ── State ──
let cart = {};
let tableNum = 1;
let currentCat = 'All';

const API = '';   // same-origin; change to 'http://localhost:3000' if running separately

// ── Init ──
window.onload = async () => {
  const p = new URLSearchParams(location.search);
  tableNum = parseInt(p.get('table')) || 1;
  document.getElementById('welcome-table').textContent = tableNum;
  document.getElementById('nav-table').textContent = 'Table ' + tableNum;

  await loadMenu();
  renderCategories();
  renderMenuGrid();
  populateTableFilter();
  showPage('welcome');
};

// ════════════════════════════════
//  API HELPERS
// ════════════════════════════════
async function loadMenu() {
  try {
    const res = await fetch(`${API}/api/menu`);
    menuItems = await res.json();
  } catch (e) {
    console.error('Failed to load menu:', e);
  }
}

async function loadOrders() {
  try {
    const res = await fetch(`${API}/api/orders`);
    orders = await res.json();
  } catch (e) {
    console.error('Failed to load orders:', e);
  }
}

async function createOrder(payload) {
  const res = await fetch(`${API}/api/orders`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

async function updateOrderStatus(id, status) {
  const res = await fetch(`${API}/api/orders/${id}/status`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
}

// ════════════════════════════════
//  NAVIGATION
// ════════════════════════════════
function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById(p).classList.add('active');

  const nav       = document.getElementById('navbar');
  const cartBtn   = document.getElementById('cart-nav-btn');
  const floatCart = document.getElementById('float-cart');

  if (p === 'welcome') {
    nav.classList.add('hidden');
    floatCart.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }

  if (p === 'menu') {
    cartBtn.style.display = 'flex';
    updateFloatCart();
  } else {
    cartBtn.style.display = 'none';
    floatCart.classList.add('hidden');
  }

  if (p === 'admin') renderAdmin();
  window.scrollTo(0, 0);
}

// ════════════════════════════════
//  THEME
// ════════════════════════════════
function toggleTheme() {
  const h = document.documentElement;
  const isDark = h.getAttribute('data-theme') === 'dark';
  h.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelector('.theme-btn').textContent = isDark ? '🌙' : '☀️';
}

// ════════════════════════════════
//  MENU
// ════════════════════════════════
function renderCategories() {
  document.getElementById('categories').innerHTML = categories
    .map(c => `<button class="cat-pill${c === currentCat ? ' active' : ''}" onclick="filterCat('${c}')">${c}</button>`)
    .join('');
}

function filterCat(c) {
  currentCat = c;
  renderCategories();
  renderMenuGrid();
}

function renderMenuGrid() {
  const items = currentCat === 'All' ? menuItems : menuItems.filter(i => i.cat === currentCat);
  document.getElementById('menu-grid').innerHTML = items.map(item => {
    const qty = cart[item.id] || 0;
    return `
      <div class="menu-card">
        <div class="menu-img">${item.emoji}</div>
        <div class="menu-body">
          <div class="menu-tags">
            ${item.veg ? '<span class="tag tag-veg">VEG</span>' : ''}
            ${item.pop ? '<span class="tag tag-pop">🔥 Popular</span>' : ''}
          </div>
          <div class="menu-name">${item.name}</div>
          <div class="menu-desc">${item.desc}</div>
          <div class="menu-footer">
            <span class="menu-price">₹${item.price.toFixed(2)}</span>
            ${qty === 0
              ? `<button class="add-btn" onclick="addToCart('${item.id}')">+ Add</button>`
              : `<div class="qty-ctrl">
                   <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
                   <span class="qty-num">${qty}</span>
                   <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
                 </div>`
            }
          </div>
        </div>
      </div>`;
  }).join('');
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  const item = menuItems.find(i => i.id === id);
  showToast(`${item.emoji} ${item.name} added!`);
  renderMenuGrid();
  updateCartUI();
  updateFloatCart();
}

function changeQty(id, d) {
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  renderMenuGrid();
  updateCartUI();
  updateFloatCart();
}

// ════════════════════════════════
//  CART DRAWER
// ════════════════════════════════
function openCart() {
  document.getElementById('overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
}

function renderCartDrawer() {
  const keys   = Object.keys(cart);
  const listEl = document.getElementById('cart-items-list');
  const foot   = document.getElementById('cart-foot');

  if (keys.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:.8rem;margin-top:8px;color:var(--text2)">Add items from the menu</p>
      </div>`;
    foot.style.display = 'none';
    return;
  }

  let sub = 0;
  listEl.innerHTML = keys.map(id => {
    const item = menuItems.find(i => i.id === id);
    const qty  = cart[id];
    sub += item.price * qty;
    return `
      <div class="cart-item">
        <div class="ci-info">
          <div class="ci-name">${item.emoji} ${item.name}</div>
          <div class="ci-price">₹${item.price.toFixed(2)} each</div>
        </div>
        <div class="ci-ctrl">
          <button class="qty-btn" onclick="cartQty('${id}',-1)">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="cartQty('${id}',1)">+</button>
          <button class="ci-remove" onclick="cartQty('${id}',-99)" title="Remove">🗑</button>
        </div>
      </div>`;
  }).join('');

  const tax = sub * 0.09;
  document.getElementById('sub-total').textContent   = '₹' + sub.toFixed(2);
  document.getElementById('tax-total').textContent   = '₹' + tax.toFixed(2);
  document.getElementById('grand-total').textContent = '₹' + (sub + tax).toFixed(2);
  foot.style.display = 'block';
}

function cartQty(id, d) {
  if (d === -99) { delete cart[id]; }
  else { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; }
  renderCartDrawer();
  renderMenuGrid();
  updateCartUI();
  updateFloatCart();
}

function updateCartUI() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById('cart-badge').textContent = total;
}

function updateFloatCart() {
  const fc   = document.getElementById('float-cart');
  const keys = Object.keys(cart);
  if (keys.length === 0) { fc.classList.add('hidden'); return; }
  fc.classList.remove('hidden');
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  let total = 0;
  keys.forEach(id => {
    const item = menuItems.find(i => i.id === id);
    total += item.price * cart[id];
  });
  document.getElementById('float-count').textContent = count + ' item' + (count > 1 ? 's' : '');
  document.getElementById('float-total').textContent = '₹' + total.toFixed(2);
}

// ════════════════════════════════
//  PLACE ORDER  (now saves to MongoDB)
// ════════════════════════════════
async function placeOrder() {
  const keys = Object.keys(cart);
  if (!keys.length) return;

  let sub = 0;
  const items = keys.map(id => {
    const item = menuItems.find(i => i.id === id);
    const qty  = cart[id];
    sub += item.price * qty;
    return { id, name: item.name, qty, price: item.price };
  });

  const tax   = sub * 0.09;
  const total = +(sub + tax).toFixed(2);

  try {
    const order = await createOrder({ table: tableNum, items, total, note: '' });
    orders.unshift(order);
    renderConfirm(items, total);
    cart = {};
    updateCartUI();
    updateFloatCart();
    closeCart();
    showPage('confirm');
    populateTableFilter();
  } catch (err) {
    showToast('❌ Failed to place order. Try again.');
    console.error(err);
  }
}

function renderConfirm(items, total) {
  document.getElementById('confirm-items').innerHTML =
    items.map(i =>
      `<div class="os-row">
         <span>${i.name} ×${i.qty}</span>
         <span>₹${(i.price * i.qty).toFixed(2)}</span>
       </div>`
    ).join('') +
    `<div class="os-row"><span>Total</span><span>₹${total.toFixed(2)}</span></div>`;
}

// ════════════════════════════════
//  ADMIN DASHBOARD  (now loads from MongoDB)
// ════════════════════════════════
function populateTableFilter() {
  const sel    = document.getElementById('table-filter');
  const tables = [...new Set(orders.map(o => o.table))].sort((a, b) => a - b);
  const cur    = sel.value;
  sel.innerHTML =
    '<option value="all">All Tables</option>' +
    tables.map(t => `<option value="${t}"${cur == t ? ' selected' : ''}>Table ${t}</option>`).join('');
}

async function renderAdmin() {
  await loadOrders();
  populateTableFilter();
  renderRevenue();
  renderKanban();
}

function renderRevenue() {
  const total = orders.reduce((a, o) => a + o.total, 0);
  const avg   = orders.length ? total / orders.length : 0;
  document.getElementById('revenue-grid').innerHTML = `
    <div class="rev-card">
      <div class="rev-label">Total Revenue</div>
      <div class="rev-val">₹${total.toFixed(0)}</div>
      <div class="rev-sub">↑ Live from DB</div>
    </div>
    <div class="rev-card">
      <div class="rev-label">Orders Today</div>
      <div class="rev-val">${orders.length}</div>
      <div class="rev-sub">↑ Real-time</div>
    </div>
    <div class="rev-card">
      <div class="rev-label">Avg Order</div>
      <div class="rev-val">₹${avg.toFixed(0)}</div>
      <div class="rev-sub">Per table</div>
    </div>`;
}

function renderKanban() {
  const tf       = document.getElementById('table-filter').value;
  const filtered = tf === 'all' ? orders : orders.filter(o => o.table == tf);

  const cols = [
    { status:'New',       dot:'var(--red)',    next:'Preparing', action:'Start Preparing' },
    { status:'Preparing', dot:'var(--yellow)', next:'Served',    action:'Mark Served'     },
    { status:'Served',    dot:'var(--green)',  next:null,        action:null              },
  ];

  // Use MongoDB _id for updates
  const getId = o => o._id || o.id;

  document.getElementById('kanban').innerHTML = cols.map(col => {
    const colOrders = filtered.filter(o => o.status === col.status);
    return `
      <div class="kanban-col">
        <div class="col-head">
          <div class="col-dot" style="background:${col.dot}"></div>
          <span class="col-title">${col.status}</span>
          <span class="col-count">${colOrders.length}</span>
        </div>
        ${colOrders.length === 0
          ? `<p style="font-size:.8rem;color:var(--text2);text-align:center;padding:20px 0">No orders</p>`
          : ''
        }
        ${colOrders.map(o => `
          <div class="order-card">
            <div class="oc-head">
              <span class="oc-table">Table ${o.table}</span>
              <span class="oc-time">${o.time || ''}</span>
            </div>
            <div class="oc-items">${o.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</div>
            ${o.note ? `<div class="oc-note">📝 ${o.note}</div>` : ''}
            <div class="oc-footer">
              <span class="oc-total">₹${o.total.toFixed(2)}</span>
              ${col.action
                ? `<button class="btn btn-primary btn-sm" onclick="advanceOrder('${getId(o)}','${col.next}')">${col.action}</button>`
                : `<span class="status-badge badge-served">✅ Done</span>`
              }
            </div>
          </div>`).join('')}
      </div>`;
  }).join('');
}

async function advanceOrder(id, next) {
  try {
    await updateOrderStatus(id, next);
    showToast('Order updated to ' + next);
    renderAdmin();
  } catch (err) {
    showToast('❌ Update failed');
    console.error(err);
  }
}

// ════════════════════════════════
//  TOAST
// ════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
