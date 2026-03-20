import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ItemForm } from "@/components/dashboard/ItemForm";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { useRequireAuth } from "@/utils/useRequireAuth";

export default function DashboardPage() {
  const { isChecking } = useRequireAuth();

  if (isChecking) {
    return <p className="p-6 text-sm text-slate-300">Loading your dashboard...</p>;
  }

  return (
    <DashboardLayout
      title="Dashboard"
      description="Track your SaaS performance, customers and growth in one place."
    >
      <div className="space-y-6">
        <SummaryCards />
        <ActivityTable />
        <ItemForm />
      </div>
    </DashboardLayout>
  );
}
