"use client";

import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/pre-registrations", {
        method: "POST",
        body: JSON.stringify({ email, companyName }),
      });
      setMessage("Thanks! Your pre-registration has been saved.");
      setEmail("");
      setCompanyName("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-10">
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Regulatory compliance made simple</h1>
        <p className="mb-6 max-w-2xl text-slate-600">
          A lightweight compliance assistant for small businesses covering tax, legal, and social obligations.
        </p>
        <a href="#reserve" className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-white">
          Reserve your access
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Personalized obligations based on your company profile",
          "Action-oriented dashboard with upcoming deadlines",
          "Minimal UX for fast execution and daily usage",
        ].map((benefit) => (
          <div key={benefit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700">{benefit}</p>
          </div>
        ))}
      </div>

      <div id="reserve" className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Reserve your access</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name (optional)"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Reserve"}
          </button>
          {message ? <p className="text-sm text-slate-700">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
