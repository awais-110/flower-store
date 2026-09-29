#!/bin/sh
set -e

: "${DATABASE_URL:?DATABASE_URL is required}"

echo "Waiting for PostgreSQL to accept connections..."
i=0
until node -e "const{Client}=require('pg');const c=new Client(process.env.DATABASE_URL);c.connect().then(()=>c.end().then(()=>process.exit(0))).catch(()=>process.exit(1))"; do
  i=$((i+1))
  if [ "$i" -ge 30 ]; then
    echo "Database never became ready, giving up"
    exit 1
  fi
  echo "Database not ready yet, retrying in 3s..."
  sleep 3
done

echo "Running database migrations..."
medusa db:migrate

if [ "$RUN_SEED" = "true" ]; then
  echo "Seeding flower catalog..."
  medusa exec ./src/migration-scripts/seed-flower-catalog.ts
fi

if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "Ensuring admin user exists..."
  medusa user -e "$ADMIN_EMAIL" -p "$ADMIN_PASSWORD" || true
fi

echo "Starting Medusa on :9000"
exec medusa start