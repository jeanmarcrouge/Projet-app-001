CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  legal_form VARCHAR(100) NOT NULL,
  tax_regime VARCHAR(100) NOT NULL,
  vat_regime VARCHAR(100) NOT NULL,
  employees_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS regulations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  effective_date DATE NOT NULL,
  source_link TEXT,
  conditions JSONB NOT NULL DEFAULT '{}'::jsonb,
  action_text TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS deadlines (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  type VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pre_registrations (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regulations_active ON regulations(is_active);
CREATE INDEX IF NOT EXISTS idx_deadlines_company_due ON deadlines(company_id, due_date);
