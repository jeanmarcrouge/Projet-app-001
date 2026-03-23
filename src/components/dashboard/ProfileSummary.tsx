import { Card } from "@/components/common/Card";
import { CompanyProfile } from "@/types/domain";

interface ProfileSummaryProps {
  profile: CompanyProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <Card title="Profil entreprise" subtitle="Base de personnalisation des obligations">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <Field label="Entreprise" value={profile.companyName} />
        <Field label="Dirigeant" value={profile.ownerName} />
        <Field label="Email" value={profile.email} />
        <Field label="Type" value={profile.companyType} />
        <Field label="Régime fiscal" value={profile.taxRegime} />
        <Field label="CA annuel" value={`${profile.yearlyRevenue.toLocaleString("fr-FR")} €`} />
        <Field label="Effectif" value={`${profile.employeeCount}`} />
      </dl>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="text-zinc-900">{value}</dd>
    </div>
  );
}
