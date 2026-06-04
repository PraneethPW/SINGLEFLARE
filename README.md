# SignalFlare

SignalFlare is a decentralized emergency communication platform for disaster response. It combines SOS broadcasting, real-time community coordination, AI assistance, resource tracking, volunteer workflows, and an intelligence dashboard.

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run prisma:generate
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5153`

## Structure

```text
signalflare/
  frontend/     React 19, TypeScript, Vite, Tailwind, Three.js
  backend/      Node.js, Express, TypeScript, Socket.io, Prisma
  docs/         Architecture, API, deployment, ER diagram
  deployment/   Docker and deployment assets
```

## Core Modules

- Emergency SOS broadcasting
- AI emergency assistant powered by OpenRouter
- Live incident map and disaster analytics
- Community and authority communication
- Resource and volunteer coordination
- Missing person reporting
- Admin management surface
- JWT-ready authentication and role based access
- Realtime notifications with Socket.io

## Production Checklist

1. Add real Neon PostgreSQL `DATABASE_URL`.
2. Add OpenRouter `OPENROUTER_API_KEY`.
3. Configure email and push providers.
4. Run Prisma migrations.
5. Deploy backend and frontend with HTTPS.
