import { Card } from "@/components/common/Card";
import { ObligationItem } from "@/types/domain";

interface ObligationSectionProps {
  title: string;
  obligations: ObligationItem[];
  emptyMessage: string;
}

export function ObligationSection({
  title,
  obligations,
  emptyMessage,
}: ObligationSectionProps) {
  return (
    <Card title={title}>
      {obligations.length === 0 ? (
        <p className="text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
        <ul className="space-y-3">
          {obligations.map((item) => (
            <li key={item.id} className="rounded-xl border border-zinc-200 p-4">
              <h3 className="font-medium text-zinc-900">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
                <span>Échéance : {item.dueDate}</span>
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
