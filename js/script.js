/* ============================================================
   Minuit Retail — Interactions (retenue : mouvement discret)
   ============================================================ */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Année */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Header : fond au défilement */
  var header = document.querySelector(".site-header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    var close = function () { toggle.setAttribute("aria-expanded", "false"); mobileNav.hidden = true; document.body.style.overflow = ""; };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) { close(); }
      else { toggle.setAttribute("aria-expanded", "true"); mobileNav.hidden = false; document.body.style.overflow = "hidden"; }
    });
    mobileNav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
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
      outY = document.getElementById("sim-year"), outCa = document.getElementById("sim-ca");
  function updateSim() {
    var v = parseInt(range.value, 10);
    var m = redevance(v);
    outVol.textContent = v;
    outM.textContent = euro.format(Math.round(m));
    outY.textContent = euro.format(Math.round(m * 12));
    outCa.textContent = euro.format(v * PANIER);
    var pct = ((v - range.min) / (range.max - range.min)) * 100;
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
  var CONTACT_EMAIL = "contact@minuit-retail.fr";
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity()) { status.textContent = "Merci de compléter les champs obligatoires."; status.classList.add("err"); form.reportValidity(); return; }
      var g = function (id) { return (document.getElementById(id).value || "").trim(); };
      var etab = g("f-etab");
      var body = "Établissement : " + etab + "\nContact : " + g("f-nom") + "\nType : " + g("f-type")
        + "\nTéléphone : " + (g("f-tel") || "—") + "\nE-mail : " + g("f-email") + "\n\nMessage :\n" + (g("f-msg") || "—");
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Demande de partenariat — " + etab) + "&body=" + encodeURIComponent(body);
      status.textContent = "Merci — votre messagerie s'ouvre pour finaliser l'envoi. Nous revenons vers vous sous 48 h.";
      status.classList.add("ok");
    });
  }
})();
