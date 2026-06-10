# 🔔 PingAlert

Real-Time SaaS Insights, Delivered to Your Discord. Send webhook requests when critical application events occur (such as user signups, sales, bugs, or checkout actions) and receive instant, beautifully formatted push alerts directly in your Discord Direct Messages.

---

## 🌟 Key Features

- **Direct Discord Push Alerts**: Connect your account with your Discord ID and receive gorgeous rich-embed alerts inside Discord immediately when webhooks trigger.
- **Dynamic Event Categories**: Separate and categorize events (e.g., `sale`, `bug`, `signup`) with custom icons/emojis and specific border colors.
- **Developer Integration Portal**: Access interactive, ready-to-copy integration templates supporting **cURL**, **JavaScript/TypeScript**, and **Python**.
- **Interactive Analytics & Dashboards**:
  - Live charts showing event proportions across all categories.
  - Interactive quota usage status tracker matching your Stripe subscription tier.
  - Custom category creator and metadata manager.
- **Robust Developer Settings**: View, hide, copy, or refresh API keys securely.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) & [Hono](https://hono.dev/) (routing framework).
- **Database & ORM**: [Neon Serverless PostgreSQL](https://neon.tech/) & [Prisma ORM](https://www.prisma.io/).
- **Caching**: [Upstash Redis](https://upstash.com/) for super-fast quota and rate-limiting lookups.
- **Authentication**: [Clerk](https://clerk.com/) for secure user sign-in and sign-up flows.
- **Payments**: [Stripe](https://stripe.com/) billing portal and subscriptions (Free vs. Pro Plans).
- **Styling & UX**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), and [Lucide Icons](https://lucide.dev/).

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your system:
- Node.js (v18.x or later)
- Package Manager: `pnpm` (recommended), `npm`, or `bun`

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Fill in the credentials in `.env`:
- `DATABASE_URL`: Your Neon PostgreSQL connection string.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: Clerk authentication keys.
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: Stripe payment settings.
- `DISCORD_BOT_TOKEN`: Token for your custom Discord bot/REST application.

### 3. Installation
Install all package dependencies:
```bash
pnpm install
```

### 4. Database Setup
Sync the Prisma schema with your database and generate the client:
```bash
pnpm exec prisma db push
```

### 5. Running the Application
Launch the local development server:
```bash
pnpm run dev
```
Open `http://localhost:3000` in your browser to inspect the application.

---

## 🔌 API Reference

### Trigger Event Hook
Send a `POST` request to register and deliver an event.

- **Endpoint**: `https://<your-domain>/api/v1/events`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <YOUR_API_KEY>`
  - `Content-Type`: `application/json`

#### Request Body Payload Schema
```json
{
  "category": "sale",
  "fields": {
    "amount": "$49.00",
    "plan": "Pro Tier",
    "email": "customer@example.com"
  },
  "description": "Stripe checkout completed successfully"
}
```

#### Curl Integration Snippet
```bash
curl -X POST https://pingalert.com/api/v1/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "sale",
    "fields": {
      "status": "success",
      "amount": "$49.00"
    },
    "description": "Integration Test Event"
  }'
```

---

## 🔒 Security and Validation

- **Secure Context Clipboard Fallback**: Fallback copying mechanisms built in for secure and non-secure environments.
- **Robust Headers Parsing**: Handlers are secured against malformed `Authorization` payloads to prevent unhandled database driver exceptions.
- **Quota Limiting**: Automatic checking of events processed per billing cycle against subscription models (100 events/month for Free tier).

---

## 📄 License
This project is private and proprietary. All rights reserved.
