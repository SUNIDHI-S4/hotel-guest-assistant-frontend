# Hotel Guest Assistant - Frontend

React + TypeScript + Vite + TailwindCSS + Axios chat UI for the hotel guest assistant backend
(`hotel-guest-assistant-backend`).

## Setup

```bash
npm install
cp .env.example .env     # then adjust VITE_API_BASE_URL if the backend is not on localhost:8000
npm run dev              # http://localhost:5173
```

The backend must be running and must allow `http://localhost:5173` in its `CORS_ORIGINS`
(that is the backend default).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Serve the production build |

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000/api/v1` | Backend API base URL (with `/api/v1`, no trailing slash) |

## Structure

```
src/
├── components/   reusable UI pieces
├── pages/        page-level screens
├── services/     API client and calls
├── hooks/        React hooks
├── types/        TypeScript types
├── utils/        small helpers
├── config/       environment configuration
└── index.css     Tailwind import and warm orange theme tokens
```

`@/` is an alias for `src/`.
