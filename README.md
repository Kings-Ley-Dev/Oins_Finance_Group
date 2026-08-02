# Oins Finance Group — MERN Investment Platform

A full-stack investment platform: a dark-gold marketing site plus a client
portal and admin panel, backed by Node/Express, MongoDB, Redis and BullMQ.

> **Build status.** All six phases are complete — a full-stack investment
> platform: marketing site, client portal, payments, KYC, realtime, and a
> complete admin control panel. Phase breakdown is at the bottom.

## Structure
```
oins-finance/
├── frontend/   React + Vite + Tailwind + Zustand
├── backend/    Node + Express + MongoDB + Redis + BullMQ
├── shared/     Shared enums/constants
├── docs/       OpenAPI spec + architecture notes
└── docker-compose.yml
```

## Run the frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Run the backend
```bash
cd backend
cp .env.example .env     # fill in MONGO_URI, REDIS_*, JWT_SECRET
npm install
npm run dev              # API on :5000
npm run seed             # optional: create demo user + sample portfolio
npm run worker           # in a second terminal: BullMQ profit distributor
```
After seeding, log in with **demo@oinsfinance.com / password123** (user) or
**admin@oinsfinance.com / admin12345** (admin) to see a
fully populated portfolio backed by real database records.
Or with Docker: `docker compose up` (App + Mongo + Redis + Worker).

## Theme
Antique gold (`#C9A961` / `#A89060`) and bright gold (`#E6C25A`) on warm
near-black, with warm cream light sections. Display type **Sora**, body
**Inter**. All tokens live in `frontend/tailwind.config.js`; all landing copy
lives in `frontend/src/lib/site.js`.

## Build roadmap
| Phase | Scope |
|------|-------|
| 1 ✅ | Landing site, design system, routing, stores, API layer, auth + yield backend |
| 2 ✅ | Auth wired to API (login/register/recovery), full client dashboard shell + growth chart |
| 3 ✅ | Investments live: wallet, subscribe → portfolio → summary API, dashboard on real data |
| 4 ✅ | Payments: sandbox bank & crypto deposits, withdrawals, HMAC-verified webhooks |
| 5 ✅ | KYC uploads (Cloudinary), in-app + email notifications, realtime Socket.IO |
| 6 ✅ | Admin panel: users, deposits, withdrawals, KYC review, ROI config, settings, audit trail |
```
```
