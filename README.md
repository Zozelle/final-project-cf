# Cat Café

A Node/Express backend with a React/Vite frontend. The backend manages users, cats and reservations while the frontend provides SPA navigation.

## Backend

```bash
cd backend
npm install
```

Create a `.env` file with:

```
JWT_SECRET=<your jwt secret>
PORT=3000 # optional
```

Development:

```
npm run dev
```

Production:

```
npm start
```

## Frontend

```bash
cd frontend
npm install
```

Development:

```
npm run dev
```

Build:

```
npm run build
```

Configure the API base URL via `VITE_API_URL`.

## Deployment Checklist

- In `frontend`, run `npm run build` and serve the generated `dist/` folder with a static web server (e.g. Nginx).
- Set `VITE_API_URL` so the frontend calls the backend API.
- In `backend`, create `.env` with `JWT_SECRET` (and `PORT` if needed) and install dependencies with `npm install`.
- Start the backend with `npm start` under a process manager and ensure MongoDB is accessible.
