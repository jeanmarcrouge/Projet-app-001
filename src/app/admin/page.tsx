"use client";

import { AdminStatsPanel } from "@/components/admin/AdminStatsPanel";
import { Card } from "@/components/common/Card";
import { useAppContext } from "@/context/AppContext";

export default function AdminPage() {
  const { currentUser } = useAppContext();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <Card title="Accès restreint">
        <p className="text-sm text-zinc-600">
          Cet espace est réservé aux administrateurs.
        </p>
      </Card>
    );
  }

  return <AdminStatsPanel />;
}
