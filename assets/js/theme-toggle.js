/**
 * Theme switcher (Soft Light  <->  Terminal / Code-IDE).
 *
 * The active theme is the `data-theme` attribute on <html> ("light" | "dark").
 * An inline snippet in each page's <head> sets it from localStorage BEFORE first
 * paint (no flash of the wrong theme). This script:
 *   - injects the toggle button into the header (one source of truth for all pages),
 *   - flips + persists the choice on click,
 *   - swaps the sun/moon icon and the a11y labels,
 *   - dispatches a window "themechange" event so the canvas effects (hero-3d.js,
 *     cursor trail in main.js) can recolor live.
 *
 * Graceful: if localStorage is unavailable the toggle still works for the session.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function store(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  // Reflect the current theme onto a button: the icon previews the NEXT theme.
  function paintButton(btn, theme) {
    var dark = theme === "dark";
    var icon = btn.querySelector("i");
    if (icon) icon.className = "bi " + (dark ? "bi-sun-fill" : "bi-moon-stars");
    var label = dark ? "Switch to light theme" : "Switch to dark theme";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.setAttribute("data-theme", "light");
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
    paintButton(btn, current());

    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      apply(next);
      paintButton(btn, next);
    });

    // place it just after the social cluster (CSS `order` keeps it left of the
    // mobile hamburger and visible when the social links are hidden)
    var social = header.querySelector(".social-links");
    if (social && social.parentNode === header) social.insertAdjacentElement("afterend", btn);
    else header.appendChild(btn);
  }

  if (document.readyState !== "loading") build();
  else document.addEventListener("DOMContentLoaded", build);
})();
