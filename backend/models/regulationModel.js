const { query } = require("./db");

const getActiveRegulations = async () => {
  const result = await query("SELECT * FROM regulations WHERE is_active = TRUE ORDER BY effective_date ASC");
  return result.rows;
};

const includesValue = (allowedValues, companyValue) => {
  if (!Array.isArray(allowedValues) || allowedValues.length === 0) {
    return true;
  }
  return allowedValues.map((v) => String(v).toLowerCase()).includes(String(companyValue || "").toLowerCase());
};

const conditionMatchesCompany = (conditions, company) => {
  if (!conditions || Object.keys(conditions).length === 0) {
    return true;
  }

  const legalFormOk = includesValue(conditions.legal_forms, company.legal_form);
  const vatRegimeOk = includesValue(conditions.vat_regime, company.vat_regime);
  const taxRegimeOk = includesValue(conditions.tax_regime, company.tax_regime);
  const minEmployeesOk =
    conditions.min_employees === undefined ||
    Number(company.employees_count || 0) >= Number(conditions.min_employees);
  const maxEmployeesOk =
    conditions.max_employees === undefined ||
    Number(company.employees_count || 0) <= Number(conditions.max_employees);

  return legalFormOk && vatRegimeOk && taxRegimeOk && minEmployeesOk && maxEmployeesOk;
};

const buildAffectedText = (conditions) => {
  if (!conditions || Object.keys(conditions).length === 0) {
    return "You are affected if this rule applies to your business profile.";
  }

  const parts = [];
  if (Array.isArray(conditions.legal_forms) && conditions.legal_forms.length > 0) {
    parts.push(`your legal form is one of: ${conditions.legal_forms.join(", ")}`);
  }
  if (Array.isArray(conditions.vat_regime) && conditions.vat_regime.length > 0) {
    parts.push(`your VAT regime is one of: ${conditions.vat_regime.join(", ")}`);
  }
  if (Array.isArray(conditions.tax_regime) && conditions.tax_regime.length > 0) {
    parts.push(`your tax regime is one of: ${conditions.tax_regime.join(", ")}`);
  }
  if (conditions.min_employees !== undefined) {
    parts.push(`you have at least ${conditions.min_employees} employee(s)`);
  }
  if (conditions.max_employees !== undefined) {
    parts.push(`you have no more than ${conditions.max_employees} employee(s)`);
  }

  return `You are affected if ${parts.join(" and ")}.`;
};

const getRelevantRegulations = async (company) => {
  const regulations = await getActiveRegulations();
  const relevant = regulations.filter((regulation) => conditionMatchesCompany(regulation.conditions, company));

  return relevant.map((regulation) => ({
    id: regulation.id,
    title: regulation.title,
    category: regulation.category,
    effectiveDate: regulation.effective_date,
    sourceLink: regulation.source_link,
    actionText: regulation.action_text,
    conditions: regulation.conditions,
    isActive: regulation.is_active,
    summary: {
      affectedIf: buildAffectedText(regulation.conditions),
      action: `Action: ${regulation.action_text}`,
      date: `Date: ${regulation.effective_date}`,
    },
  }));
};

module.exports = {
  getRelevantRegulations,
};
