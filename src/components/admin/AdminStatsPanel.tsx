import { Card } from "@/components/common/Card";
import { mockAdminStats } from "@/lib/mockData";

export function AdminStatsPanel() {
  return (
    <Card title="Statistiques administrateur" subtitle="Données agrégées des profils inscrits">
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Utilisateurs" value={mockAdminStats.totalUsers} />
        <Metric label="Abonnements actifs" value={mockAdminStats.activeSubscriptions} />
        <Metric label="CA moyen" value={`${mockAdminStats.averageRevenue.toLocaleString("fr-FR")} €`} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-900">Par type d&apos;entreprise</h3>
          <ul className="space-y-1 text-sm text-zinc-600">
            {Object.entries(mockAdminStats.byCompanyType).map(([key, value]) => (
              <li key={key} className="flex justify-between rounded-lg bg-zinc-50 px-3 py-2">
                <span>{key}</span>
                <span className="font-medium text-zinc-900">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-900">Par régime fiscal</h3>
          <ul className="space-y-1 text-sm text-zinc-600">
            {Object.entries(mockAdminStats.byTaxRegime).map(([key, value]) => (
              <li key={key} className="flex justify-between rounded-lg bg-zinc-50 px-3 py-2">
                <span>{key}</span>
                <span className="font-medium text-zinc-900">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900">{value}</p>
    </div>
  );
}
