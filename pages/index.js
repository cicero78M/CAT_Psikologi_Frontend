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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">CAT Psikologi</h1>
          <p className="text-sm text-gray-500">Supported by Cicero Devs</p>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={login}>
            <h2 className="text-center text-2xl font-semibold">Masuk ke akun Anda</h2>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Lupa password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Masuk</button>
            </div>
            {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
            <p className="text-sm text-gray-500 text-center mt-2">
              Belum punya akun?{' '}
              <a className="link link-primary" href="/register">
                Daftar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
