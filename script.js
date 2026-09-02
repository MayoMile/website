(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  function closeNav() {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* Pay calculator */
  var BASE_PAY = 1700;
  var BASE_MILE_THRESHOLD = 2300;
  var OVERAGE_RATE = 0.67;

  var slider = document.getElementById("milesSlider");
  var milesValueEl = document.getElementById("milesValue");
  var overageMilesEl = document.getElementById("overageMiles");
  var weeklyTotalEl = document.getElementById("weeklyTotal");
  var annualTotalEl = document.getElementById("annualTotal");

  function fmtCurrency(n) {
    return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateCalculator() {
    if (!slider) return;
    var miles = parseInt(slider.value, 10);
    var overageMiles = Math.max(0, miles - BASE_MILE_THRESHOLD);
    var overagePay = overageMiles * OVERAGE_RATE;
    var weeklyTotal = BASE_PAY + overagePay;
    var annualTotal = weeklyTotal * 52;

    milesValueEl.textContent = miles.toLocaleString("en-US") + " mi";
    overageMilesEl.textContent = overageMiles.toLocaleString("en-US") + " mi";
    weeklyTotalEl.textContent = fmtCurrency(weeklyTotal);
    annualTotalEl.textContent = fmtCurrency(annualTotal);
  }

  if (slider) {
    slider.addEventListener("input", updateCalculator);
    updateCalculator();
  }

  /* Contact form -> mailto */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var cdl = form.cdl.value;
      var experience = form.experience.value;

      var subject = "Owner-Operator Application - " + name;
      var body = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        "CDL Class: " + cdl,
        "OTR Experience: " + experience
      ].join("\n");

      var mailto = "mailto:apply@mayomile.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
