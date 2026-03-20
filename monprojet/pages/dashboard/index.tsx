import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ActivityTable, ActivityRow } from "@/components/dashboard/ActivityTable";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ItemForm, DashboardItem } from "@/components/dashboard/ItemForm";
import { StatCard } from "@/components/dashboard/StatCard";
import { getSessionUser, UserSession } from "@/utils/auth";

const defaultRows: ActivityRow[] = [
  {
    id: "1",
    item: "Marketing automation setup",
    status: "Done",
    updatedAt: "Today, 10:24",
  },
  {
    id: "2",
    item: "Monthly report draft",
    status: "In Progress",
    updatedAt: "Today, 09:12",
  },
  {
    id: "3",
    item: "Customer onboarding sequence",
    status: "Pending",
    updatedAt: "Yesterday, 17:46",
  },
];

const initialItems: DashboardItem[] = [
  { id: "a1", name: "Q1 Strategy", type: "Document" },
  { id: "a2", name: "Growth Experiments", type: "Board" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [items, setItems] = useState<DashboardItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<DashboardItem | null>(null);

  useEffect(() => {
    const sessionUser = getSessionUser();
    if (!sessionUser) {
      void router.replace("/login");
      return;
    }
    setUser(sessionUser);
  }, [router]);

  const stats = useMemo(
    () => [
      {
        label: "Active projects",
        value: "12",
        helper: "2 new this week",
      },
      {
        label: "Team members",
        value: "8",
        helper: "1 pending invite",
      },
      {
        label: "Completion rate",
        value: "87%",
        helper: "Up 4% vs last month",
      },
    ],
    [],
  );

  function handleSaveItem(item: DashboardItem) {
    setItems((previous) => {
      const exists = previous.some((entry) => entry.id === item.id);
      if (exists) {
        return previous.map((entry) => (entry.id === item.id ? item : entry));
      }
      return [item, ...previous];
    });
    setEditingItem(null);
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <DashboardLayout
      title={`Welcome back, ${user.name}`}
      subtitle="Here is a snapshot of your account activity."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helper={stat.helper}
          />
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Recent activity
          </h2>
          <ActivityTable rows={defaultRows} />
        </div>

        <ItemForm
          selectedItem={editingItem}
          onSave={handleSaveItem}
          onCancelEdit={() => setEditingItem(null)}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Your items</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-slate-800">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.type}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
