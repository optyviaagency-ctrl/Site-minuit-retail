/* ============================================================
   Minuit Retail — Interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Année dans le footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- État du header au défilement ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
      mobileNav.hidden = true;
    }
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) { closeNav(); }
      else {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fermer le menu");
        mobileNav.hidden = false;
      }
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Simulateur de redevance ----------
     Barème par tranches (chaque taux sur sa tranche uniquement) :
       1 – 100      : 10 %
       101 – 180    : 12 %
       181 – 260    : 15 %
       261 et +     : 20 %
     Panier moyen : 25 € TTC.
  ------------------------------------------------ */
  var PANIER = 25;
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function redevanceMensuelle(ventes) {
    var t1 = clamp(ventes, 0, 100);
    var t2 = clamp(ventes - 100, 0, 80);
    var t3 = clamp(ventes - 180, 0, 80);
    var t4 = Math.max(ventes - 260, 0);
    return (t1 * PANIER * 0.10) +
           (t2 * PANIER * 0.12) +
           (t3 * PANIER * 0.15) +
           (t4 * PANIER * 0.20);
  }

  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  var range = document.getElementById("sim-range");
  var outVol = document.getElementById("sim-vol");
  var outMonth = document.getElementById("sim-month");
  var outYear = document.getElementById("sim-year");
  var outCa = document.getElementById("sim-ca");

  function updateSim() {
    var ventes = parseInt(range.value, 10);
    var mois = redevanceMensuelle(ventes);
    var ca = ventes * PANIER;
    outVol.textContent = ventes;
    outMonth.textContent = euro.format(Math.round(mois));
    outYear.textContent = euro.format(Math.round(mois * 12));
    outCa.textContent = euro.format(ca) + " / mois";
    var pct = ((ventes - range.min) / (range.max - range.min)) * 100;
    range.style.background = "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) " + pct + "%, var(--line) " + pct + "%)";
  }
  if (range) {
    range.addEventListener("input", updateSim);
    updateSim();
  }

  /* ---------- Formulaire de contact (démo front) ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity()) {
        status.textContent = "Merci de compléter les champs obligatoires.";
        status.classList.add("err");
        form.reportValidity();
        return;
      }
      var etab = document.getElementById("f-etab").value.trim();
      status.textContent = "Merci " + (etab ? "« " + etab + " »" : "") + " ! Votre demande a bien été enregistrée. Nous revenons vers vous sous 48 h.";
      status.classList.add("ok");
      form.reset();
      if (range) updateSim();
    });
  }
})();
