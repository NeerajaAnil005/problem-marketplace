# Problem Marketplace

Local dev setup and quick run instructions

Prerequisites:
- Node.js (>= 18)
- MongoDB running locally

Quick start

1. Start MongoDB (e.g. `mongod`).
2. Install backend dependencies and run server:

```bash
cd backend
npm install
npm run start
```

3. Open the frontend in a browser (server serves static files):

```
http://localhost:5000/
http://localhost:5000/register.html
http://localhost:5000/login.html
```

Environment

Create a `.env` file inside `backend/` with:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/problemMarketplace
JWT_SECRET=your_super_secret_key
```

Notes

- The backend serves the frontend statically. API routes are under `/api/*`.
- Replace `JWT_SECRET` with a secure secret for production.
- Consider using `nodemon` for development: `npm run dev`.
