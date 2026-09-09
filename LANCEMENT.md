# Avant la mise en ligne — checklist

> À compléter avant de publier la version finale. Les éléments ci-dessous
> attendent des informations ou des comptes à fournir de ton côté.

## ⚖️ Obligatoire (mentions légales)
- [ ] **Capital social**, **SIREN / RCS**, **N° TVA intracom.**, **directeur de
      la publication** — une fois la SAS immatriculée (`mentions-legales.html`).
- [ ] **Hébergeur** : nom, adresse, contact (`mentions-legales.html`).

## ✉️ Formulaire & contact
- [ ] **`FORM_ENDPOINT`** (en tête de `js/script.js`) : URL d'un service de
      formulaire (Formspree / Basin / Typeform…) configuré pour rediriger les
      demandes vers l'adresse e-mail de réception. Tant qu'il est vide → repli `mailto`.
- [ ] **`CONTACT_EMAIL`** (`js/script.js`) : adresse réelle de réception.
- [ ] **Téléphone / WhatsApp** : fournir le numéro → j'ajoute les boutons de
      contact rapide (fort levier de conversion en B2B nuit).

## 🌐 Domaine & déploiement
- [ ] **Domaine réel** : remplacer `www.minuit-retail.fr` dans **toutes les pages
      HTML** (accueil, mentions légales, `journal.html` + les 3 articles),
      `sitemap.xml`, `robots.txt`, les JSON-LD et le snippet analytics.
      Astuce : `grep -rl "www.minuit-retail.fr" .` pour tout lister.
- [ ] **Déploiement** : site statique → Netlify / Vercel / OVH… (`404.html` géré).

## 🔒 Sécurité (en-têtes)
- [ ] **HTTPS** activé (fourni par l'hébergeur — Netlify/Vercel/Cloudflare le font seuls).
- [ ] En-têtes de sécurité : le fichier **`_headers`** est prêt (Netlify /
      Cloudflare Pages). Sur Vercel → `vercel.json` ; Apache → `.htaccess` ;
      Nginx → `add_header`. Vérifier après déploiement (ex. securityheaders.com).
- [ ] **Étendre la CSP** dans `_headers` une fois le formulaire et l'analytics
      choisis (ajouter les hôtes Formspree / Plausible à `connect-src` / `script-src`).

## 📈 Mesure
- [ ] **Activer l'analytics** : décommenter le snippet Plausible/Fathom dans le
      `<head>` de `index.html` et créer le compte + ajouter le domaine.

## 🔎 SEO / Référencement (voir `SEO.md` pour le détail)
- [ ] **Google Search Console** : valider le domaine, soumettre `sitemap.xml`.
- [ ] **Bing Webmaster Tools** : idem (couvre aussi ChatGPT Search).
- [ ] **Google Business Profile** (le plus fort levier local) : créer une fiche
      « zone desservie » (PACA, sans adresse publique), catégorie « Fournisseur de
      distributeurs automatiques », photos, lien vers le site.
- [ ] **Citations / annuaires** : PagesJaunes, Kompass, annuaires nightlife/CHR.
- [ ] **Backlinks** : presse locale, partenaires, fédérations de la nuit (voir `SEO.md`).
- [ ] **Domaine dans le JSON-LD** : les `@id` et URLs pointent vers
      `www.minuit-retail.fr` → remplacer par le domaine réel au déploiement.

## ✨ Optionnel (améliorations)
- [ ] **Plaquette PDF** téléchargeable (aimant à leads « Recevoir la plaquette »).
- [ ] **Image hero responsive** (version mobile plus légère → meilleur LCP).
- [ ] Aligner les visuels produit sur le prix **25 €** s'ils sont régénérés
      (les rendus actuels affichent 18,90 € ; le modèle du site reste à 25 €).
