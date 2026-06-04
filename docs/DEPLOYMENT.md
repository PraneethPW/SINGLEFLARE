# Deployment Guide

## Docker Compose

```bash
docker compose up --build
```

## Production

1. Provision Neon PostgreSQL.
2. Set backend environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `OPENROUTER_API_KEY`
   - `FRONTEND_URL`
3. Run Prisma migration.
4. Deploy backend as a Node service.
5. Deploy `frontend/dist` behind a CDN or static hosting provider.
6. Enable HTTPS and configure CORS to the deployed frontend origin.
