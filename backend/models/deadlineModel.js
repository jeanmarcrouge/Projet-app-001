const { query } = require("./db");

const getUpcomingDeadlinesByCompany = async (companyId) => {
  const result = await query(
    `SELECT d.id, d.company_id, d.title, d.due_date, d.type, r.action_text
     FROM deadlines d
     LEFT JOIN regulations r ON LOWER(r.title) = LOWER(d.title)
     WHERE d.company_id = $1
       AND d.due_date >= CURRENT_DATE
     ORDER BY d.due_date ASC`,
    [companyId]
  );

  return result.rows;
};

const getDeadlinesDueInDays = async (daysAhead) => {
  const result = await query(
    `SELECT d.id, d.company_id, d.title, d.due_date, d.type, r.action_text, c.name AS company_name
     FROM deadlines d
     INNER JOIN companies c ON c.id = d.company_id
     LEFT JOIN regulations r ON LOWER(r.title) = LOWER(d.title)
     WHERE d.due_date = CURRENT_DATE + ($1::INTEGER * INTERVAL '1 day')
     ORDER BY d.due_date ASC`,
    [daysAhead]
  );

  return result.rows;
};

module.exports = {
  getUpcomingDeadlinesByCompany,
  getDeadlinesDueInDays,
};
