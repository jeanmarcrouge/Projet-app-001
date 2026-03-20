'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiRequest } from '../../lib/api';
import { setAuthToken } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      setAuthToken(payload.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="mb-2 text-2xl font-semibold">Login</h1>
      <p className="mb-6 text-sm text-slate-600">Access your compliance dashboard.</p>
      <form className="space-y-4" onSubmit={submit}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className="button-primary w-full" type="submit">
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      <p className="mt-4 text-sm text-slate-600">
        No account?{' '}
        <Link href="/register" className="font-medium text-indigo-700 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
