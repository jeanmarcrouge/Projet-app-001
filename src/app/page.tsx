import Link from "next/link";
import { Card } from "@/components/common/Card";

const steps = [
  {
    title: "1. Inscription et paiement",
    text: "Collecte du profil entreprise (statut, régime fiscal, CA, effectif) puis activation à 5€/mois.",
    href: "/inscription",
    cta: "Démarrer l'inscription",
  },
  {
    title: "2. Tableau de bord personnalisé",
    text: "Volets social/fiscal/taxes à venir filtrés selon le profil déclaré.",
    href: "/dashboard",
    cta: "Voir le tableau de bord",
  },
  {
    title: "3. Accès administrateur",
    text: "Statistiques agrégées sur les profils inscrits, accessibles uniquement aux admins.",
    href: "/admin",
    cta: "Ouvrir l'espace admin",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-zinc-900 p-6 text-white shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">Application TPE / PME</p>
        <h2 className="mt-2 text-2xl font-semibold">Suivre les obligations fiscales et sociales sans stress</h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-200">
          Cette base Next.js est conçue pour évoluer étape par étape : chaque écran est testable
          indépendamment et prépare une future connexion à Firebase ou PostgreSQL.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} title={step.title}>
            <p className="mb-4 text-sm text-zinc-600">{step.text}</p>
            <Link
              href={step.href}
              className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              {step.cta}
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
