# Avant la mise en ligne — checklist

> À compléter avant de publier la version finale. Les éléments ci-dessous
> attendent des informations ou des comptes à fournir de ton côté.

## ⚖️ Obligatoire (mentions légales)
- [x] **Directeur de la publication** : OPTYVIA-Agency ✅
- [x] **Hébergeur** : OVH SAS (Roubaix) ✅
- [ ] **Capital social**, **SIREN / RCS**, **N° TVA intracom.** — une fois la SAS
      immatriculée (`mentions-legales.html`, encore « à compléter »).

## ✉️ Formulaire & contact
- [x] **`CONTACT_EMAIL`** = `contact@minuitretail.fr` (contact affiché + WhatsApp) ✅
- [x] **`FORM_EMAIL`** = `contact@minuitretail.fr` : réception des demandes du
      formulaire (via repli `mailto`) ✅
- [x] **WhatsApp** : bulle flottante + numéro `+33 7 82 80 92 21` sur toutes les pages ✅
- [x] **`FORM_ENDPOINT`** = FormSubmit → envoi des leads par e-mail à
      `contact@minuitretail.fr`, sans compte ni backend, en restant sur le site ✅
- [ ] ⚠️ **(RE)ACTIVER FormSubmit pour la NOUVELLE adresse (à faire 1 fois)** :
      l'adresse de réception est passée à `contact@minuitretail.fr`. FormSubmit lie
      l'activation à une adresse précise → il faut **réactiver pour celle-ci**.
      Envoyer une **première demande test** depuis le formulaire en ligne → un e-mail
      « Confirm your email » arrive sur `contact@minuitretail.fr` → **cliquer le lien
      de confirmation**. Tant que ce n'est pas fait, les leads ne sont PAS délivrés.
      ⚠️ Prérequis : la boîte `contact@minuitretail.fr` doit exister (créée dans
      l'espace OVH, Emails) et être relevable.
- [ ] *(optionnel, anti-spam)* Une fois activé, FormSubmit fournit un **alias**
      (`formsubmit.co/ajax/xxxxxxxx`) qui masque l'adresse e-mail dans le code —
      remplacer l'adresse par cet alias dans `js/script.js` si tu veux la cacher.

## 🌐 Domaine & déploiement
- [x] **Domaine réel** : toutes les pages HTML, `sitemap.xml`, `robots.txt`, les
      JSON-LD et le snippet analytics pointent désormais vers **`minuitretail.fr`**
      (le placeholder `www.minuit-retail.fr` a été corrigé partout — c'était une
      erreur SEO : Google aurait indexé un mauvais domaine). ✅
- [ ] **Déploiement** : site statique → OVH (`404.html` + `.htaccess` gérés).

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
      « zone desservie » (arc Cap d'Agde → Monaco, sans adresse publique),
      catégorie « Fournisseur de distributeurs automatiques », photos, lien vers le site.
- [ ] **Citations / annuaires** : PagesJaunes, Kompass, annuaires nightlife/CHR.
- [ ] **Backlinks** : presse locale, partenaires, fédérations de la nuit (voir `SEO.md`).
- [x] **Domaine dans le JSON-LD** : `@id`, URLs, canonical, OG et sitemap pointent
      désormais vers `minuitretail.fr`. ✅

## ✨ Optionnel (améliorations)
- [ ] **Plaquette PDF** téléchargeable (aimant à leads « Recevoir la plaquette »).
- [ ] **Image hero responsive** (version mobile plus légère → meilleur LCP).
- [ ] Aligner les visuels produit sur le prix **25 €** s'ils sont régénérés
      (les rendus actuels affichent 18,90 € ; le modèle du site reste à 25 €).
