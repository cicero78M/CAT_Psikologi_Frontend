# CAT Psikologi Frontend

This is a minimal frontend to interact with the [CAT Psikologi Backend](https://github.com/cicero78M/CAT_Psikologi_Backend).

## Setup

Install dependencies and run the development server:

```bash
npm install
npm start
```

The app will serve static files from the `public` folder on port `8080` by default.

Ensure the backend is running on `http://localhost:3000` or adjust the `API_URL` in `public/app.js`.

## Built-in Question Bank API

The bundled express server now exposes a simple question bank under `/api/questions` that persists data to `data/questions.json`.

Available operations:

- `GET /api/questions` – list all questions
- `POST /api/questions` – create a question with `{ text }`
- `GET /api/questions/:id` – fetch a question by id
- `PUT /api/questions/:id` – update question text
- `DELETE /api/questions/:id` – remove a question

This allows populating a small bank of questions without running the separate backend.
