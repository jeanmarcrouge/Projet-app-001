import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useSessionUser } from "@/utils/useSessionUser";

export default function SettingsPage() {
  const router = useRouter();
  const user = useSessionUser();
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (!user) {
      void router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        Loading settings...
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage preferences and account-level options."
    >
      <div className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="text-sm font-medium text-slate-700">Current plan</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{user.plan}</p>
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Receive weekly product updates
        </label>
      </div>
    </DashboardLayout>
  );
}
