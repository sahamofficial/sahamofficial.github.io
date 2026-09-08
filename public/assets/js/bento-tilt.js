/* =============================================================
   BENTO TILT  —  pointer-reactive 3D tilt for the bento dashboard
   tiles. A clean, dashboard-appropriate replacement for the old
   spinning-sphere / pendulum 3D (which stay disabled in this theme).

   · Active ONLY while <html data-theme="bento"> — toggles itself on
     the "themechange" event dispatched by assets/js/theme-toggle.js.
   · No library. Sets `transform` with !important so it always wins
     over the [data-aos]{transform:none!important} reset in
     assets/css/theme-bento.css.
   · Skips reduced-motion users and non-hover (touch) devices.
   ============================================================= */
(function () {
  "use strict";

  var MAX_TILT = 5;       // degrees of rotation at the tile edges
  var PERSPECTIVE = 900;  // px

  var TILE_SELECTOR = [
    ".index-page main > section",          // index dashboard tiles
    ".portfolio-details .portfolio-info",  // sub-page tile-cards
    ".service-details .services-list"
  ].join(",");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  var tiles = [];
  var active = false;
  var raf = 0;
  var pending = null;

  function isBento() {
    return document.documentElement.getAttribute("data-theme") === "bento";
  }

  function shouldRun() {
    return !reduceMotion.matches && canHover.matches;
  }

  function flush() {
    raf = 0;
    if (!pending) return;
    var el = pending.el;
    var x = pending.x;
    var y = pending.y;
    pending = null;

    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;

    var px = (x - r.left) / r.width;   // 0..1 across the tile
    var py = (y - r.top) / r.height;   // 0..1 down the tile
    var ry = (px - 0.5) * 2 * MAX_TILT; // turn left/right with the cursor
    var rx = (0.5 - py) * 2 * MAX_TILT; // tip up/down with the cursor

    el.style.setProperty(
      "transform",
      "perspective(" + PERSPECTIVE + "px) rotateX(" + rx.toFixed(2) +
        "deg) rotateY(" + ry.toFixed(2) + "deg)",
      "important"
    );
  }

  function onMove(e) {
    pending = { el: e.currentTarget, x: e.clientX, y: e.clientY };
    if (!raf) raf = window.requestAnimationFrame(flush);
  }

  function onLeave(e) {
    e.currentTarget.style.removeProperty("transform");
  }

  function attach() {
    if (active || !shouldRun()) return;
    tiles = Array.prototype.slice.call(document.querySelectorAll(TILE_SELECTOR));
    tiles.forEach(function (el) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    });
    active = tiles.length > 0;
  }

  function detach() {
    if (!active) return;
    tiles.forEach(function (el) {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.removeProperty("transform");
    });
    tiles = [];
    active = false;
    pending = null;
  }

  function sync() {
    if (isBento()) attach();
    else detach();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sync);
  } else {
    sync();
  }

  // Re-evaluate when the theme is switched, or when the user toggles
  // their OS reduced-motion / pointer capabilities at runtime.
  window.addEventListener("themechange", sync);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", sync);
  if (canHover.addEventListener) canHover.addEventListener("change", sync);
})();
