#!/usr/bin/env sh
set -eu

npm install
npm run prisma:generate
npm run build
echo "SignalFlare build completed. Deploy frontend/dist and backend/dist with configured environment variables."
