import { NotificationItem, ObligationItem, UpcomingTaxItem } from "@/types/domain";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function getDaysBetween(fromDate: Date, toDate: Date): number {
  const diff = toDate.getTime() - fromDate.getTime();
  return Math.ceil(diff / MILLISECONDS_PER_DAY);
}

export function buildDeadlineNotifications(
  obligations: ObligationItem[],
  now = new Date(),
): NotificationItem[] {
  const notifications: NotificationItem[] = [];

  for (const obligation of obligations) {
    const due = new Date(obligation.dueDate);
    const daysLeft = getDaysBetween(now, due);

    if (daysLeft === 30) {
      notifications.push({
        id: `${obligation.id}-deadline-30`,
        type: "deadline-30",
        title: `Rappel J-30 : ${obligation.title}`,
        message: "Cette échéance arrive dans 30 jours. Préparez vos pièces.",
        targetDate: obligation.dueDate,
      });
    }

    if (daysLeft === 7) {
      notifications.push({
        id: `${obligation.id}-deadline-7`,
        type: "deadline-7",
        title: `Rappel J-7 : ${obligation.title}`,
        message: "Plus que 7 jours avant la date limite. Action recommandée.",
        targetDate: obligation.dueDate,
      });
    }
  }

  return notifications;
}

export function buildTaxUpdateNotifications(
  upcomingTaxes: UpcomingTaxItem[],
): NotificationItem[] {
  return upcomingTaxes.map((item) => ({
    id: `${item.id}-update`,
    type: "update",
    title: `Nouveauté : ${item.title}`,
    message:
      item.confidence === "annonce"
        ? "Une annonce officielle existe, surveillez les précisions d'application."
        : "Une évolution probable est identifiée, vérifiez les prochaines publications.",
    targetDate: item.probableDate,
  }));
}
