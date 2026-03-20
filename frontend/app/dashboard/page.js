'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DeadlineBadge from '../../components/DeadlineBadge';
import RegulationCard from '../../components/RegulationCard';
import { apiRequest } from '../../lib/api';
import { getAuthToken } from '../../lib/auth';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ deadlines: [], regulations: [] });

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setError('Please login first.');
      setLoading(false);
      return;
    }

    apiRequest('/dashboard', { token })
      .then((payload) => setData(payload))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-600">Overview of your nearest compliance actions.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Next deadlines</h2>
            <Link href="/deadlines" className="text-sm font-medium text-indigo-700 hover:underline">
              See all
            </Link>
          </div>
          <div className="space-y-3">
            {data.deadlines?.length ? (
              data.deadlines.map((deadline) => (
                <div key={deadline.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-800">{deadline.title}</p>
                    <DeadlineBadge daysRemaining={Number(deadline.days_remaining)} />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Due: {new Date(deadline.due_date).toISOString().split('T')[0]}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No upcoming deadlines.</p>
            )}
          </div>
        </section>

        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Relevant regulations</h2>
            <Link href="/regulations" className="text-sm font-medium text-indigo-700 hover:underline">
              See all
            </Link>
          </div>
          <div className="space-y-3">
            {data.regulations?.slice(0, 3).map((regulation) => (
              <RegulationCard regulation={regulation} key={regulation.id} />
            ))}
            {!data.regulations?.length && <p className="text-sm text-slate-600">No regulation matched your profile yet.</p>}
          </div>
        </section>
      </div>
    </section>
  );
}
