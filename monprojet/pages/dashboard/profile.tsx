import { FormEvent, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/utils/AuthContext";
import { useRequireAuth } from "@/utils/useRequireAuth";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { isChecking } = useRequireAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  if (isChecking) {
    return <p className="p-6 text-sm text-slate-300">Loading profile...</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(name, email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout
      title="Profile"
      description="Update your account details and personal preferences."
    >
      <section className="max-w-2xl rounded-xl border border-white/10 bg-slate-900/70 p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Full name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Save profile
          </button>
        </form>
        {saved && <p className="mt-3 text-sm text-cyan-300">Profile saved (mock).</p>}
      </section>
    </DashboardLayout>
  );
}
