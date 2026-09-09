# Minuit Retail — Site vitrine

Site web pour **Minuit Retail**, réseau de distributeurs autonomes installés dans
les établissements de nuit de la région Provence-Alpes-Côte d'Azur.

> *Les essentiels de votre nuit — ouvert quand tout est fermé.*

Site B2B destiné aux exploitants d'établissements (discothèques, bars de nuit).
Direction artistique **éditoriale, nocturne, hospitality premium** : photographie
centrale, typographie serif/sans/mono, lignes lumineuses champagne, grille
asymétrique, retenue.

## Structure

```
.
├── index.html              # Page unique (rythme éditorial)
├── mentions-legales.html   # Mentions légales & RGPD
├── css/styles.css          # Design system éditorial
├── js/script.js            # Interactions (retenue)
├── assets/
│   ├── club.jpg            # Hero — distributeur en situation (club)
│   ├── machine-exploded.jpg# Vue éclatée (section machine)
│   ├── machine-night.jpg   # Image de coupure
│   ├── favicon.svg · apple-touch-icon.png · og-image.png
├── robots.txt · sitemap.xml · site.webmanifest
└── README.md
```

## Design system

- **Palette** — obscurité chaude à plusieurs niveaux (`#0a0908` → `#1b1813`),
  champagne `#d9c49c` employé avec retenue (lignes, labels, états actifs, CTA),
  texte crème `#efe9dd`. Pas de gros gradient or.
- **Typographie** — *Cormorant Garamond* (serif éditoriale, grands titres),
  *Instrument Sans* (fonctionnel), *Martian Mono* (labels techniques, chiffres).
- **Lignes** — filets champagne translucides (`--line`) comme signature
  architecturale ; angles nets (radius 2 px) ; peu de cards.
- **Photographie** — plein cadre, crops éditoriaux, scrims minimaux.

## Sections

Hero (club) → Manifeste → Solution (rôles) → La machine (vue éclatée + points) →
Coupure image → Technologie (fiche technique) → Établissement (bénéfices) →
Revenus (+ simulateur) → Conformité → FAQ → Mise en place (calendrier) →
Contact → Pied de page. Page `404.html` sobre en complément.

## Interactions (`js/script.js`)

Volontairement discrètes : révélations légères au défilement, header qui prend
un fond au scroll, navigation active (scroll-spy), menu mobile plein écran,
**simulateur de redevance** (barème par tranches, panier 25 €), FAQ à ouverture
exclusive, formulaire de contact via `mailto`.

## À personnaliser

- **Formulaire** : renseignez **`FORM_ENDPOINT`** en haut de `js/script.js` avec
  l'URL d'un service (Formspree, Basin, Netlify Forms…) configuré pour rediriger
  les demandes vers l'adresse e-mail de réception. Tant qu'il est vide, le
  formulaire bascule sur un repli `mailto` (`CONTACT_EMAIL`, juste en dessous).
- **Mesure d'audience** : snippet Plausible/Fathom prêt à activer, en commentaire
  dans le `<head>` de `index.html` (sans cookie, sans bandeau).
- **Domaine** `www.minuit-retail.fr` (métadonnées, sitemap, robots, analytics) → domaine réel.
- **Champs légaux** (SIREN, RCS, capital, hébergeur…) dans `mentions-legales.html`,
  signalés « à compléter » jusqu'à l'immatriculation.

## Données produit

Caractéristiques techniques issues de la fiche constructeur (600 × 270 × 1030 mm,
55 kg, écran 32″, Android 2 Go/8 Go, 110–240 V · 80 W, réseau filaire/Wi-Fi,
0–40 °C, capacité ≈ 110 pièces). Le modèle de redevance du simulateur repose sur
le livret commercial (panier moyen 25 € TTC) ; les prix visibles sur les visuels
produit sont illustratifs.

## Aperçu local

Site **statique** : aucune dépendance, aucun build. `npm install` n'est pas
nécessaire (il n'y a rien à installer).

- Le plus simple : **ouvrir `index.html`** dans un navigateur.
- Petit serveur local, au choix :

```bash
npm start                     # via npx serve (Node)
# ou
python3 -m http.server 8000   # puis http://localhost:8000
```

> Si le dossier extrait du zip est dédoublé (`Site-minuit-retail-…/Site-minuit-retail-…/`),
> place-toi dans celui qui contient `index.html`.

## Déploiement

Site statique : on transfère les fichiers tels quels, aucun build.

**Fichiers à mettre en ligne** (le site public) :
`index.html`, `mentions-legales.html`, `404.html`, `css/`, `js/`, `assets/`,
`robots.txt`, `sitemap.xml`, `site.webmanifest`, `.htaccess` (Apache/OVH) ou
`_headers` (Netlify/Cloudflare).

**À NE PAS mettre en ligne** (fichiers de travail) :
`README.md`, `LANCEMENT.md`, `package.json`, le script de build, le dossier `.git`.

### OVH (hébergement mutualisé, Apache)
1. Se connecter en **FTP/SFTP** (identifiants dans l'espace client OVH) avec
   FileZilla, ou via l'explorateur de fichiers OVH.
2. Envoyer les fichiers du site dans le dossier **`www/`** (racine web).
3. Le **`.htaccess`** fourni s'occupe du reste : HTTPS forcé, en-têtes de
   sécurité, page 404, blocage du listing des dossiers et des fichiers internes.
4. Associer le domaine à l'hébergement dans l'espace client, activer le
   **certificat SSL gratuit** (Let's Encrypt) proposé par OVH.

> Pour garder le site invisible avant le lancement : la plupart des hébergeurs
> proposent une **protection par mot de passe** (sur OVH, via un `.htaccess` +
> `.htpasswd`) — demande-la si besoin.
