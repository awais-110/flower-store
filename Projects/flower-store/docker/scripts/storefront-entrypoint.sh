#!/bin/sh
set -e

: "${NEXT_PUBLIC_MEDUSA_BACKEND_URL:?NEXT_PUBLIC_MEDUSA_BACKEND_URL is required}"

echo "Waiting for Medusa backend at $NEXT_PUBLIC_MEDUSA_BACKEND_URL..."
i=0
until node -e "fetch(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/health',{signal:AbortSignal.timeout(5000)}).then(r=>r.status===200?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"; do
  i=$((i+1))
  if [ "$i" -ge 60 ]; then
    echo "Backend never became ready, giving up"
    exit 1
  fi
  echo "Backend not ready yet, retrying in 3s..."
  sleep 3
done

echo "Starting storefront on :8000"
exec npx next start -p 8000