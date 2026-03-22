# 🍽 Easy Serve – Backend Setup

## Stack
- **Node.js** + **Express** – REST API server
- **MongoDB** (via Mongoose) – Order persistence
- **Vanilla HTML/CSS/JS** frontend served as static files

---

## Prerequisites
1. [Node.js](https://nodejs.org/) v18+
2. [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI) — connect to `mongodb://127.0.0.1:27017`
3. MongoDB Community Server running locally (or use a MongoDB Atlas cloud URI)

---

## Project Structure

```
easy-serve/
├── server.js          ← Express entry point
├── .env               ← Environment variables
├── package.json
├── models/
│   └── Order.js       ← Mongoose schema
├── routes/
│   ├── orders.js      ← /api/orders  (GET, POST, PATCH, DELETE)
│   └── menu.js        ← /api/menu    (GET)
├── data/
│   └── menuItems.js   ← Menu data (static)
└── public/            ← Frontend (served as static)
    ├── index.html
    ├── style.css
    ├── data.js
    └── app.js
```

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Make sure MongoDB is running locally
# (Start MongoDB Compass and connect to mongodb://127.0.0.1:27017)

# 3. Start the server
npm start

# Or with auto-reload during development:
npm install -D nodemon
npm run dev
```

Server starts at: **http://localhost:3000**

---

## Environment Variables (`.env`)

```
MONGO_URI=mongodb://127.0.0.1:27017/easy-serve
PORT=3000
```

For **MongoDB Atlas**, replace MONGO_URI with your Atlas connection string:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/easy-serve
```

---

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/menu`                 | Get all menu items       |
| GET    | `/api/menu?cat=Starters`    | Filter by category       |
| GET    | `/api/orders`               | Get all orders           |
| GET    | `/api/orders?table=3`       | Filter by table          |
| POST   | `/api/orders`               | Create new order         |
| PATCH  | `/api/orders/:id/status`    | Update order status      |
| DELETE | `/api/orders/:id`           | Delete an order          |

---

## MongoDB Compass

1. Open **MongoDB Compass**
2. Connect to: `mongodb://127.0.0.1:27017`
3. Database: `easy-serve`
4. Collection: `orders`

You'll see all orders appear here in real-time as customers place them.

---

## Customer URL

Open a browser and visit:
```
http://localhost:3000/?table=5
```
Change `table=5` to any table number.
