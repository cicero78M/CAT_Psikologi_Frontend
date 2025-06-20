# CAT Psikologi Frontend

This project provides a very small web interface for the [CAT Psikologi Backend](https://github.com/cicero78M/CAT_Psikologi_Backend). It allows basic authentication and includes simple screens for question management, adaptive tests, user profiles and admin tools.

## Setup

This project requires **Node.js 18** or newer.

Install dependencies and run the development server. Copy `.env.example` to `.env` and adjust the variables if needed:

```bash
npm install
npm start
```

The app will serve static files from the `public` folder on port `8080` by default.

Ensure the backend is running (default `http://localhost:3000`) or set the environment variable `API_URL` when starting the server to point the frontend at a different backend.

The profile page allows users to edit their name, institution, role and upload a photo. Administrators can manage user roles from the **Pengguna** section.

## Built-in Question Bank API

The bundled express server now exposes a simple question bank under `/api/questions` that persists data to `data/questions.json`.

Available operations:

- `GET /api/questions` – list all questions
- `POST /api/questions` – create a question with `{ text }`
- `GET /api/questions/:id` – fetch a question by id
- `PUT /api/questions/:id` – update question text
- `DELETE /api/questions/:id` – remove a question

This allows populating a small bank of questions without running the separate backend.
The app serves static files from the `public` folder on port `8080` by default. To connect to another backend set the `API_URL` environment variable before running `npm start`.

