import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${window.API_URL || ''}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) setMessage('Login sukses');
      else setMessage('Gagal login');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <div className="p-6 bg-white rounded-lg shadow max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-1">CAT Psikologi</h1>
          <p className="text-center text-sm text-gray-500 mb-4">Supported by Cicero Devs</p>
          <form onSubmit={login} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          </form>
          {message && <p className="mt-2 text-center">{message}</p>}
        </div>
      </div>
    );
  }
