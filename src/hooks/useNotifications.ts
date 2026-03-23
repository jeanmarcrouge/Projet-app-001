"use client";

import { useMemo } from "react";
import {
  buildDeadlineNotifications,
  buildTaxUpdateNotifications,
} from "@/lib/notifications";
import { NotificationItem, ObligationItem, UpcomingTaxItem } from "@/types/domain";

interface UseNotificationsInput {
  obligations: ObligationItem[];
  upcomingTaxes: UpcomingTaxItem[];
}

export function useNotifications({
  obligations,
  upcomingTaxes,
}: UseNotificationsInput): NotificationItem[] {
  return useMemo(() => {
    const deadlineNotifications = buildDeadlineNotifications(obligations);
    const updateNotifications = buildTaxUpdateNotifications(upcomingTaxes);

    return [...deadlineNotifications, ...updateNotifications].sort((a, b) =>
      a.targetDate.localeCompare(b.targetDate),
    );
  }, [obligations, upcomingTaxes]);
}
