# The Laboratory

A personal sneaker collection tracker. Add pairs you own, want, or sold — and keep tabs on your portfolio value.

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express + Node.js (CommonJS)
- **Database:** PostgreSQL + Sequelize
- **Auth:** JWT + bcrypt
- **Deployment:** Render

---

## MVP Features

- User registration and login
- Add sneakers to your collection
- View, edit, and delete sneakers
- Status tracking: owned / wanted / sold
- Profile with collection stats

## Nice-to-Have (Post-MVP)
- Browse mock inventory with buy links
- Filter and sort collection
- Collection stats and total value
- Image uploads
- Public shareable profile

---

## Pages

| Page | Route | Protected |
|---|---|---|
| Landing | `/` | No |
| Register | `/register` | No |
| Login | `/login` | No |
| Collection | `/collection` | Yes |
| Profile | `/profile` | Yes |

---

## UI Libraries

Component framework: Tailwind CSS — utility-first, no pre-built components to fight against, full control over the slate/blue palette
Icon library: React Icons — huge icon collection, simple imports, works out of the box with React + Vite

Installation:
```bash
# Tailwind (already set up in Phase 1)
npm install -D tailwindcss @tailwindcss/vite

# React Icons
npm install react-icons
```

---

## Color Palette

Primary: Blue 700, Blue 500, Blue 100
Neutrals: Slate 900, Slate 700, Slate 500, Slate 50
Semantic: Green (owned), Amber (wanted), Blue (sold/info), Red (danger)

## Font

Inter (Google Fonts) — 400, 500, 600

---

## Environment Variables

```
PORT=5000
NODE_ENV=development
DATABASE_URL=your_postgres_connection_string_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## Installation

```bash
# Clone the repo
git clone https://github.com/jjunglen/Sneaker-Collection-Tracker
cd sneaker-app 

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Add your .env file inside server/
touch server/.env 

# Run both servers
cd ../server
npm run dev   # http://localhost:5000

cd ../client
npm run dev   # http://localhost:5173
```
