/**
 * Theme switcher — cycles five designs:
 *   Soft Light -> Terminal -> Bento Grid -> Smoke Glass -> Aurum -> (repeat)
 *
 * The active design is the `data-theme` attribute on <html>
 * ("light" | "dark" | "bento" | "glass" | "aurum"). An inline snippet in each page's <head>
 * restores it from localStorage BEFORE first paint (no flash). This script:
 *   - injects the toggle button into the header (one source of truth),
 *   - cycles + persists the choice on click,
 *   - shows the NEXT design's icon (so the button previews what a click does),
 *   - dispatches a window "themechange" event so the canvas effects
 *     (hero-3d.js, cursor trail in main.js) recolor live.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  // order defines the cycle; `icon` is a Bootstrap-Icons class
  var THEMES = [
    { value: "light", icon: "bi-brightness-high-fill", label: "Soft Light" },
    { value: "dark",  icon: "bi-terminal-fill",        label: "Terminal" },
    { value: "bento", icon: "bi-grid-1x2-fill",        label: "Bento Grid" },
    { value: "glass", icon: "bi-droplet-half",         label: "Smoke Glass" },
    { value: "aurum", icon: "bi-gem",                  label: "Aurum" }
  ];

  function indexOfValue(value) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].value === value) return i;
    return 0; // default -> Soft Light
  }
  function currentIndex() { return indexOfValue(root.getAttribute("data-theme")); }

  function store(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  // the button shows the NEXT design (what clicking switches to)
  function paintButton(btn) {
    var next = THEMES[(currentIndex() + 1) % THEMES.length];
    var icon = btn.querySelector("i");
    if (icon) icon.className = "bi " + next.icon;
    var label = "Switch to " + next.label + " theme";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    store(theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme } }));
  }

  function build() {
    var header = document.querySelector("#header");
    if (!header || header.querySelector(".site-theme-toggle")) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "site-theme-toggle";
    btn.appendChild(document.createElement("i"));
    paintButton(btn);

    btn.addEventListener("click", function () {
      var next = THEMES[(currentIndex() + 1) % THEMES.length];
      apply(next.value);
      paintButton(btn);
    });

    var social = header.querySelector(".social-links");
    if (social && social.parentNode === header) social.insertAdjacentElement("afterend", btn);
    else header.appendChild(btn);
  }

  if (document.readyState !== "loading") build();
  else document.addEventListener("DOMContentLoaded", build);

  // -------------------------------------------------------------
  // Scroll-reactive dock (Smoke Glass design):
  //   the nav floats at the bottom of the hero, then glides up to the
  //   top once you scroll past ~60% of the first screen. We only toggle
  //   a class on <html>; the CSS (scoped to [data-theme="glass"]) does
  //   the actual transform + transition. Passive + rAF-throttled, and a
  //   no-op in the other three themes (their CSS ignores .nav-scrolled).
  // -------------------------------------------------------------
  var ticking = false;
  function syncNav() {
    var y = window.scrollY || window.pageYOffset || 0;
    root.classList.toggle("nav-scrolled", y > window.innerHeight * 0.6);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(syncNav); }
  }, { passive: true });
  window.addEventListener("resize", syncNav, { passive: true });
  syncNav();   // set initial state (e.g. when reloaded mid-page)
})();
