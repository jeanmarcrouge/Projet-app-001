INSERT INTO regulations (title, category, effective_date, source_link, conditions, action_text, is_active)
VALUES
  (
    'TVA déclaration mensuelle',
    'Tax',
    '2024-01-01',
    'https://www.impots.gouv.fr',
    '{"vat_regime":["reel_normal"]}'::jsonb,
    'Déclarez et payez la TVA chaque mois via votre espace professionnel.',
    TRUE
  ),
  (
    'TVA régime simplifié',
    'Tax',
    '2024-01-01',
    'https://www.impots.gouv.fr',
    '{"vat_regime":["reel_simplifie"]}'::jsonb,
    'Effectuez les acomptes semestriels et la déclaration annuelle CA12.',
    TRUE
  ),
  (
    'Cotisations URSSAF',
    'Social',
    '2024-01-01',
    'https://www.urssaf.fr',
    '{"min_employees":1}'::jsonb,
    'Déclarez les salaires et payez les cotisations sociales aux échéances prévues.',
    TRUE
  ),
  (
    'Impôt sur les sociétés (IS)',
    'Tax',
    '2024-01-01',
    'https://www.impots.gouv.fr',
    '{"tax_regime":["is"]}'::jsonb,
    'Calculez et payez les acomptes IS puis soldez lors de la déclaration annuelle.',
    TRUE
  ),
  (
    'CFE',
    'Tax',
    '2024-01-01',
    'https://www.impots.gouv.fr',
    '{"legal_forms":["SAS","SARL","EURL","EI"]}'::jsonb,
    'Déclarez la CFE et réglez avant la date limite de décembre.',
    TRUE
  ),
  (
    'Dépôt comptes annuels',
    'Legal',
    '2024-01-01',
    'https://www.infogreffe.fr',
    '{"legal_forms":["SAS","SARL","EURL"]}'::jsonb,
    'Déposez les comptes annuels au greffe dans les délais légaux.',
    TRUE
  ),
  (
    'Autres obligations sociales (exemple)',
    'Social',
    '2024-01-01',
    'https://www.service-public.fr',
    '{"min_employees":11}'::jsonb,
    'Mettez en place les obligations sociales renforcées liées aux effectifs.',
    TRUE
  )
ON CONFLICT (title) DO NOTHING;

INSERT INTO companies (name, legal_form, tax_regime, vat_regime, employees_count)
VALUES ('Demo PME', 'SAS', 'is', 'reel_normal', 8)
ON CONFLICT DO NOTHING;

INSERT INTO deadlines (company_id, title, due_date, type)
VALUES
  (1, 'TVA déclaration mensuelle', CURRENT_DATE + INTERVAL '7 days', 'tax'),
  (1, 'Cotisations URSSAF', CURRENT_DATE + INTERVAL '14 days', 'social'),
  (1, 'Impôt sur les sociétés (IS)', CURRENT_DATE + INTERVAL '30 days', 'tax'),
  (1, 'Dépôt comptes annuels', CURRENT_DATE + INTERVAL '21 days', 'legal')
ON CONFLICT DO NOTHING;
