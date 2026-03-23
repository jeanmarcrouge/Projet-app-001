export type CompanyType = "micro-entreprise" | "sarl" | "sas" | "eurl";

export type TaxRegime = "reel-simplifie" | "reel-normal" | "micro-fiscal";

export type UserRole = "user" | "admin";

export interface CompanyProfile {
  companyName: string;
  ownerName: string;
  email: string;
  companyType: CompanyType;
  taxRegime: TaxRegime;
  yearlyRevenue: number;
  employeeCount: number;
}

export interface UserAccount {
  id: string;
  role: UserRole;
  profile: CompanyProfile;
  subscriptionActive: boolean;
  createdAt: string;
}

export type ObligationCategory = "social" | "fiscal";

export interface ObligationItem {
  id: string;
  category: ObligationCategory;
  title: string;
  description: string;
  dueDate: string;
  officialSourceUrl: string;
  applicableCompanyTypes: CompanyType[];
  applicableTaxRegimes: TaxRegime[];
  minRevenue?: number;
  maxRevenue?: number;
  minEmployees?: number;
  maxEmployees?: number;
}

export interface UpcomingTaxItem {
  id: string;
  title: string;
  summary: string;
  probableDate: string;
  officialSourceUrl: string;
  confidence: "probable" | "annonce";
  applicableCompanyTypes: CompanyType[];
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorCompanyType: CompanyType;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface NotificationItem {
  id: string;
  type: "deadline-30" | "deadline-7" | "update";
  title: string;
  message: string;
  targetDate: string;
}

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  byCompanyType: Record<CompanyType, number>;
  byTaxRegime: Record<TaxRegime, number>;
  averageRevenue: number;
}
