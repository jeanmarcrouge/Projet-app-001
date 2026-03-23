import { NotificationItem } from "@/types/domain";
import { Card } from "@/components/common/Card";

interface NotificationListProps {
  items: NotificationItem[];
}

const badgeByType: Record<NotificationItem["type"], string> = {
  "deadline-30": "bg-blue-100 text-blue-700",
  "deadline-7": "bg-amber-100 text-amber-700",
  update: "bg-violet-100 text-violet-700",
};

export function NotificationList({ items }: NotificationListProps) {
  return (
    <Card title="Alertes automatiques" subtitle="J-30, J-7 et nouveautés fiscales">
      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">Aucune alerte active pour ce profil.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-zinc-200 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium text-zinc-900">{item.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeByType[item.type]}`}
                >
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-zinc-600">{item.message}</p>
              <p className="mt-1 text-xs text-zinc-500">Date cible : {item.targetDate}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
