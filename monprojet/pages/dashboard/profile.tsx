import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { updateSessionProfile } from "@/utils/auth";
import { useSessionUser } from "@/utils/useSessionUser";

export default function ProfilePage() {
  const router = useRouter();
  const user = useSessionUser();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      void router.replace("/login");
    }
  }, [router, user]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !email) {
      return;
    }

    const updated = updateSessionProfile(name, email);
    if (updated) {
      setSaved(true);
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        Loading profile...
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Profile"
      subtitle="Update your public and account information."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={user.name}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            defaultValue={user.email}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Save profile
        </button>
        {saved ? <p className="text-sm text-emerald-600">Profile saved.</p> : null}
      </form>
    </DashboardLayout>
  );
}
