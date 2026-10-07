/* ============================================================
   John Angelo Vasquez — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Active nav highlighting ---------- */
  var navAnchors = document.querySelectorAll(".nav-links a");
  var sections = Array.prototype.slice
    .call(navAnchors)
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var secIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            navAnchors.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { secIO.observe(s); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Hover-to-play project videos ---------- */
  document.querySelectorAll(".video-tile").forEach(function (tile) {
    var video = tile.querySelector("video");
    if (!video) return;
    function play() {
      if (prefersReduced) return;
      var p = video.play();
      if (p) p.catch(function () {});
      tile.classList.add("playing");
    }
    function stop() {
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
      tile.classList.remove("playing");
    }
    tile.addEventListener("mouseenter", play);
    tile.addEventListener("mouseleave", stop);
    tile.addEventListener("click", function () {
      if (tile.classList.contains("playing")) stop(); else play();
    });
  });

  /* ---------- Collapsible ads gallery ---------- */
  var adsToggle = document.getElementById("adsToggle");
  var adsCollapse = document.getElementById("adsCollapse");
  if (adsToggle && adsCollapse) {
    var adsLabel = adsToggle.querySelector(".ads-toggle-text");
    adsToggle.addEventListener("click", function () {
      var open = adsCollapse.classList.toggle("open");
      adsToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (adsLabel) adsLabel.textContent = open ? "Show less" : "Show all 16 designs";
    });
  }

  /* ---------- Live GitHub stats (real data, graceful fallback) ---------- */
  function setStat(key, value) {
    document.querySelectorAll('[data-github="' + key + '"]').forEach(function (el) {
      var suffix = el.getAttribute("data-suffix") || "";
      el.textContent = value + suffix;
    });
  }

  fetch("https://api.github.com/users/gegelo070903")
    .then(function (res) { if (!res.ok) throw new Error("GitHub API " + res.status); return res.json(); })
    .then(function (data) {
      if (typeof data.public_repos === "number") setStat("public_repos", data.public_repos);
      if (typeof data.followers === "number") setStat("followers", data.followers);
    })
    .catch(function () {
      /* Keep the static fallback values already in the markup. */
    });
})();
