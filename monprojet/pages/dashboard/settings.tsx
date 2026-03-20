import { FormEvent, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useRequireAuth } from "@/utils/useRequireAuth";

export default function SettingsPage() {
  const { isChecking } = useRequireAuth();
  const [workspaceName, setWorkspaceName] = useState("monprojet workspace");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [saved, setSaved] = useState(false);

  if (isChecking) {
    return <p className="p-6 text-sm text-slate-300">Loading settings...</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout
      title="Settings"
      description="Manage global preferences for your team and workspace."
    >
      <section className="max-w-2xl rounded-xl border border-white/10 bg-slate-900/70 p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Workspace name</span>
            <input
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Timezone</span>
            <input
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Save settings
          </button>
        </form>
        {saved && <p className="mt-3 text-sm text-cyan-300">Settings saved (mock).</p>}
      </section>
    </DashboardLayout>
  );
}
