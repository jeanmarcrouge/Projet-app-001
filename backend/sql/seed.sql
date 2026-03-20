TRUNCATE TABLE deadlines, regulations, users, companies, pre_registrations RESTART IDENTITY CASCADE;

INSERT INTO companies (name, legal_form, tax_regime, vat_regime, employees_count) VALUES
('Atelier Horizon', 'SARL', 'IS', 'reel_normal', 8),
('Studio Lumiere', 'SASU', 'IS', 'reel_simplifie', 2),
('Boutique Nova', 'EI', 'IR', 'franchise_base', 0);

INSERT INTO users (email, password, company_id) VALUES
('owner@example.com', '$2b$10$WV3dmGSmHzJtD2mKMtNSxu/STvYeqLfC7okQ9cval4WtCo39Aa.6O', 1);

INSERT INTO regulations (title, category, effective_date, source_link, conditions, action_text, is_active) VALUES
('TVA declaration mensuelle', 'vat', '2026-04-15', 'https://www.impots.gouv.fr', '{"vat_regime": ["reel_normal"]}', 'Declare and pay monthly VAT on the tax portal.', true),
('TVA regime simplifie', 'vat', '2026-05-05', 'https://www.impots.gouv.fr/professionnel/declarer-et-payer-la-tva', '{"vat_regime": ["reel_simplifie"]}', 'Submit annual VAT return and required installments.', true),
('Cotisations URSSAF', 'social', '2026-04-01', 'https://www.urssaf.fr', '{"min_employees": 1}', 'Declare payroll and pay social contributions.', true),
('Impot sur les societes (IS)', 'tax', '2026-05-15', 'https://www.impots.gouv.fr/professionnel/impot-sur-les-societes', '{"tax_regime": ["IS"]}', 'Prepare IS return and settle due amount.', true),
('CFE', 'tax', '2026-12-15', 'https://www.impots.gouv.fr/professionnel/cotisation-fonciere-des-entreprises-cfe', '{"legal_forms": ["SARL", "SAS", "SASU", "EI"]}', 'Review CFE notice and pay before due date.', true),
('Depot comptes annuels', 'legal', '2026-07-31', 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31179', '{"legal_forms": ["SARL", "SAS", "SASU"]}', 'File annual accounts to the commercial court registry.', true),
('Autres obligations sociales (exemple)', 'social', '2026-06-30', 'https://www.service-public.fr/professionnels-entreprises', '{"min_employees": 1, "max_employees": 49}', 'Run annual workforce obligations review and update HR records.', true);

INSERT INTO deadlines (company_id, title, due_date, type) VALUES
(1, 'URSSAF monthly declaration', CURRENT_DATE + INTERVAL '7 day', 'social'),
(1, 'VAT monthly declaration', CURRENT_DATE + INTERVAL '14 day', 'vat'),
(1, 'IS installment', CURRENT_DATE + INTERVAL '21 day', 'tax'),
(2, 'VAT simplified installment', CURRENT_DATE + INTERVAL '10 day', 'vat'),
(2, 'Annual accounts filing', CURRENT_DATE + INTERVAL '40 day', 'legal');
