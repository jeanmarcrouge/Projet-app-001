import { Card } from "@/components/common/Card";

const officialLinks = [
  {
    title: "BOFiP (Bulletin officiel des Finances publiques)",
    url: "https://bofip.impots.gouv.fr",
    description: "Documentation fiscale officielle et commentaires administratifs.",
  },
  {
    title: "impots.gouv.fr",
    url: "https://www.impots.gouv.fr",
    description: "Portail principal pour démarches fiscales des entreprises.",
  },
  {
    title: "Urssaf",
    url: "https://www.urssaf.fr",
    description: "Informations et démarches sociales des employeurs et indépendants.",
  },
  {
    title: "service-public.fr - Entreprises",
    url: "https://entreprendre.service-public.fr",
    description: "Fiches officielles sur obligations et formalités administratives.",
  },
];

export default function SourcesPage() {
  return (
    <Card title="Sources officielles" subtitle="Liens de référence pour vérifier chaque obligation">
      <ul className="space-y-3">
        {officialLinks.map((link) => (
          <li key={link.url} className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium text-zinc-900">{link.title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{link.description}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Ouvrir la source
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
