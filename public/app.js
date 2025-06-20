const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('token');

function showMain() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('main').classList.remove('hidden');
}

function showAuth() {
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('main').classList.add('hidden');
}

function register() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(r => r.json()).then(data => {
    alert('Registered');
  }).catch(err => alert('Error: ' + err.message));
}

function login() {
  const email = document.getElementById('logEmail').value;
  const password = document.getElementById('logPassword').value;
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(r => r.json()).then(data => {
    if (data.token) {
      token = data.token;
      localStorage.setItem('token', token);
      showMain();
    } else {
      alert('Login failed');
    }
  }).catch(err => alert('Error: ' + err.message));
}

function logout() {
  localStorage.removeItem('token');
  token = null;
  showAuth();
}

function loadUsers() {
  fetch(`${API_URL}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()).then(data => {
    const list = document.getElementById('userList');
    list.innerHTML = '';
    data.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `ID: ${u.id || ''} Email: ${u.email || ''}`;
      list.appendChild(li);
    });
  }).catch(err => alert('Error: ' + err.message));
}

function loadQuestions() {
  fetch(`${API_URL}/questions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()).then(data => {
    const list = document.getElementById('questionList');
    list.innerHTML = '';
    data.forEach(q => {
      const li = document.createElement('li');
      li.textContent = `ID: ${q.id || ''} Text: ${q.text || ''}`;
      list.appendChild(li);
    });
  }).catch(err => alert('Error: ' + err.message));
}

function createQuestion() {
  const text = document.getElementById('questionText').value;
  fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  }).then(r => r.json()).then(data => {
    alert('Question created');
    loadQuestions();
  }).catch(err => alert('Error: ' + err.message));
}

if (token) {
  showMain();
} else {
  showAuth();
}
