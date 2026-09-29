# Deployment

The project ships as three Docker services that run together: a PostgreSQL
database, the Medusa backend, and the Next.js storefront. Deployment is
docker-compose based, which Dokploy supports natively.

## Prerequisites

- A Docker host (Dokploy server) with Node-level tunnel/domains configured.
- A dedicated git repository whose root contains this project (see note
  below about the current repo root).
- A Medusa Publishable API Key and (if Stripe is used) a Stripe key.

> Note: the working checkout is currently nested inside a larger git
> repository rooted at the user's home directory. For Dokploy, push this
> project to its own repository so `package.json`, `docker-compose.yml` and
> the `docker/` folder sit at the repository root.

## Required environment variables

Copied from `.env.example`:

| Variable | Purpose |
| --- | --- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Database credentials |
| `JWT_SECRET`, `COOKIE_SECRET` | Medusa secrets (generate strong values) |
| `STORE_CORS` | Storefront origin(s), e.g. `https://store.example.com` |
| `ADMIN_CORS` | Backend dashboard + store origins |
| `AUTH_CORS` | Storefront origin for auth flows |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Public backend URL the browser sees, e.g. `https://api.example.com` |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa publishable key |
| `NEXT_PUBLIC_BASE_URL` | Canonical storefront URL |
| `NEXT_PUBLIC_DEFAULT_REGION` | Region code, default `dk` |
| `RUN_SEED` | `true` to seed the flower catalog on first backend start |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Create/ensure the first admin user |
| `NEXT_PUBLIC_STRIPE_KEY` | Optional Stripe publishable key |

`NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`,
`NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_DEFAULT_REGION` are baked into the
storefront image at build time, so the compose build replaces
`NEXT_PUBLIC_MEDUSA_BACKEND_URL` with the same value provided in
`STORE_CORS`/`AUTH_CORS` (browser-facing origin).

## Local run

```bash
cp .env.example .env   # fill in real values
docker compose up --build -d
```

- Storefront http://localhost:8000
- Backend API http://localhost:9000
- Admin dashboard http://localhost:9000/app

Use `docker compose logs -f backend` to watch migrations/seeding.

## Dokploy deployment

1. In Dokploy, add the git repository (the one where this project is the
   root).
2. Create a **Docker Compose** application pointing at the repository and the
   root `docker-compose.yml`.
3. Add the environment variables from the table above (Dokploy "Environment"
   section; also used for var substitution in the compose file).
4. Deploy. The `db` service starts first, the backend then runs migrations,
   and the storefront waits for the backend `/health` endpoint before
   starting.
5. On the first deploy keep `RUN_SEED=true` so the flower catalog is seeded,
   and set `ADMIN_EMAIL`/`ADMIN_PASSWORD` to create the dashboard user.
   After it has run once, flip `RUN_SEED` to `false` (the seed script is
   safe to re-run, it upserts).
6. Point store/backend domains at the corresponding services/ports.

### Migrations and one-off commands

Migrations run automatically on every backend start (`medusa db:migrate`).
For one-off commands (new admin, custom scripts) run from a Dokploy terminal
in the `backend` container with `cd /app/apps/backend` and e.g.
`medusa user -e you@example.com -p changeme`.

## Notes

- No Redis is required: `medusa-config.ts` only wires PostgreSQL, so the
  default workflow engine and events run in-process.
- Secrets live in Dokploy's environment, never in the image. The storefront
  image bakes only public variables.
- Backend healthcheck uses `/health`; storefront starts only after the
  backend is healthy.