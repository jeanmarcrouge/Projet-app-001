import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getSessionUser, UserSession } from "@/utils/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const sessionUser = getSessionUser();
    if (!sessionUser) {
      void router.replace("/login");
      return;
    }
    setUser(sessionUser);
  }, [router]);

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
