'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';
import { getAuthToken } from '../../lib/auth';

const initialForm = {
  name: '',
  legal_form: '',
  tax_regime: 'IS',
  vat_regime: 'reel_normal',
  employees_count: 0,
};

export default function ProfilePage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setStatus({ type: 'error', message: 'Please login first.' });
      setLoading(false);
      return;
    }

    apiRequest('/companies/me', { token })
      .then((payload) => {
        if (payload.company) {
          setFormData(payload.company);
        }
      })
      .catch((err) => setStatus({ type: 'error', message: err.message }))
      .finally(() => setLoading(false));
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'employees_count' ? Number(value) : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    if (!token) {
      setStatus({ type: 'error', message: 'Please login first.' });
      return;
    }

    try {
      await apiRequest('/companies', {
        method: 'POST',
        token,
        body: formData,
      });
      setStatus({ type: 'success', message: 'Profile saved successfully.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Company profile</h1>
        <p className="text-sm text-slate-600">Use your legal and tax settings to filter relevant regulations.</p>
      </header>

      <form className="card space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium">Company name</label>
          <input className="input" name="name" value={formData.name} onChange={onChange} required />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Legal form</label>
            <select className="input" name="legal_form" value={formData.legal_form} onChange={onChange} required>
              <option value="">Select legal form</option>
              <option value="SARL">SARL</option>
              <option value="SAS">SAS</option>
              <option value="SASU">SASU</option>
              <option value="EI">EI</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">VAT regime</label>
            <select className="input" name="vat_regime" value={formData.vat_regime} onChange={onChange} required>
              <option value="reel_normal">Reel normal</option>
              <option value="reel_simplifie">Reel simplifie</option>
              <option value="franchise_base">Franchise en base</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Tax regime</label>
            <select className="input" name="tax_regime" value={formData.tax_regime} onChange={onChange} required>
              <option value="IS">IS</option>
              <option value="IR">IR</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Number of employees</label>
            <input
              className="input"
              type="number"
              min="0"
              name="employees_count"
              value={formData.employees_count}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="button-primary">
          Save profile
        </button>
      </form>

      {status.message && (
        <p className={`rounded-lg p-3 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </p>
      )}
    </section>
  );
}
