"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import RegulationCard from "../../components/RegulationCard";
import { apiFetch } from "../../lib/api";

export default function RegulationsPage() {
  const [regulations, setRegulations] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegulations = async () => {
      try {
        const response = await apiFetch("/regulations");
        setRegulations(response.regulations || []);
        setMessage(response.message || "");
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadRegulations();
  }, []);

  return (
    <AuthGuard>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Relevant regulations</h1>
        {message ? <p className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="grid gap-3 md:grid-cols-2">
          {regulations.map((regulation) => (
            <RegulationCard key={regulation.id} regulation={regulation} />
          ))}
        </div>
      </section>
    </AuthGuard>
  );
}
