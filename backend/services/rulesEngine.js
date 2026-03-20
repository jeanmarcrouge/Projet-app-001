function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function formatDate(dateValue) {
  if (!dateValue) return 'N/A';
  const date = new Date(dateValue);
  return date.toISOString().split('T')[0];
}

function isRegulationRelevant(company, regulation) {
  const conditions = regulation.conditions || {};

  const legalForms = normalizeList(conditions.legal_forms).map((item) => item.toLowerCase());
  const vatRegimes = normalizeList(conditions.vat_regime).map((item) => item.toLowerCase());
  const taxRegimes = normalizeList(conditions.tax_regime).map((item) => item.toLowerCase());

  if (legalForms.length > 0 && !legalForms.includes((company.legal_form || '').toLowerCase())) {
    return false;
  }

  if (vatRegimes.length > 0 && !vatRegimes.includes((company.vat_regime || '').toLowerCase())) {
    return false;
  }

  if (taxRegimes.length > 0 && !taxRegimes.includes((company.tax_regime || '').toLowerCase())) {
    return false;
  }

  if (typeof conditions.min_employees === 'number' && Number(company.employees_count || 0) < conditions.min_employees) {
    return false;
  }

  if (typeof conditions.max_employees === 'number' && Number(company.employees_count || 0) > conditions.max_employees) {
    return false;
  }

  return true;
}

function buildAffectedText(company, regulation) {
  const conditions = regulation.conditions || {};
  const fragments = [];

  if (conditions.legal_forms) {
    fragments.push(`your legal form is one of: ${normalizeList(conditions.legal_forms).join(', ')}`);
  }

  if (conditions.vat_regime) {
    fragments.push(`your VAT regime is one of: ${normalizeList(conditions.vat_regime).join(', ')}`);
  }

  if (conditions.tax_regime) {
    fragments.push(`your tax regime is one of: ${normalizeList(conditions.tax_regime).join(', ')}`);
  }

  if (typeof conditions.min_employees === 'number') {
    fragments.push(`you have at least ${conditions.min_employees} employees`);
  }

  if (typeof conditions.max_employees === 'number') {
    fragments.push(`you have at most ${conditions.max_employees} employees`);
  }

  if (fragments.length === 0) {
    fragments.push(`you run a company similar to ${company.name || 'your company profile'}`);
  }

  return `You are affected if ${fragments.join(' and ')}.`;
}

function getRelevantRegulations(company, regulations) {
  return regulations
    .filter((regulation) => isRegulationRelevant(company, regulation))
    .map((regulation) => ({
      ...regulation,
      affected_if: buildAffectedText(company, regulation),
      action: `Action: ${regulation.action_text}`,
      date: `Date: ${formatDate(regulation.effective_date)}`,
    }));
}

module.exports = {
  getRelevantRegulations,
};
