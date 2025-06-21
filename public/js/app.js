const API_URL = window.API_URL || 'http://localhost:3000/api';
let token = localStorage.getItem('token');

function showMain() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('main').classList.remove('hidden');
  showSection('profileSection');
  loadProfile();
}

function showAuth() {
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('main').classList.add('hidden');
}

function showSection(id) {
  document.querySelectorAll('#main section').forEach(sec => sec.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function register() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(r => r.json()).then(() => {
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

function resetPassword() {
  const email = document.getElementById('resetEmail').value;
  fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(() => alert('Reset link sent')).catch(err => alert('Error: ' + err.message));
}

function loadProfile() {
  fetch(`${API_URL}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()).then(data => {
    document.getElementById('profileName').value = data.name || '';
    document.getElementById('profileInstitution').value = data.institution || '';
    if (data.role) {
      document.getElementById('profileRole').value = data.role;
    }
  }).catch(() => {});
}

function updateProfile() {
  const name = document.getElementById('profileName').value;
  const institution = document.getElementById('profileInstitution').value;
  const role = document.getElementById('profileRole').value;
  const photo = document.getElementById('profilePhoto').files[0];
  const form = new FormData();
  form.append('name', name);
  form.append('institution', institution);
  form.append('role', role);
  if (photo) form.append('photo', photo);
  fetch(`${API_URL}/profile`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form
  }).then(() => alert('Profile updated')).catch(err => alert('Error: ' + err.message));
}

function loadUsers() {
  fetch(`${API_URL}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()).then(data => {
    const list = document.getElementById('userList');
    list.innerHTML = '';
    data.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = `ID: ${u.id || ''} Email: ${u.email || ''} ` +
        `<select id="role-${u.id}">` +
        `<option value="user" ${u.role === 'user' ? 'selected' : ''}>User</option>` +
        `<option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>` +
        `</select>` +
        ` <button onclick="updateUserRole(${u.id})">Simpan</button>`;
      list.appendChild(li);
    });
  }).catch(err => alert('Error: ' + err.message));
}

function updateUserRole(id) {
  const role = document.getElementById(`role-${id}`).value;
  fetch(`${API_URL}/users/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ role })
  }).then(() => loadUsers()).catch(err => alert('Error: ' + err.message));
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
  const category = document.getElementById('questionCategory').value;
  const level = document.getElementById('questionLevel').value;
  fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text, category, level })
  }).then(r => r.json()).then(() => {
    alert('Question created');
    loadQuestions();
  }).catch(err => alert('Error: ' + err.message));
}

function importQuestions() {
  const file = document.getElementById('importFile').files[0];
  if (!file) return alert('Select a file');
  const form = new FormData();
  form.append('file', file);
  fetch(`${API_URL}/questions/import`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form
  }).then(() => alert('Imported')).catch(err => alert('Error: ' + err.message));
}

function exportQuestions() {
  fetch(`${API_URL}/questions/export`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.blob()).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }).catch(err => alert('Error: ' + err.message));
}

// Adaptive test placeholders
function startTest() {
  document.getElementById('testArea').classList.remove('hidden');
}
function prevQuestion() { alert('Prev question'); }
function nextQuestion() { alert('Next question'); }

function loadResults() { alert('Load results'); }
function createClass() { alert('Create class'); }
function copyInviteLink() { alert('Invite link copied'); }
function scheduleExam() { alert('Exam scheduled'); }
function loadDashboard() { alert('Load dashboard'); }

if (token) {
  showMain();
} else {
  showAuth();
}
