"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import DeadlineCard from "../../components/DeadlineCard";
import { apiFetch } from "../../lib/api";

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDeadlines = async () => {
      try {
        const response = await apiFetch("/deadlines");
        setDeadlines(response.deadlines || []);
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadDeadlines();
  }, []);

  return (
    <AuthGuard>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Upcoming deadlines</h1>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="grid gap-3 md:grid-cols-2">
          {deadlines.map((deadline) => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))}
        </div>
      </section>
    </AuthGuard>
  );
}
