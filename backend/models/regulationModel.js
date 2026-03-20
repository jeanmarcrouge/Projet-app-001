const pool = require('../config/db');

async function getActiveRegulations() {
  const { rows } = await pool.query(
    `SELECT id, title, category, effective_date, source_link, conditions, action_text, is_active
     FROM regulations
     WHERE is_active = true
     ORDER BY effective_date ASC, id ASC`
  );

  return rows;
}

module.exports = {
  getActiveRegulations,
};
