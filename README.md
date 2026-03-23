# Obligo TPE/PME - Next.js

Application web React/Next.js pour aider les jeunes entreprises (TPE/PME) à suivre leurs obligations **fiscales et sociales**.

## Stack technique

- Next.js (App Router) + TypeScript
- React Hooks + Context API
- Tailwind CSS v4
- Données mockées (prêtes à migrer vers Firebase/PostgreSQL)

---

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

---

## Architecture modulaire

```text
src/
  app/
    page.tsx                # Accueil
    inscription/page.tsx    # Parcours inscription + paiement
    dashboard/page.tsx      # Volets social/fiscal/taxes + forum + alertes
    admin/page.tsx          # Statistiques admin (permissions)
    sources/page.tsx        # Liens officiels
  components/
    admin/
    common/
    dashboard/
    forum/
    layout/
    payment/
    registration/
  context/
    AppContext.tsx          # État global utilisateur + forum + permissions
  hooks/
    useNotifications.ts     # Notifications J-30 / J-7 / nouveautés
  lib/
    mockData.ts             # Données d'exemple
    filtering.ts            # Personnalisation selon profil entreprise
    notifications.ts        # Moteur d'alertes
  types/
    domain.ts               # Types métier
```

---

## Étapes fonctionnelles (testables indépendamment)

## Étape 1 - Base projet et navigation

**But** : avoir une base Next.js opérationnelle et une navigation claire.

- Routes créées :
  - `/`
  - `/inscription`
  - `/dashboard`
  - `/admin`
  - `/sources`
- Shell global : `AppShell` avec menu + état utilisateur + compteur d'alertes.

✅ **Test rapide**
1. Ouvrir `/`
2. Cliquer sur chaque onglet du menu
3. Vérifier que chaque page s'affiche sans erreur

---

## Étape 2 - Inscription + paiement (5€/mois)

**But** : collecter les données entreprise puis activer l'accès.

- Formulaire profil :
  - Nom entreprise
  - Dirigeant
  - Email
  - Type d'entreprise
  - Régime fiscal
  - Chiffre d'affaires
  - Effectif
- Étape paiement simulé : composant `PaymentForm`.
- À la validation : création utilisateur dans `AppContext`, redirection vers `/dashboard`.

✅ **Test rapide**
1. Aller sur `/inscription`
2. Remplir le formulaire
3. Cliquer `Continuer vers le paiement`
4. Entrer une carte fictive puis valider
5. Vérifier la redirection vers `/dashboard`

---

## Étape 3 - Personnalisation métier

**But** : afficher uniquement les obligations utiles au profil.

- Logique de filtrage : `lib/filtering.ts`
  - Type d'entreprise
  - Régime fiscal
  - Bornes CA/effectif
- Volets distincts dans `/dashboard` :
  - **Volet social**
  - **Volet fiscal**
  - **Taxes et impôts à venir**

✅ **Test rapide**
1. Revenir à `/inscription`
2. Changer type/régime/CA/effectif
3. Valider
4. Vérifier que les listes du dashboard changent selon le profil

---

## Étape 4 - Alertes automatiques

**But** : prévenir l'utilisateur avant les échéances.

- Moteur : `lib/notifications.ts`
- Hook : `hooks/useNotifications.ts`
- Alertes générées :
  - J-30
  - J-7
  - Nouveautés fiscales

✅ **Test rapide**
1. Aller sur `/dashboard`
2. Vérifier le bloc `Alertes automatiques`
3. Contrôler la présence des badges `deadline-30`, `deadline-7`, `update`

---

## Étape 5 - Forum communautaire

**But** : permettre les échanges entre entrepreneurs.

- Composant : `components/forum/ForumSection.tsx`
- Fonctions :
  - Affichage des posts
  - Création d'un nouveau sujet
- Les messages sont stockés dans l'état global (mock, non persistant).

✅ **Test rapide**
1. Aller sur `/dashboard`
2. Dans `Forum`, créer un post
3. Vérifier qu'il apparaît immédiatement en haut de liste

---

## Étape 6 - Permissions et module administrateur

**But** : séparer utilisateurs standards et administrateurs.

- Contrôle d'accès dans `/admin` :
  - `role !== "admin"` → message d'accès restreint
  - `role === "admin"` → `AdminStatsPanel`
- Statistiques : utilisateurs, abonnements actifs, répartition profil.

✅ **Test rapide**
1. Aller sur `/inscription`
2. Cocher `Simuler un compte administrateur`
3. Terminer paiement
4. Ouvrir `/admin`
5. Vérifier l'affichage du module statistiques

---

## Sources officielles

Page `/sources` avec liens :
- BOFiP
- impots.gouv.fr
- Urssaf
- service-public.fr

---

## Prochaine étape recommandée (production)

1. Ajouter une vraie auth (NextAuth/Clerk/Firebase Auth)
2. Remplacer les mocks par PostgreSQL (Prisma) ou Firebase
3. Mettre en place un scheduler (cron/queue) pour notifications email/push
4. Connecter le paiement à Stripe (abonnement mensuel réel)
5. Ajouter tests unitaires/intégration (Vitest + Testing Library)

