/* ============================================================
   Minuit Retail — Interactions
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- Formulaire de contact ----------
     Sans backend : on ouvre le client mail du visiteur (mailto) avec un
     message pré-rempli. Remplacer par un vrai service (Formspree, API…) le
     moment venu — voir README.
  ------------------------------------------------ */
  var CONTACT_EMAIL = "contact@minuit-retail.fr"; // ← à remplacer par l'adresse réelle
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
      var nom = document.getElementById("f-nom").value.trim();
      var type = document.getElementById("f-type").value;
      var tel = document.getElementById("f-tel").value.trim();
      var email = document.getElementById("f-email").value.trim();
      var msg = document.getElementById("f-msg").value.trim();

      var body =
        "Établissement : " + etab + "\n" +
        "Contact : " + nom + "\n" +
        "Type : " + type + "\n" +
        "Téléphone : " + (tel || "—") + "\n" +
        "E-mail : " + email + "\n\n" +
        "Message :\n" + (msg || "—");

      var href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Demande de partenariat — " + etab) +
        "&body=" + encodeURIComponent(body);

      window.location.href = href;
      status.textContent = "Merci " + (etab ? "« " + etab + " »" : "") + " ! Votre logiciel de messagerie s'ouvre pour finaliser l'envoi. Nous revenons vers vous sous 48 h.";
      status.classList.add("ok");
    });
  }

  /* ---------- Barre de progression de lecture ---------- */
  var progress = document.getElementById("scroll-progress");
  if (progress) {
    var updateProgress = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
      progress.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Bouton retour en haut ---------- */
  var toTop = document.getElementById("back-to-top");
  if (toTop) {
    toTop.hidden = false;
    var toggleTop = function () {
      if (window.scrollY > 600) toTop.classList.add("show");
      else toTop.classList.remove("show");
    };
    window.addEventListener("scroll", toggleTop, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
    toggleTop();
  }

  /* ---------- CTA collant mobile ---------- */
  var stickyCta = document.getElementById("sticky-cta");
  var partSection = document.getElementById("partenariat");
  if (stickyCta) {
    var toggleSticky = function () {
      var past = window.scrollY > (window.innerHeight * 0.9);
      // masqué une fois arrivé sur la section partenariat (le formulaire est là)
      var atForm = partSection && partSection.getBoundingClientRect().top < window.innerHeight * 0.6;
      stickyCta.classList.toggle("show", past && !atForm);
    };
    window.addEventListener("scroll", toggleSticky, { passive: true });
    toggleSticky();
  }

  /* ---------- Navigation active au défilement (scroll-spy) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a[href^='#']"));
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Compteurs animés ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var prefix = (el.getAttribute("data-prefix") || "").replace(/&lt;/g, "<");
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced || isNaN(target)) { el.textContent = prefix + target + suffix; return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".stat-num[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); countObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { countObs.observe(c); });
  }

  /* ---------- Ciel étoilé du hero ---------- */
  var canvas = document.getElementById("hero-stars");
  if (canvas && !prefersReduced) {
    var ctx = canvas.getContext("2d");
    var stars = [], raf = null, W = 0, H = 0;
    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
      var count = Math.min(120, Math.round(W * H / 9000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.3 + 0.3,
          base: Math.random() * 0.5 + 0.2,
          spd: Math.random() * 0.02 + 0.005,
          ph: Math.random() * Math.PI * 2
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.ph += s.spd;
        var a = s.base + Math.sin(s.ph) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(227,206,150," + Math.max(0, a) + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    draw();
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt); rt = setTimeout(resize, 200);
    }, { passive: true });
    // met en pause hors écran pour économiser la batterie
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { if (!raf) draw(); }
        else { cancelAnimationFrame(raf); raf = null; }
      }, { threshold: 0 }).observe(canvas);
    }
  }
})();
