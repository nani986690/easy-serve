# 🍽 QR Restaurant – Full-Stack QR Ordering System

A full-stack table-specific QR restaurant ordering web application. Customers scan a QR code on their table to browse the menu, add items to their cart, and submit orders directly to the kitchen.

## 🛠 Tech Stack
- **Frontend**: **React 18** + **Vite**, responsive modular components, theme toggle (light/dark), and FontAwesome icons.
- **Backend**: **Node.js** + **Express 5** REST API.
- **Database**: **MongoDB** (via Mongoose) with live order persistence.
- **Production**: Express serves the optimized Vite production build (`client/dist/`) and all `/api/...` endpoints.

---

## 📁 Project Structure

```
easy-serve/
├── server.js                ← Express entry point & production static server
├── .env                     ← Environment variables (MONGO_URI, PORT)
├── package.json             ← Root scripts (start, build, dev)
├── models/
│   └── Order.js             ← Mongoose Order Schema with table validation
├── routes/
│   ├── orders.js            ← /api/orders (GET, POST, PATCH status, DELETE)
│   └── menu.js              ← /api/menu (GET with ?cat= filter)
├── data/
│   └── menuItems.js         ← Default menu data
├── client/                  ← React (Vite) Frontend
│   ├── index.html           ← React HTML shell & fonts
│   ├── package.json         ← Client dependencies & scripts
│   ├── vite.config.js       ← Vite config with /api & /images proxy to backend
│   ├── public/              ← Static assets (food images)
│   └── src/
│       ├── main.jsx         ← React entry
│       ├── App.jsx          ← State, table QR detection, cart & routing
│       ├── index.css        ← Light/dark styling & responsive layouts
│       ├── data/            ← Fallback menu data
│       └── components/
│           ├── Navbar.jsx           ← Logo, navigation, table badge, theme toggle, cart
│           ├── Hero.jsx             ← Hero, table chip, table selector dropdown
│           ├── PopularSection.jsx   ← Top dishes grid with quick add
│           ├── FeaturesSection.jsx  ← Feature highlights
│           ├── HowItWorks.jsx       ← 4-step ordering guide
│           ├── MenuPage.jsx         ← Category tabs, search filter, item grid
│           ├── MenuItemCard.jsx     ← Food card with veg/pop tags & qty controls
│           ├── CartDrawer.jsx       ← Slide-in cart, table notice, breakdown, place order
│           ├── OrderConfirm.jsx     ← Confirmation, table delivery destination, steps
│           ├── AdminDashboard.jsx   ← Table filter, revenue metrics, Kanban board
│           ├── FloatingCart.jsx     ← Mobile & desktop floating cart pill
│           ├── Toast.jsx            ← Notification toast
│           └── Footer.jsx           ← Site footer
└── public/                  ← Fallback static files & food images
```

---

## 🚀 Local Setup & Development

### 1. Prerequisites
- **Node.js** v18+
- **MongoDB** running locally (or a free MongoDB Atlas cloud URI)

### 2. Install Dependencies
```bash
# Root Express dependencies
npm install

# Client React dependencies
npm run client:install
```
*(On Windows PowerShell, use `npm.cmd` if PowerShell script execution is restricted: `npm.cmd install`)*

### 3. Run in Development Mode
You can run backend and frontend concurrently:

- **Terminal 1 (Backend API)**:
  ```bash
  npm run dev:server
  ```
  Runs Express at: `http://localhost:3000`

- **Terminal 2 (React Vite Frontend)**:
  ```bash
  npm run dev:client
  ```
  Runs Vite at: `http://localhost:5173` (proxies `/api` and `/images` to port 3000)

---

## 📦 Production Build & Testing Locally

1. **Build the React Frontend**:
   ```bash
   npm run build
   ```
   This generates an optimized production bundle inside `client/dist/`.

2. **Start the Production Server**:
   ```bash
   npm start
   ```
   Server starts at: `http://localhost:3000`

---

## 📱 Testing Table QR Ordering

### A. Customer Scans QR Code (`/?table=5`)
Open your browser to:
```
http://localhost:3000/?table=5
```
*(Or in Vite dev mode: `http://localhost:5173/?table=5`)*

- **Navbar**: Shows **Table 5** with a green **`QR`** badge.
- **Hero**: The table badge displays **Table 5** with **`QR ACTIVE`**.
- **Table Selector**: Pre-selected to Table 5 with an option to change.
- **Cart Drawer**: Confirms **“Ordering for Table 5”**.
- **Place Order**: Submitting the order sends `{ table: 5, ... }` to `POST /api/orders`.
- **Confirmation**: Confirms delivery to **Table 5**.

### B. Customer Visits Without QR (`/`)
Open your browser to:
```
http://localhost:3000/
```
- Active table defaults to **Table 1** labeled **`DEFAULT TABLE`**.
- An inline table selector allows the customer to pick their table (e.g. Table 4).
- Selecting a table updates all indicators and updates the URL to `/?table=4` via `history.replaceState` without a page reload.

---

## 🌐 Deploying to Render

1. Create a new **Web Service** on [Render](https://render.com/).
2. Connect your Git repository.
3. Configure the service settings:
   - **Environment**: `Node`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
4. Set Environment Variables:
   - `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/easy-serve?retryWrites=true&w=majority`
   - `PORT`: (Provided automatically by Render)
5. Click **Deploy Web Service**.
