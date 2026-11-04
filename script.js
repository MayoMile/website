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

  /* Active nav link while scrolling */
  var navLinks = primaryNav ? primaryNav.querySelectorAll('a[href^="#"]:not(.btn)') : [];
  if (navLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var link = linkFor[entry.target.id];
        if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(linkFor).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* Contact form -> mailto */
  var form = document.getElementById("contactForm");

  /* Inquiry type: owner-operator application (default) or dispatching */
  var INQUIRY = {
    application: {
      to: "apply@mayomile.com",
      button: "Send Application",
      note: "This opens your email app with your details filled in — hit send there to reach our team at apply@mayomile.com."
    },
    dispatching: {
      to: "info@mayomile.com",
      button: "Send Dispatching Inquiry",
      note: "This opens your email app with your details filled in — hit send there to reach our team at info@mayomile.com."
    }
  };
  var inquirySelect = document.getElementById("fInquiry");
  var trucksRow = document.getElementById("trucksRow");
  var submitBtn = document.getElementById("formSubmit");
  var formNote = document.getElementById("formNote");

  function setInquiry(type) {
    if (!INQUIRY[type]) type = "application";
    if (inquirySelect) inquirySelect.value = type;
    if (trucksRow) trucksRow.hidden = type !== "dispatching";
    if (submitBtn) submitBtn.textContent = INQUIRY[type].button;
    if (formNote) formNote.textContent = INQUIRY[type].note;
  }

  if (inquirySelect) {
    inquirySelect.addEventListener("change", function () { setInquiry(inquirySelect.value); });
    setInquiry(inquirySelect.value);
  }

  /* "Inquire About Dispatching" (and any data-inquiry link) preselects the form */
  document.querySelectorAll("[data-inquiry]").forEach(function (link) {
    link.addEventListener("click", function () {
      setInquiry(link.getAttribute("data-inquiry"));
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var cdl = form.cdl.value;
      var experience = form.experience.value;

      if (inquirySelect && inquirySelect.value === "dispatching") {
        var trucks = form.trucks ? form.trucks.value.trim() : "";
        var dSubject = "Dispatching Services Inquiry - " + name;
        var dBody = [
          "Inquiry: Dispatching Services ($99/week/truck)",
          "Name: " + name,
          "Phone: " + phone,
          "Email: " + email,
          "Number of trucks: " + (trucks || "Not provided"),
          "CDL Class: " + cdl,
          "OTR Experience: " + experience
        ].join("\n");
        window.location.href = "mailto:" + INQUIRY.dispatching.to +
          "?subject=" + encodeURIComponent(dSubject) +
          "&body=" + encodeURIComponent(dBody);
        return;
      }

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
