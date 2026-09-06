# Minuit Retail — Site vitrine

Site web pour **Minuit Retail**, réseau de distributeurs autonomes installés dans
les établissements de nuit de la région Provence-Alpes-Côte d'Azur.

> *Le point de vente qui travaille pour vous quand tout est fermé.*

Le site s'adresse aux **établissements partenaires** (discothèques, bars de nuit,
beach clubs) : il présente le concept, la machine, le rôle de chacun, la gamme,
les revenus (avec un simulateur de redevance) et le parcours pour devenir partenaire.

## Structure

```
.
├── index.html              # Page unique (toutes les sections)
├── css/styles.css          # Thème « nuit premium » (noir profond + or)
├── js/script.js            # Interactions (voir ci-dessous)
├── assets/
│   ├── favicon.svg         # Favicon (croissant de lune)
│   ├── apple-touch-icon.png# Icône iOS 180×180
│   └── og-image.png        # Image de partage (1200×630)
├── robots.txt              # Indexation
├── sitemap.xml             # Plan du site
├── site.webmanifest        # Manifeste PWA
└── README.md
```

## Sections de la page

Hero → Chiffres clés → Le concept → La machine → Votre rôle → La gamme →
**Conformité & réglementation** → Vos revenus (+ simulateur) → **FAQ** →
Partenariat (+ formulaire) → Pied de page.

## Interactions (`js/script.js`)

- Menu mobile, apparitions au défilement, **barre de progression** de lecture
- **Nav active** au défilement (scroll-spy), **bouton retour en haut**
- **Simulateur de redevance** (barème par tranches, panier moyen 25 €)
- **Compteurs animés** sur les chiffres clés
- **Ciel étoilé** animé dans le hero (désactivé si `prefers-reduced-motion`)
- Formulaire de contact → ouverture du client mail (`mailto`, sans backend)

## SEO / partage

Métadonnées Open Graph + Twitter, image de partage, **données structurées
JSON-LD** (Organization + FAQPage), `robots.txt`, `sitemap.xml`, manifeste PWA,
lien canonique. Remplacer `https://www.minuit-retail.fr/` par le domaine réel
dans `index.html`, `robots.txt` et `sitemap.xml` une fois le nom de domaine choisi.

Site **statique**, sans étape de build ni dépendance : ouvrez `index.html`
directement, ou servez le dossier avec n'importe quel serveur HTTP.

```bash
# aperçu local
python3 -m http.server 8000
# puis http://localhost:8000
```

## Points d'attention pour la reprise

- **Formulaire de contact** — ouvre aujourd'hui le client mail du visiteur via
  `mailto:` (adresse `CONTACT_EMAIL` en haut de `js/script.js`, à remplacer).
  Pour un envoi silencieux et fiable, brancher un service (Formspree, Netlify
  Forms, API interne…) sur l'événement `submit` du formulaire `#contact-form`.
- **Coordonnées** — `CONTACT_EMAIL` dans `js/script.js`, plus téléphone / e-mail
  réels à afficher (section Partenariat et pied de page) une fois la SAS constituée.
- **Domaine** — remplacer `www.minuit-retail.fr` (métadonnées, sitemap, robots)
  par le domaine définitif.
- **Chiffres** — barème de redevance et panier moyen (25 €) proviennent du livret
  commercial ; le simulateur applique le barème par tranches.
- **Contenu confidentiel** — les projections financières internes (note de
  présentation investisseurs) ne figurent volontairement **pas** sur le site public.
- **Marques / visuels produits** — les cartes gamme utilisent des libellés texte ;
  ajouter les visuels officiels si les droits sont disponibles.

## Contenu

Textes et données tirés du livret commercial et de la note de présentation
Minuit Retail (août 2026).
