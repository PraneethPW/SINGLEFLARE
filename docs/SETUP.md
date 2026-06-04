# Setup Guide

1. Install dependencies.

```bash
npm install
```

2. Create environment files.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Add a Neon PostgreSQL connection string to `backend/.env`.

4. Generate Prisma client.

```bash
npm run prisma:generate
```

5. Start both apps.

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5153`
