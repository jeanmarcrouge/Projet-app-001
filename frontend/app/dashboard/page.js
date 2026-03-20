"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import DeadlineCard from "../../components/DeadlineCard";
import RegulationCard from "../../components/RegulationCard";
import { apiFetch } from "../../lib/api";

export default function DashboardPage() {
  const [data, setData] = useState({ nextDeadlines: [], relevantRegulations: [], message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await apiFetch("/dashboard");
        setData(response);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <AuthGuard>
      <section className="space-y-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        {loading ? <p>Loading dashboard...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {data.message ? <p className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">{data.message}</p> : null}

        <div>
          <h2 className="mb-3 text-lg font-semibold">Next deadlines</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.nextDeadlines.map((deadline) => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}
          </div>
          {!loading && data.nextDeadlines.length === 0 ? <p className="text-sm text-slate-600">No upcoming deadlines.</p> : null}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Relevant regulations</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.relevantRegulations.map((regulation) => (
              <RegulationCard key={regulation.id} regulation={regulation} />
            ))}
          </div>
          {!loading && data.relevantRegulations.length === 0 ? (
            <p className="text-sm text-slate-600">No regulation found for your profile yet.</p>
          ) : null}
        </div>
      </section>
    </AuthGuard>
  );
}
