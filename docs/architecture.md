# Oins Finance — Architecture

## Overview
A MERN investment platform. HTTP web traffic is decoupled from the daily
yield calculation, which runs in an isolated BullMQ worker process.

## Daily profit flow
1. `schedulers.js` enqueues a `daily-profit` job at 00:00 (cron `0 0 * * *`).
2. `profitDistributor.worker.js` loops every `active` Investment.
3. For each, `dailyYield()` computes a drift-free increment and appends a
   record to the `EarningsLog` (unique on `investment + postedFor` to prevent
   double-posting), then updates `Investment.accrued`.
4. `autoClosePlans.worker.js` (roadmap) flips matured plans to `matured` and
   refunds principal.
5. The frontend `Performance` page renders the EarningsLog as a growth chart.

## Layers
- **controllers** — request/response only.
- **services** — business logic (subscriptions, notifications, payments).
- **jobs** — async workers (profit, plan maturity, email dispatch).
- **sockets** — push balance/earnings updates to connected clients.

## Payments
Deposits and withdrawals go through a provider abstraction (`services/payment/`)
with a sandbox implementation:
- **Bank** — `virtualAccount.js` allocates a virtual account; the user transfers
  to it; the provider calls `POST /webhooks/bank`.
- **Crypto** — `dynamicWallet.js` derives a per-deposit address; the chain
  provider calls `POST /webhooks/crypto` on confirmation.
Webhooks are mounted with a raw body parser and verified with an HMAC-SHA256
signature (`x-oins-signature`) before `confirmDeposit()` credits the wallet
(idempotent). Withdrawals hold funds on request, pending admin approval (Phase 6).
Swap the sandbox provider for Paystack/Coinbase by implementing the same interface.

## Realtime, KYC & notifications
- **Sockets** — Socket.IO is attached to the HTTP server and authenticated with
  the same JWT (`auth.token` handshake). Each user joins a `user:<id>` room;
  `emitToUser()` pushes `wallet:update` and `notification` events live.
- **Notifications** — `notification.service.notify()` persists an in-app record,
  emits it over the socket, and optionally emails it. Hooked into deposit
  confirmation, withdrawal requests and new investments.
- **KYC** — documents upload through Multer (memory) to Cloudinary
  (`uploadBuffer`), which degrades to a stub URL when credentials are absent so
  the flow runs in development. Status: unverified → pending → approved/rejected.

## Admin control plane
`adminOnly` middleware guards `/admin/*`. The admin service centralises
privileged operations — each mutation writes an append-only `AuditLog`
(actor, action, target, meta). Withdrawals approve (release) or reject (refund
the held funds); deposits can be manually confirmed; KYC is approved/rejected
with a user notification; ROI overrides and system flags live in a singleton
`Settings` document, with ROI overrides consulted at subscribe time.
