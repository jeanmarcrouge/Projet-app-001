const pool = require('../config/db');

async function getUpcomingDeadlinesByCompany(companyId, limit = 10) {
  const { rows } = await pool.query(
    `SELECT id,
            company_id,
            title,
            due_date,
            type,
            (due_date::date - CURRENT_DATE) AS days_remaining
     FROM deadlines
     WHERE company_id = $1
       AND due_date >= CURRENT_DATE
     ORDER BY due_date ASC
     LIMIT $2`,
    [companyId, limit]
  );

  return rows;
}

async function getDeadlinesForNotification(daysBefore = 7) {
  const { rows } = await pool.query(
    `SELECT d.id,
            d.company_id,
            d.title,
            d.due_date,
            d.type,
            c.name AS company_name,
            (
              SELECT r.action_text
              FROM regulations r
              WHERE r.category = d.type
                AND r.is_active = true
              ORDER BY r.effective_date ASC
              LIMIT 1
            ) AS action_text
     FROM deadlines d
     JOIN companies c ON c.id = d.company_id
     WHERE d.due_date::date = CURRENT_DATE + $1::int`,
    [daysBefore]
  );

  return rows;
}

module.exports = {
  getUpcomingDeadlinesByCompany,
  getDeadlinesForNotification,
};
