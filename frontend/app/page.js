'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiRequest } from '../lib/api';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitPreRegistration = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await apiRequest('/preregistrations', {
        method: 'POST',
        body: {
          email,
          company_name: companyName,
        },
      });
      setMessage('Thanks! We have recorded your pre-registration.');
      setEmail('');
      setCompanyName('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="space-y-8">
      <div className="grid gap-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Regulatory compliance made simple for small businesses</h1>
          <p className="text-sm text-indigo-100">
            Keep track of tax, social and legal obligations in one dashboard. Focus on your business while we help you stay compliant.
          </p>
          <div className="flex gap-3">
            <Link href="/register" className="button-primary bg-white text-indigo-700 hover:bg-indigo-50">
              Start now
            </Link>
            <Link href="/login" className="button-secondary border-white text-white hover:bg-indigo-500">
              Sign in
            </Link>
          </div>
        </div>
        <div className="card bg-white/95 text-slate-800">
          <h2 className="mb-2 text-lg font-semibold">Reserve your access</h2>
          <p className="mb-4 text-sm text-slate-600">Get early access and product updates.</p>
          <form className="space-y-3" onSubmit={submitPreRegistration}>
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
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <button className="button-primary w-full" type="submit">
              Reserve your access
            </button>
          </form>
          {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="card">
          <h3 className="mb-2 font-semibold">Smart regulation filtering</h3>
          <p className="text-sm text-slate-600">Only see regulations that apply to your legal form, VAT and workforce profile.</p>
        </article>
        <article className="card">
          <h3 className="mb-2 font-semibold">Deadline tracking</h3>
          <p className="text-sm text-slate-600">Color-coded deadlines help you identify urgent actions in seconds.</p>
        </article>
        <article className="card">
          <h3 className="mb-2 font-semibold">Actionable guidance</h3>
          <p className="text-sm text-slate-600">Each regulation card explains what to do and links to the official source.</p>
        </article>
      </div>
    </section>
  );
}
