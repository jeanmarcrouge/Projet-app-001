'use client';

import { useEffect, useState } from 'react';
import DeadlineBadge from '../../components/DeadlineBadge';
import { apiRequest } from '../../lib/api';
import { getAuthToken } from '../../lib/auth';

export default function DeadlinesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError('Please login first.');
      setLoading(false);
      return;
    }

    apiRequest('/deadlines', { token })
      .then((payload) => setDeadlines(payload.deadlines || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading deadlines...</p>;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Deadlines</h1>
        <p className="text-sm text-slate-600">Upcoming actions you should not miss.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <article key={deadline.id} className="card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-900">{deadline.title}</h2>
              <DeadlineBadge daysRemaining={Number(deadline.days_remaining)} />
            </div>
            <p className="mt-1 text-sm text-slate-600">Type: {deadline.type}</p>
            <p className="mt-1 text-sm text-slate-700">Due date: {new Date(deadline.due_date).toISOString().split('T')[0]}</p>
          </article>
        ))}
      </div>
      {!deadlines.length && !error && <p className="text-sm text-slate-600">No upcoming deadlines.</p>}
    </section>
  );
}
