# 🛍️ Modern E-Commerce App (Next.js + Stripe + Supabase)

A full-stack e-commerce application built with **Next.js (App Router)**, **Stripe Checkout**, **Supabase**, and **Zustand** for state management.
This project demonstrates a **secure, production-ready payment flow** with webhook verification and persistent order storage.

---

## 🚀 Features

*  Cart system with Zustand (persistent storage)
*  Secure payments via Stripe Checkout
*  Webhook-based payment verification (no fake success)
*  Order storage using Supabase (PostgreSQL)
*  Order + Order Items relational structure
*  Fast UI with Next.js App Router
*  Backend-secured pricing & payment validation

---

## 🧱 Tech Stack

* **Frontend:** Next.js (App Router), React
* **State Management:** Zustand
* **Payments:** Stripe Checkout + Webhooks
* **Backend:** Next.js API Routes
* **Database:** Supabase (PostgreSQL)
* **Deployment Ready:** Vercel + Stripe + Supabase

---

## 🧠 Architecture Overview

```
Cart (Zustand)
   ↓
Checkout API (/api/checkout)
   ↓
Stripe Hosted Checkout Page
   ↓
User Payment
   ↓
Stripe Webhook (/api/webhook)
   ↓
Supabase Database (orders + order_items)
```

> All payment confirmations are handled via **Stripe webhooks**.

---

## 📁 Project Structure

```
/app
  /api
    /checkout        → Creates Stripe session
    /webhook         → Handles Stripe events
  /cart              → Cart page
  /success           → Payment success page

/src
  /lib
    stripe.ts        → Stripe config
    
  /store
    useCart.ts       → Zustand cart store
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_URL=""

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🧪 Local Development Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Run development server

```bash
npm run dev
```

---

### 3. Start Stripe webhook listener

Install Stripe CLI:

```bash
npm install -g stripe
```

Login:

```bash
stripe login
```

Forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the webhook secret into `.env.local`.

---

## 🔐 Security Best Practices

* ✅ Never trust frontend pricing
* ✅ Use Stripe webhooks as source of truth
* ✅ Store Stripe session IDs to prevent duplicates
* ✅ Use HTTPS in production
* ✅ Implement idempotency for Stripe requests

---

## 🚀 Future Improvements

* 🔐 User authentication (Supabase Auth)
* 📦 Inventory & stock management
* 🧾 Order history page (My Orders)
* 💳 Custom checkout (Stripe Elements)
* 📊 Admin dashboard

---

## 👨‍💻 Author

Built by **Rodas_Awgichew**
Feel free to fork, improve, and build on top of it.

---

## 📄 License

This project is open-source and available under the MIT License.
