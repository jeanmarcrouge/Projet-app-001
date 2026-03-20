'use client';

import { useEffect, useState } from 'react';
import RegulationCard from '../../components/RegulationCard';
import { apiRequest } from '../../lib/api';
import { getAuthToken } from '../../lib/auth';

export default function RegulationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [regulations, setRegulations] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError('Please login first.');
      setLoading(false);
      return;
    }

    apiRequest('/regulations', { token })
      .then((payload) => setRegulations(payload.regulations || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading regulations...</p>;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Regulations</h1>
        <p className="text-sm text-slate-600">Filtered obligations based on your company profile.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {regulations.map((regulation) => (
          <RegulationCard key={regulation.id} regulation={regulation} />
        ))}
      </div>
      {!regulations.length && !error && <p className="text-sm text-slate-600">No regulations found for your profile.</p>}
    </section>
  );
}
