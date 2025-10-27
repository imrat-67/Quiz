# Quiz (Next.js + MongoDB) — simple MERN-style app ready for Vercel

This repository contains a small quiz application built with Next.js (frontend + API routes) and MongoDB via Mongoose. It's structured to deploy to Vercel (serverless functions) and use an external MongoDB (e.g., MongoDB Atlas).

Features
- Teacher can create/update/delete quizzes (title, questions, choices, correct answer index).
- Student can take quizzes and submit attempts.
- Basic progress reports per student and per quiz.
- Email/password auth with roles (teacher, student) using JWT in httpOnly cookie.

Environment
Set these environment variables in Vercel or locally (.env.local in development):

- MONGODB_URI: your MongoDB connection string
- JWT_SECRET: a secure random string for signing tokens

Quick local dev

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=some_long_random_secret
```

3. Run locally:

```bash
npm run dev
```

Deployment to Vercel

1. Push this repo to GitHub (or your Vercel-connected repo).
2. In the Vercel dashboard, import the project.
3. In Project Settings -> Environment Variables, set `MONGODB_URI` and `JWT_SECRET`.
4. Deploy. Vercel will run `npm run build` and host the Next.js app and API routes.

Notes
- This project expects an externally hosted MongoDB (Atlas or other cloud) because Vercel serverless functions are ephemeral and cannot run a local DB.
- You should secure the `JWT_SECRET` and DB credentials in Vercel environment settings.
# Quiz

Repository initial commit created by assistant to allow pushing from local repo.