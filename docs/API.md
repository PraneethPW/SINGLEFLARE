# API Documentation

Base URL: `http://localhost:5153/api`

Swagger UI is available at `http://localhost:5153/api-docs`.

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/email-verification`

## Emergencies

- `GET /emergencies`
- `POST /emergencies`
- `PATCH /emergencies/:id/status`

## Resources

- `GET /resources`
- `POST /resources`

## AI

- `POST /ai/chat`

## Operations

- `GET|POST /volunteers`
- `GET|POST /missing-persons`
- `GET|POST /reports`
- `GET|POST /notifications`
- `GET|POST /channels`
- `GET|POST /ngos`
- `GET|POST /admin/audit-logs`
