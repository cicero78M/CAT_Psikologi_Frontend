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
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-1">CAT Psikologi</h1>
          <p className="text-center text-sm text-gray-500 mb-4">Supported by Cicero Devs</p>
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={login} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 rounded-lg transition"
            >
              Masuk
            </button>
          </form>
          {message && <p className="mt-2 text-center text-gray-700">{message}</p>}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Belum punya akun?{' '}
            <a className="text-blue-600 hover:underline" href="/register">
              Daftar
            </a>
          </p>
        </div>
      </div>
    );
  }
