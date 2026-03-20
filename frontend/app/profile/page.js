"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import { apiFetch } from "../../lib/api";

const initialState = {
  name: "",
  legalForm: "SAS",
  taxRegime: "is",
  vatRegime: "reel_normal",
  employeesCount: 0,
};

export default function ProfilePage() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const response = await apiFetch("/companies/me");
        if (response.company) {
          setForm({
            name: response.company.name || "",
            legalForm: response.company.legal_form || "SAS",
            taxRegime: response.company.tax_regime || "is",
            vatRegime: response.company.vat_regime || "reel_normal",
            employeesCount: response.company.employees_count || 0,
          });
        }
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadCompany();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await apiFetch("/companies", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMessage("Company profile saved successfully.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <AuthGuard>
      <section className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold text-slate-900">Company profile</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Company name"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          <select
            name="legalForm"
            value={form.legalForm}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="SAS">SAS</option>
            <option value="SARL">SARL</option>
            <option value="EURL">EURL</option>
            <option value="EI">EI</option>
          </select>

          <select
            name="vatRegime"
            value={form.vatRegime}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="reel_normal">TVA réel normal</option>
            <option value="reel_simplifie">TVA réel simplifié</option>
            <option value="franchise">Franchise en base</option>
          </select>

          <select
            name="taxRegime"
            value={form.taxRegime}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="is">IS</option>
            <option value="ir">IR</option>
          </select>

          <input
            type="number"
            min={0}
            name="employeesCount"
            value={form.employeesCount}
            onChange={handleChange}
            placeholder="Number of employees"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-white">
            Save profile
          </button>
        </form>

        {message ? <p className="mt-3 text-sm text-green-700">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </section>
    </AuthGuard>
  );
}
