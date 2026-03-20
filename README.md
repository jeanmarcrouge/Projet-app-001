# SaaS Compliance MVP

Minimal but fully functional MVP for a SaaS web app helping small business owners manage tax, social and legal compliance.

## Tech stack

- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: JWT
- **Notifications**: node-cron (console log in MVP mode)

## Project structure

```text
/backend
  server.js
  /config
  /routes
  /controllers
  /models
  /middleware
  /services
  /sql
/frontend
  /app
    /dashboard
    /login
    /register
    /profile
    /regulations
    /deadlines
  /components
  /lib
  /styles
```

## Database setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE saas_compliance;
```

2. Run schema and seed scripts:

```bash
psql -U postgres -d saas_compliance -f backend/sql/schema.sql
psql -U postgres -d saas_compliance -f backend/sql/seed.sql
```

Seed includes:
- users / companies sample data
- **7 regulations** (TVA, URSSAF, IS, CFE, legal obligations)
- upcoming deadlines

### Seed login

- **Email**: `owner@example.com`
- **Password**: `password123`

## Backend run

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

### Main backend endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/companies` (JWT)
- `GET /api/companies/me` (JWT)
- `GET /api/regulations` (JWT)
- `GET /api/deadlines` (JWT)
- `GET /api/dashboard` (JWT)
- `POST /api/preregistrations` (landing page)

## Frontend run

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## MVP behavior

- User registers/logs in and receives JWT token.
- User completes company profile.
- Rules engine filters regulations from `conditions` JSON.
- Dashboard shows:
  - nearest deadlines (color-coded urgency)
  - relevant regulation cards with source links
- Daily cron checks deadlines due in 7 days and logs notification messages.
- Landing page collects pre-registrations.

## Notes

- Notification service is console-based for MVP. Replace with an email provider (SendGrid, Brevo, etc.) when needed.
- Keep `JWT_SECRET` secure in production.
