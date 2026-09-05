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
├── index.html          # Page unique (toutes les sections)
├── css/styles.css      # Thème « nuit premium » (noir profond + or)
├── js/script.js        # Menu mobile, apparitions, simulateur, formulaire
├── assets/favicon.svg  # Favicon (croissant de lune)
└── README.md
```

Site **statique**, sans étape de build ni dépendance : ouvrez `index.html`
directement, ou servez le dossier avec n'importe quel serveur HTTP.

```bash
# aperçu local
python3 -m http.server 8000
# puis http://localhost:8000
```

## Points d'attention pour la reprise

- **Formulaire de contact** — `js/script.js` gère la validation côté client et
  affiche un message de confirmation, mais **n'envoie rien** pour l'instant.
  Brancher un service (Formspree, Netlify Forms, API interne…) sur l'événement
  `submit` du formulaire `#contact-form`.
- **Coordonnées** — téléphone / e-mail réels à renseigner (section Partenariat et
  pied de page) une fois la SAS constituée.
- **Chiffres** — barème de redevance et panier moyen (25 €) proviennent du livret
  commercial ; le simulateur applique le barème par tranches.
- **Contenu confidentiel** — les projections financières internes (note de
  présentation investisseurs) ne figurent volontairement **pas** sur le site public.
- **Marques / visuels produits** — les cartes gamme utilisent des libellés texte ;
  ajouter les visuels officiels si les droits sont disponibles.

## Contenu

Textes et données tirés du livret commercial et de la note de présentation
Minuit Retail (août 2026).
