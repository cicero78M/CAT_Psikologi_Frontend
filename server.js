require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.API_URL = '${API_URL}';`);
});

const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'questions.json');

function loadQuestions() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveQuestions(questions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(questions, null, 2));
}

app.get('/api/questions', (req, res) => {
  res.json(loadQuestions());
});

app.post('/api/questions', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const questions = loadQuestions();
  const id = questions.length ? questions[questions.length - 1].id + 1 : 1;
  const question = { id, text };
  questions.push(question);
  saveQuestions(questions);
  res.json(question);
});

app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const question = loadQuestions().find(q => q.id === id);
  if (!question) return res.status(404).json({ error: 'Not found' });
  res.json(question);
});

app.put('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { text } = req.body;
  const questions = loadQuestions();
  const question = questions.find(q => q.id === id);
  if (!question) return res.status(404).json({ error: 'Not found' });
  question.text = text || question.text;
  saveQuestions(questions);
  res.json(question);
});

app.delete('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let questions = loadQuestions();
  const index = questions.findIndex(q => q.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const removed = questions.splice(index, 1)[0];
  saveQuestions(questions);
  res.json(removed);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
