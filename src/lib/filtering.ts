import { CompanyProfile, ObligationItem, UpcomingTaxItem } from "@/types/domain";

function matchesBounds(value: number, min?: number, max?: number): boolean {
  if (typeof min === "number" && value < min) {
    return false;
  }
  if (typeof max === "number" && value > max) {
    return false;
  }
  return true;
}

export function filterObligationsForProfile(
  profile: CompanyProfile,
  obligations: ObligationItem[],
): ObligationItem[] {
  return obligations.filter((item) => {
    const companyTypeMatch = item.applicableCompanyTypes.includes(
      profile.companyType,
    );
    const taxRegimeMatch = item.applicableTaxRegimes.includes(profile.taxRegime);

    if (!companyTypeMatch || !taxRegimeMatch) {
      return false;
    }

    return (
      matchesBounds(profile.yearlyRevenue, item.minRevenue, item.maxRevenue) &&
      matchesBounds(profile.employeeCount, item.minEmployees, item.maxEmployees)
    );
  });
}

export function filterUpcomingTaxesForProfile(
  profile: CompanyProfile,
  upcoming: UpcomingTaxItem[],
): UpcomingTaxItem[] {
  return upcoming.filter((item) =>
    item.applicableCompanyTypes.includes(profile.companyType),
  );
}
