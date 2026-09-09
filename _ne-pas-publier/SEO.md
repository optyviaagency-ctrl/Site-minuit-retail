# SEO — stratégie de référencement Minuit Retail

Objectif : **apparaître en première position** sur les recherches liées à
l'installation de distributeurs automatiques de vapes / pods rechargeables dans
les établissements de nuit de la région PACA.

Le référencement se joue sur trois plans : **on-page** (fait, dans le code),
**technique** (fait), et **hors-page** (à réaliser de ton côté — c'est ce qui
départage la 1ʳᵉ place). Ce document couvre les trois.

---

## 1. Mots-clés ciblés

La niche est étroite et B2B : peu de volume, mais peu de concurrence → la 1ʳᵉ
place est atteignable avec une exécution sérieuse.

**Requêtes principales (intention commerciale)**
- distributeur automatique vape / cigarette électronique
- distributeur automatique pods rechargeables
- distributeur automatique en discothèque / boîte de nuit / bar de nuit
- distributeur vape établissement de nuit
- installer un distributeur automatique dans mon bar / ma discothèque

**Longue traîne locale** (à travailler via la fiche Google + contenu)
- distributeur automatique vape Marseille / Nice / Cannes / Saint-Tropez / Monaco / Cap d'Agde
- distributeur cigarette électronique boîte de nuit + [ville de l'arc Cap d'Agde → Monaco]

**Requêtes informationnelles** (pour de futurs articles — voir §6)
- est-ce légal de vendre des vapes en distributeur automatique ?
- rentabilité d'un distributeur automatique en discothèque
- réglementation vente vape / puff en France

---

## 2. On-page — **fait** ✅

- **`<title>` et meta description** réécrits avec les mots-clés + « PACA » (au
  lieu du slogan seul, invisible pour Google).
- **Balises Open Graph / Twitter** enrichies (titre, description, `image:alt`).
- **Meta géo** (`geo.region = FR-PAC`, `geo.placename`).
- **`hreflang`** fr-FR + x-default.
- **Contenu** : le mot-clé « distributeur automatique de vapes / pods
  rechargeables » apparaît désormais dans le hero, et une section
  **« Zone d'intervention »** liste les villes PACA (signal local).
- **Alt d'images** descriptifs et orientés mots-clés.
- **Hiérarchie Hn** : un seul `<h1>`, des `<h2>` de section thématiques.

## 3. Données structurées (Schema.org) — **fait** ✅

Un `@graph` JSON-LD complet est en place dans `index.html` :
- **Organization** (+ contactPoint, adresse région PACA, `knowsAbout`)
- **WebSite** / **WebPage**
- **Service** avec `areaServed` = villes PACA + offre (redevance)
- **FAQPage** (les 6 questions du site → éligibilité aux rich results)

> À vérifier après déploiement : <https://search.google.com/test/rich-results>
> et <https://validator.schema.org>.

## 4. Technique — **fait** ✅ (à confirmer en ligne)

- `sitemap.xml` (avec balises image) + `robots.txt` qui le référence.
- `.htaccess` (OVH) : HTTPS forcé, en-têtes, cache, compression.
- Site statique léger, images en `lazy`, hero en `preload` → bon LCP.
- **Après mise en ligne** : passer la page sur
  <https://pagespeed.web.dev> et viser le vert sur les Core Web Vitals.

---

## 5. Hors-page — **à faire** (le plus déterminant pour la 1ʳᵉ place)

### 5.1 Indexation (jour 1)
1. **Google Search Console** → ajouter la propriété (domaine), valider,
   **soumettre `sitemap.xml`**, demander l'indexation de la page d'accueil.
2. **Bing Webmaster Tools** → même chose (alimente aussi la recherche IA).

### 5.2 Google Business Profile — **levier local nº 1**
Minuit Retail est une **entreprise à zone desservie** (pas de boutique) → parfait
pour une fiche « secteur d'intervention » **sans afficher d'adresse**.

> 👉 **Tout le texte prêt à coller** (nom, catégories, zones, description sous
> 750 caractères, services, posts, Q&A) est dans **`GOOGLE-BUSINESS-PROFILE.md`**.

- Catégorie principale : *Fournisseur de distributeurs automatiques* (ou proche).
- Zones : tout l'arc méditerranéen, du Cap d'Agde à Monaco — Montpellier, Nîmes,
  Orange, Avignon, Aix, Marseille, Toulon, Saint-Tropez, Cannes, Antibes, Nice, Menton.
- Ajouter photos des machines, lien vers le site, horaires de contact.
- Publier régulièrement (posts) et collecter des **avis** de partenaires.

Une fiche bien remplie fait apparaître Minuit Retail dans le **pack local**
(la carte Google) — souvent au-dessus des résultats classiques.

### 5.3 Citations & annuaires (cohérence NAP : Nom, zone, contact identiques partout)
PagesJaunes, Kompass, Yelp, annuaires CHR / nightlife, annuaires B2B locaux.

### 5.4 Backlinks (autorité)
- Presse & blogs locaux (sorties, nightlife PACA), interviews fondateur.
- Fédérations / syndicats de la nuit, groupements d'exploitants.
- Pages « partenaires » des établissements équipés (échange de liens naturel).
- Communiqué de lancement.
Qualité > quantité : quelques liens de sites locaux crédibles valent mieux que
des annuaires de masse.

---

## 6. Contenu — **journal en ligne** ✅ (3 articles longue traîne)

Un **Journal** éditorial est en place (`journal.html`) avec 3 articles ciblant
des requêtes informationnelles à forte intention, chacun balisé en `BlogPosting`
+ `BreadcrumbList` et maillé vers le formulaire :
- **Légalité** → `distributeur-vape-discotheque-legal.html`
- **Rentabilité** → `rentabilite-distributeur-automatique-boite-de-nuit.html`
- **Contrôle d'âge** → `controle-age-distributeur-automatique.html`

Chaque article est une page indexable supplémentaire, liée depuis la navigation,
le pied de page et les autres articles (maillage interne).

**Pour aller plus loin** (quand tu veux, je les rédige) :
- « Distributeur automatique de vape à Marseille / Nice / Cannes » (pages locales).
- « Puffs interdits : quelles alternatives rechargeables en établissement ? »
- « Combien de place faut-il pour un distributeur en bar de nuit ? »

---

## 7. Suivi

- **Search Console** : requêtes, positions, pages indexées, couverture.
- **Analytics** (Plausible, déjà prêt à activer) : trafic et conversions.
- Rythme : vérifier positions et Core Web Vitals **1×/mois**.

---

## 8. Attentes réalistes

- Indexation : quelques jours à 2 semaines après soumission GSC.
- Position sur les requêtes de niche : **1 à 3 mois** avec fiche Google active
  + quelques backlinks. La niche étant peu concurrentielle, la 1ʳᵉ place est
  un objectif crédible — surtout en local (pack Google) via le point 5.2.
- Le nerf de la guerre côté local : **Google Business Profile + avis + backlinks
  locaux**. Le code est prêt ; ces actions se font hors du site.
