"use client";

import { ForumSection } from "@/components/forum/ForumSection";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { ObligationSection } from "@/components/dashboard/ObligationSection";
import { ProfileSummary } from "@/components/dashboard/ProfileSummary";
import { UpcomingTaxSection } from "@/components/dashboard/UpcomingTaxSection";
import { Card } from "@/components/common/Card";
import { useAppContext } from "@/context/AppContext";

export default function DashboardPage() {
  const { currentUser, obligationsForUser, upcomingTaxesForUser, notifications } = useAppContext();

  if (!currentUser) {
    return (
      <Card title="Accès requis">
        <p className="text-sm text-zinc-600">
          Veuillez vous inscrire pour consulter vos obligations personnalisées.
        </p>
      </Card>
    );
  }

  const socialObligations = obligationsForUser.filter((item) => item.category === "social");
  const fiscalObligations = obligationsForUser.filter((item) => item.category === "fiscal");

  return (
    <div className="space-y-5">
      <ProfileSummary profile={currentUser.profile} />

      <NotificationList items={notifications} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ObligationSection
          title="Volet social"
          obligations={socialObligations}
          emptyMessage="Aucune obligation sociale active pour ce profil."
        />
        <ObligationSection
          title="Volet fiscal"
          obligations={fiscalObligations}
          emptyMessage="Aucune obligation fiscale active pour ce profil."
        />
      </div>

      <UpcomingTaxSection items={upcomingTaxesForUser} />
      <ForumSection />
    </div>
  );
}
