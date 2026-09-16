/* ============================================================
   Minuit Retail — Interactions (retenue : mouvement discret)
   ============================================================ */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Formulaire de contact ---------------------------------------------
     FORM_ENDPOINT : URL du service de formulaire (ex. Formspree/Basin/Typeform
     workflow) qui redirige les demandes vers l'adresse e-mail de votre choix.
     Laissez vide pour le repli « mailto » (ouverture du client mail).
     Renseignez-le quand l'adresse de réception sera définie — voir README.  */
  // Endpoint FormSubmit : envoie chaque demande par e-mail à l'adresse ci-dessous,
  // sans compte ni backend. La 1re demande déclenche un e-mail d'activation à
  // valider une seule fois (voir LANCEMENT.md).
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/contact@minuitretail.fr";
  var CONTACT_EMAIL = "contact@minuitretail.fr";  // contact général (affiché, replis)
  var FORM_EMAIL = "contact@minuitretail.fr";   // réception des demandes du formulaire

  /* Année */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Retour en haut de page propre (logo / liens #top) — sans laisser #top dans l'URL */
  var goTop = function () { window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }); };
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      goTop();
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
  });
  if (location.hash === "#top") {
    window.scrollTo(0, 0);
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
  }

  /* Header : fond au défilement */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    var close = function () { toggle.setAttribute("aria-expanded", "false"); mobileNav.hidden = true; document.body.style.overflow = ""; };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) { close(); }
      else {
        toggle.setAttribute("aria-expanded", "true"); mobileNav.hidden = false; document.body.style.overflow = "hidden";
        var first = mobileNav.querySelector("a"); if (first) first.focus();
      }
    });
    mobileNav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    // Piégeage du focus dans l'overlay
    mobileNav.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var items = mobileNav.querySelectorAll("a");
      var f = items[0], l = items[items.length - 1];
      if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
      else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
    });
    // Fermer par la touche Échap
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { close(); toggle.focus(); }
    });
    // Fermer si l'on repasse en desktop (le bouton de fermeture y est masqué)
    var desktopMq = window.matchMedia("(min-width: 861px)");
    var onMq = function () { if (desktopMq.matches && toggle.getAttribute("aria-expanded") === "true") close(); };
    desktopMq.addEventListener ? desktopMq.addEventListener("change", onMq) : desktopMq.addListener(onMq);
  }

  /* Révélations discrètes */
  var reveals = document.querySelectorAll(".reveal, .reveal-img");
  if ("IntersectionObserver" in window && reveals.length && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Navigation active au défilement */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a[href^='#']"));
  var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-46% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* Simulateur de redevance (barème par tranches, panier 25 €) */
  var PANIER = 25;
  function clamp(v, a, z) { return Math.max(a, Math.min(z, v)); }
  function redevance(v) {
    return clamp(v, 0, 100) * PANIER * 0.10
         + clamp(v - 100, 0, 80) * PANIER * 0.12
         + clamp(v - 180, 0, 80) * PANIER * 0.15
         + Math.max(v - 260, 0) * PANIER * 0.20;
  }
  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var range = document.getElementById("sim-range");
  var outVol = document.getElementById("sim-vol"), outM = document.getElementById("sim-month"),
      outY = document.getElementById("sim-year");
  var SOIREES_MOIS = 13; // ≈ 3 soirs / semaine → 156 soirées / an
  function updateSim() {
    var vSoir = parseInt(range.value, 10);
    var m = redevance(vSoir * SOIREES_MOIS); // barème appliqué au volume mensuel
    outVol.textContent = vSoir;
    outM.textContent = euro.format(Math.round(m));
    outY.textContent = euro.format(Math.round(m * 12));
    var pct = ((vSoir - range.min) / (range.max - range.min)) * 100;
    range.style.background = "linear-gradient(90deg, var(--gold) " + pct + "%, var(--line-2) " + pct + "%)";
  }
  if (range) { range.addEventListener("input", updateSim); updateSim(); }

  /* FAQ : ouverture exclusive */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) faqItems.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* Formulaire de contact — mailto (sans backend, voir README) */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  // Rend le message d'état impossible à manquer : on le fait défiler au centre
  // de l'écran et on lui donne le focus (lecteurs d'écran + repère visuel).
  function showStatus(cls, msg) {
    status.className = "form-status " + cls;
    status.textContent = msg;
    if (cls === "ok" || cls === "err") {
      try { status.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { status.scrollIntoView(); }
      status.setAttribute("tabindex", "-1");
      try { status.focus({ preventScroll: true }); } catch (e) {}
    }
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity()) { showStatus("err", "Merci de compléter les champs obligatoires (établissement, contact, e-mail)."); form.reportValidity(); return; }
      var g = function (id) { return (document.getElementById(id).value || "").trim(); };
      var sel = document.getElementById("f-type");
      var typeLabel = sel ? sel.options[sel.selectedIndex].text : g("f-type");
      var etab = g("f-etab");
      var btn = form.querySelector("button[type=submit]");

      // 1) Envoi via service de formulaire (silencieux, fiable) si configuré
      if (FORM_ENDPOINT) {
        showStatus("pending", "Envoi en cours…");
        if (btn) { btn.disabled = true; btn.classList.add("is-loading"); }
        var payload = new FormData(form);
        payload.append("type_label", typeLabel);
        payload.append("_subject", "Nouveau lead Minuit Retail — " + etab);
        payload.append("_template", "table");
        payload.append("_captcha", "false");
        fetch(FORM_ENDPOINT, { method: "POST", body: payload, headers: { "Accept": "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); })
          .then(function () {
            form.reset(); if (btn) { btn.disabled = false; btn.classList.remove("is-loading"); }
            showStatus("ok", "Merci « " + etab + " » — votre demande a bien été envoyée. Nous revenons vers vous sous 48 h, par e-mail ou par téléphone.");
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.classList.remove("is-loading"); }
            showStatus("err", "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à " + CONTACT_EMAIL + ".");
          });
        return;
      }

      // 2) Repli sans backend : ouverture du client mail
      var body = "Établissement : " + etab + "\nContact : " + g("f-nom") + "\nType : " + typeLabel
        + "\nTéléphone : " + (g("f-tel") || "—") + "\nE-mail : " + g("f-email") + "\n\nMessage :\n" + (g("f-msg") || "—");
      window.location.href = "mailto:" + FORM_EMAIL + "?subject=" + encodeURIComponent("Demande de partenariat — " + etab) + "&body=" + encodeURIComponent(body);
      showStatus("ok", "Merci — votre messagerie s'ouvre pour finaliser l'envoi. Nous revenons vers vous sous 48 h.");
    });
  }

  /* ============================================================
     Interactions premium (esprit « bibliothèque UI » — fait main)
     Toutes désactivées si l'utilisateur préfère moins d'animation.
     ============================================================ */
  if (!prefersReduced) {

    /* 0) Révélations en cascade : décalage progressif entre frères .reveal */
    var seenParents = [];
    document.querySelectorAll(".reveal").forEach(function (el) {
      var p = el.parentNode;
      if (seenParents.indexOf(p) !== -1) return;
      seenParents.push(p);
      var sibs = Array.prototype.filter.call(p.children, function (c) {
        return c.classList && c.classList.contains("reveal");
      });
      if (sibs.length > 1) sibs.forEach(function (s, i) { s.style.setProperty("--i", Math.min(i, 6)); });
    });

    /* 1) Barre de progression de lecture */
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    function drawProgress() {
      var st = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, st / h) : 0;
      bar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(drawProgress); }
    }, { passive: true });
    drawProgress();

    /* 2) Compteurs animés (chiffres des revenus) */
    var nf = new Intl.NumberFormat("fr-FR");
    function countUp(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var dur = 1100, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - k, 3); // easeOutCubic
        el.textContent = nf.format(Math.round(target * eased));
        if (k < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll(".count[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }

    /* 3) Spotlight au curseur sur les cartes */
    var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      document.querySelectorAll(".trust-item, .bene, .key").forEach(function (card) {
        card.classList.add("spotlight");
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", (e.clientX - r.left) + "px");
          card.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
      });

      /* 4) CTA principal : micro-aimantation vers le curseur */
      document.querySelectorAll(".cta-solid").forEach(function (btn) {
        var maxPull = 6;
        btn.addEventListener("pointermove", function (e) {
          var r = btn.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          btn.style.transform = "translate(" + (dx * maxPull).toFixed(1) + "px," + (dy * maxPull).toFixed(1) + "px)";
        });
        btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
      });
    }
  }
})();
