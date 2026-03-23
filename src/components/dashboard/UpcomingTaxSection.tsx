import { Card } from "@/components/common/Card";
import { UpcomingTaxItem } from "@/types/domain";

interface UpcomingTaxSectionProps {
  items: UpcomingTaxItem[];
}

export function UpcomingTaxSection({ items }: UpcomingTaxSectionProps) {
  return (
    <Card title="Taxes et impôts à venir" subtitle="Évolutions probables ou annoncées">
      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">Aucun changement identifié pour votre profil.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium text-zinc-900">{item.title}</h3>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                  {item.confidence}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
                <span>Date probable : {item.probableDate}</span>
                <a
                  href={item.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Source officielle
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
