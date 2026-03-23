import {
  AdminStats,
  CompanyProfile,
  ForumPost,
  ObligationItem,
  UpcomingTaxItem,
  UserAccount,
} from "@/types/domain";

export const mockObligations: ObligationItem[] = [
  {
    id: "social-1",
    category: "social",
    title: "Déclaration sociale nominative (DSN)",
    description: "Transmission mensuelle de la DSN pour les salariés.",
    dueDate: "2026-04-05",
    officialSourceUrl: "https://www.urssaf.fr",
    applicableCompanyTypes: ["sarl", "sas", "eurl"],
    applicableTaxRegimes: ["reel-simplifie", "reel-normal"],
    minEmployees: 1,
  },
  {
    id: "social-2",
    category: "social",
    title: "Cotisations Urssaf micro-entrepreneur",
    description: "Paiement des cotisations sociales trimestrielles.",
    dueDate: "2026-04-30",
    officialSourceUrl: "https://www.autoentrepreneur.urssaf.fr",
    applicableCompanyTypes: ["micro-entreprise"],
    applicableTaxRegimes: ["micro-fiscal"],
  },
  {
    id: "fiscal-1",
    category: "fiscal",
    title: "Déclaration de TVA (CA3)",
    description: "Déclaration et paiement de TVA pour les entreprises assujetties.",
    dueDate: "2026-04-19",
    officialSourceUrl: "https://bofip.impots.gouv.fr",
    applicableCompanyTypes: ["sarl", "sas", "eurl"],
    applicableTaxRegimes: ["reel-normal"],
    minRevenue: 50000,
  },
  {
    id: "fiscal-2",
    category: "fiscal",
    title: "Acompte d'impôt sur les sociétés",
    description: "Versement de l'acompte trimestriel d'IS.",
    dueDate: "2026-04-15",
    officialSourceUrl: "https://www.impots.gouv.fr",
    applicableCompanyTypes: ["sarl", "sas", "eurl"],
    applicableTaxRegimes: ["reel-simplifie", "reel-normal"],
  },
];

export const mockUpcomingTaxes: UpcomingTaxItem[] = [
  {
    id: "upcoming-1",
    title: "Évolution de la contribution formation",
    summary:
      "Un ajustement du taux est annoncé pour certains secteurs à partir du second semestre.",
    probableDate: "2026-09-01",
    officialSourceUrl: "https://travail-emploi.gouv.fr",
    confidence: "annonce",
    applicableCompanyTypes: ["micro-entreprise", "sarl", "sas", "eurl"],
  },
  {
    id: "upcoming-2",
    title: "Révision du barème CFE",
    summary:
      "Mise à jour probable de la cotisation foncière des entreprises selon la commune.",
    probableDate: "2026-12-15",
    officialSourceUrl: "https://www.collectivites-locales.gouv.fr",
    confidence: "probable",
    applicableCompanyTypes: ["sarl", "sas", "eurl"],
  },
];

export const mockForumPosts: ForumPost[] = [
  {
    id: "post-1",
    authorName: "Amel",
    authorCompanyType: "sas",
    title: "Rappel DSN : vous utilisez quel outil ?",
    content:
      "Je compare plusieurs solutions pour éviter les oublis de déclaration mensuelle.",
    createdAt: "2026-03-15T09:30:00.000Z",
    likes: 12,
  },
  {
    id: "post-2",
    authorName: "Nadir",
    authorCompanyType: "micro-entreprise",
    title: "Paiement trimestriel Urssaf",
    content:
      "Petit retour d'expérience : j'ai activé les prélèvements automatiques et ça m'a simplifié la vie.",
    createdAt: "2026-03-18T14:15:00.000Z",
    likes: 7,
  },
];

export const defaultCompanyProfile: CompanyProfile = {
  companyName: "Nova Atelier",
  ownerName: "Camille Martin",
  email: "camille@nova-atelier.fr",
  companyType: "sas",
  taxRegime: "reel-simplifie",
  yearlyRevenue: 120000,
  employeeCount: 3,
};

export const defaultUserAccount: UserAccount = {
  id: "user-1",
  role: "user",
  profile: defaultCompanyProfile,
  subscriptionActive: true,
  createdAt: "2026-01-10T10:00:00.000Z",
};

export const adminUserAccount: UserAccount = {
  id: "admin-1",
  role: "admin",
  profile: {
    ...defaultCompanyProfile,
    email: "admin@obligo.fr",
  },
  subscriptionActive: true,
  createdAt: "2026-01-01T08:00:00.000Z",
};

export const mockAdminStats: AdminStats = {
  totalUsers: 248,
  activeSubscriptions: 201,
  byCompanyType: {
    "micro-entreprise": 95,
    sarl: 63,
    sas: 74,
    eurl: 16,
  },
  byTaxRegime: {
    "reel-simplifie": 121,
    "reel-normal": 38,
    "micro-fiscal": 89,
  },
  averageRevenue: 87300,
};
