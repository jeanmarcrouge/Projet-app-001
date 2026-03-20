# SaaS Compliance MVP

Minimal and fully functional MVP for a compliance SaaS targeting small business owners.

## Stack

- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Notifications**: node-cron (console output mock)

---

## Project structure

```text
/backend
  server.js
  package.json
  .env.example
  /routes
  /controllers
  /models
  /middleware
  /services
  /db
    schema.sql
    seed.sql

/frontend
  package.json
  next.config.mjs
  tailwind.config.js
  postcss.config.mjs
  .env.local.example
  /app
    /dashboard
    /login
    /register
    /profile
    /regulations
    /deadlines
  /components
  /pages
  /styles
```

---

## Database schema

See:

- `backend/db/schema.sql`
- `backend/db/seed.sql`

Core tables:

- `users`
- `companies`
- `regulations`
- `deadlines`
- `pre_registrations` (for landing page lead collection)

Seed data includes 7 example regulations:

1. TVA déclaration mensuelle
2. TVA régime simplifié
3. Cotisations URSSAF
4. Impôt sur les sociétés (IS)
5. CFE
6. Dépôt comptes annuels
7. Autres obligations sociales (exemple)

---

## Backend API

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Business endpoints (JWT protected)

- `GET /regulations` → relevant regulations for the authenticated user company
- `GET /deadlines` → upcoming deadlines
- `POST /companies` → create/update user company profile
- `GET /companies/me` → fetch current company profile
- `GET /dashboard` → deadlines + relevant regulations

### Public endpoint

- `POST /pre-registrations` → landing page lead capture

---

## Rules engine

Implemented in `backend/models/regulationModel.js`:

- `getRelevantRegulations(company)`
- Filters active regulations by JSON conditions:
  - `legal_forms`
  - `vat_regime`
  - `tax_regime`
  - `min_employees`
  - `max_employees`
- Returns human readable fields:
  - `You are affected if ...`
  - `Action: ...`
  - `Date: ...`

---

## Deadline notifications

Implemented with `node-cron` in `backend/services/notificationService.js`.

- Runs daily at 09:00 server time
- Finds deadlines due in 7 days
- Logs notification payload (mock email):
  - Upcoming deadline
  - Action
  - Date

---

## Run locally

### 1) Start PostgreSQL

Create a database named `saas_compliance`.

### 2) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

On startup, backend automatically executes `schema.sql` and `seed.sql`.

Backend default URL: `http://localhost:4000`

### 3) Frontend setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend default URL: `http://localhost:3000`

---

## MVP pages

- `/` Landing page + pre-registration form
- `/login` Login
- `/register` Register
- `/dashboard` Next deadlines + relevant regulations
- `/regulations` Regulation list
- `/deadlines` Deadlines list
- `/profile` Company profile form

---

## Notes

- UI is intentionally minimal and responsive.
- Error middleware and JWT auth middleware are included in backend.
- Seed data makes local testing immediate after backend launch.