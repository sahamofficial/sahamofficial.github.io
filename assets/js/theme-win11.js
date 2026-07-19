/**
 * Windows 11 Desktop theme — desktop shell + window manager.
 * ==========================================================
 * The NINTH design (see assets/js/theme-toggle.js). When data-theme="win11" the
 * whole index page becomes a Windows-11-style desktop:
 *   · a full-screen wallpaper + a centred taskbar,
 *   · each portfolio section opens as a draggable desktop WINDOW
 *     (drag / focus / minimise / maximise / close, several at once),
 *   · Contact opens as a Notepad ".txt" window, Portfolio as a Photos
 *     gallery, About as a Settings page (About / Skills / Stats), Resume
 *     as a document viewer; the rest use generic Win11 window chrome,
 *   · the Start (Windows) button cycles to the NEXT theme (it IS the switch),
 *   · desktop icons, a live tray clock, a right-click context menu and a
 *     one-time boot splash.
 *
 * Design mirrors bento-tilt.js: an idempotent build()/destroy() pair driven by
 * the "themechange" event. It MOVES the real <section> nodes into the windows
 * (never clones) so the contact-form handler, Isotope, GLightbox, Typed.js and
 * PureCounter all keep working untouched, then restores them in original order
 * when you leave the theme. All visual styling lives in assets/css/theme-win11.css.
 *
 * No Microsoft assets are used — the wallpaper, Start glyph and icons are
 * original CSS gradients / inline SVG / Bootstrap Icons.
 */
(function () {
  "use strict";

  var root = document.documentElement;

  // Only the index page carries the full section set; sub-pages just get the
  // wallpaper background from CSS and this controller no-ops.
  function isIndex() {
    return document.body && document.body.classList.contains("index-page") &&
      document.getElementById("hero");
  }
  function isWin11() { return root.getAttribute("data-theme") === "win11"; }
  var mqMobile = window.matchMedia("(max-width: 768px)");
  var mqCoarse = window.matchMedia("(pointer: coarse)");
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  function isMobile() { return mqMobile.matches; }

  // ---- app registry -------------------------------------------------------
  // `sections` are section IDs moved into this window (first is primary).
  // `label` = taskbar/desktop-icon text; `title` = window title-bar text.
  var APPS = [
    { id: "home",      label: "Home",      title: "Home",                        icon: "bi-house-door-fill",        skin: "generic",  sections: ["hero"] },
    { id: "about",     label: "About Me",  title: "About Me — Settings",         icon: "bi-person-badge-fill",      skin: "settings", sections: ["about", "skills", "stats"] },
    { id: "resume",    label: "Resume",    title: "Resume.docx",                 icon: "bi-file-earmark-text-fill", skin: "doc",      sections: ["resume"] },
    { id: "portfolio", label: "Portfolio", title: "Portfolio — Photos",          icon: "bi-images",                 skin: "photos",   sections: ["portfolio"] },
    { id: "services",  label: "Services",  title: "Services — Store",            icon: "bi-bag-fill",               skin: "store",    sections: ["services"] },
    { id: "contact",   label: "Contact",   title: "Contact.txt — Notepad",       icon: "bi-file-text",              skin: "notepad",  sections: ["contact"] }
  ];
  // Settings rail: which sub-section each rail button reveals.
  var SETTINGS_PAGES = [
    { section: "about",  label: "About Me", icon: "bi-person" },
    { section: "skills", label: "Skills",   icon: "bi-stars" },
    { section: "stats",  label: "Stats",    icon: "bi-graph-up" }
  ];
  // Default window sizes per skin (clamped to viewport at open time).
  var SIZES = {
    generic:  { w: 640, h: 520 },
    settings: { w: 820, h: 560 },
    doc:      { w: 720, h: 640 },
    photos:   { w: 860, h: 620 },
    store:    { w: 640, h: 560 },
    notepad:  { w: 580, h: 560 }
  };

  function appById(id) { for (var i = 0; i < APPS.length; i++) if (APPS[i].id === id) return APPS[i]; return null; }
  function appForSection(secId) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].sections.indexOf(secId) !== -1) return APPS[i];
    return null;
  }
  function hashToApp(hash) {
    if (!hash || hash === "#") return null;
    return appForSection(hash.slice(1));
  }

  // ---- state --------------------------------------------------------------
  var built = false;
  var bootShown = false;              // boot splash only once per page load
  var wins = {};                       // id -> WinState
  var placeholders = {};               // sectionId -> comment marker in <main>
  var zTop = 20;
  var clockTimer = null;
  var listeners = [];                  // {t,ev,fn,opts} added in build, removed in destroy
  var desktopEl = null;

  function on(t, ev, fn, opts) { t.addEventListener(ev, fn, opts); listeners.push({ t: t, ev: ev, fn: fn, opts: opts }); }
  function offAll() { listeners.forEach(function (l) { l.t.removeEventListener(l.ev, l.fn, l.opts); }); listeners = []; }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function iconBtn(cls, biIcon, label) {
    var b = el("button", cls, '<i class="bi ' + biIcon + '"></i>');
    b.type = "button";
    if (label) { b.setAttribute("aria-label", label); b.title = label; }
    return b;
  }

  // =========================================================================
  // BUILD
  // =========================================================================
  function build() {
    if (built || !isIndex()) return;
    built = true;

    desktopEl = el("div", "w11-desktop");
    desktopEl.innerHTML =
      '<div class="w11-wallpaper" aria-hidden="true"></div>' +
      '<div class="w11-icons" role="list"></div>' +
      '<div class="w11-windows"></div>' +
      '<nav class="w11-taskbar" aria-label="Taskbar">' +
        '<div class="w11-taskbar__center"></div>' +
        '<div class="w11-tray">' +
          '<i class="bi bi-wifi" aria-hidden="true"></i>' +
          '<i class="bi bi-volume-up" aria-hidden="true"></i>' +
          '<i class="bi bi-battery-full" aria-hidden="true"></i>' +
          '<button type="button" class="w11-tray__clock" aria-label="Date and time">' +
            '<span class="w11-clock-time">--:--</span><span class="w11-clock-date"></span>' +
          '</button>' +
        '</div>' +
      '</nav>';
    document.body.appendChild(desktopEl);

    var winLayer = desktopEl.querySelector(".w11-windows");
    var center = desktopEl.querySelector(".w11-taskbar__center");
    var iconLayer = desktopEl.querySelector(".w11-icons");

    // Start button = theme switch (the Windows logo).
    var startBtn = el("button", "w11-start", '<span class="w11-start__logo" aria-hidden="true"></span>');
    startBtn.type = "button";
    startBtn.setAttribute("aria-label", "Start");
    startBtn.title = "Shut Down Windows";
    on(startBtn, "click", openShutdownDialog);
    center.appendChild(startBtn);

    // Park sections into windows + build taskbar buttons + desktop icons.
    APPS.forEach(function (app, i) {
      buildWindow(app, winLayer);

      var task = el("button", "w11-taskitem", '<i class="bi ' + app.icon + '"></i>');
      task.type = "button";
      task.setAttribute("data-app", app.id);
      task.setAttribute("aria-label", app.label);
      task.title = app.label;
      on(task, "click", function () { onTaskClick(app.id); });
      center.appendChild(task);
      wins[app.id].taskBtn = task;

      var icon = el("button", "w11-icon", '<span class="w11-icon__img"><i class="bi ' + app.icon + '"></i></span>' +
        '<span class="w11-icon__label">' + app.label + '</span>');
      icon.type = "button";
      icon.setAttribute("data-app", app.id);
      icon.setAttribute("role", "listitem");
      // Desktop: double-click opens; touch: single tap opens.
      on(icon, "dblclick", function () { openWindow(app.id); });
      on(icon, "click", function () {
        selectIcon(icon);
        if (mqCoarse.matches) openWindow(app.id);
      });
      iconLayer.appendChild(icon);
    });

    // Titlebar controls + drag + focus (delegated on the windows layer).
    on(winLayer, "click", onWindowLayerClick);
    on(winLayer, "pointerdown", onWindowLayerPointerDown, true);

    // Route in-page anchor clicks (nav links, hero buttons) to window opens.
    on(document, "click", onAnchorClick, true);

    // Right-click context menu on the desktop.
    on(desktopEl, "contextmenu", onContextMenu);
    on(document, "pointerdown", onDocPointerDown, true);
    on(document, "keydown", onKeydown);

    // Re-evaluate mobile maximise behaviour on breakpoint change.
    on(mqMobile, "change", onBreakpoint);

    startClock();

    // Boot splash (once per page load, skipped for reduced motion).
    if (!bootShown && !mqReduce.matches) {
      bootShown = true;
      var boot = el("div", "w11-boot",
        '<span class="w11-boot__logo" aria-hidden="true"></span>' +
        '<span class="w11-boot__spinner" aria-hidden="true"></span>' +
        '<span class="w11-boot__name">Saham Ali</span>');
      desktopEl.appendChild(boot);
      setTimeout(function () { boot.classList.add("is-hiding"); }, 1500);
      setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 2200);
    } else {
      bootShown = true;
    }

    // Open Home so the desktop isn't empty.
    openWindow("home");
  }

  // Build one window frame and move its section(s) into it.
  function buildWindow(app, winLayer) {
    var frame = el("div", "w11-window w11-app--" + app.skin);
    frame.setAttribute("data-win", app.id);
    frame.style.display = "none";
    frame.setAttribute("role", "dialog");
    frame.setAttribute("aria-label", app.title);

    var bar = el("div", "w11-window__titlebar",
      '<span class="w11-window__title"><i class="bi ' + app.icon + '"></i><span>' + app.title + '</span></span>');
    var controls = el("div", "w11-window__controls");
    controls.appendChild(iconBtn("w11-wbtn w11-wbtn--min", "bi-dash-lg", "Minimize"));
    controls.appendChild(iconBtn("w11-wbtn w11-wbtn--max", "bi-square", "Maximize"));
    controls.appendChild(iconBtn("w11-wbtn w11-wbtn--close", "bi-x-lg", "Close"));
    bar.appendChild(controls);
    frame.appendChild(bar);

    var body = el("div", "w11-window__body");
    frame.appendChild(body);
    winLayer.appendChild(frame);

    // ---- move the real section node(s) into the body -----------------------
    if (app.skin === "notepad") {
      var np = el("div", "w11-notepad");
      np.appendChild(el("div", "w11-notepad__menu",
        "<span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>"));
      var npBody = el("div", "w11-notepad__body");
      np.appendChild(npBody);
      body.appendChild(np);
      parkSection(app.sections[0], npBody);
    } else if (app.skin === "settings") {
      var wrap = el("div", "w11-settings");
      var rail = el("nav", "w11-settings__rail");
      var pane = el("div", "w11-settings__pane");
      SETTINGS_PAGES.forEach(function (pg, idx) {
        var b = el("button", "w11-settings__navitem" + (idx === 0 ? " is-active" : ""),
          '<i class="bi ' + pg.icon + '"></i><span>' + pg.label + '</span>');
        b.type = "button";
        b.setAttribute("data-target", pg.section);
        rail.appendChild(b);
      });
      wrap.appendChild(rail);
      wrap.appendChild(pane);
      body.appendChild(wrap);
      app.sections.forEach(function (secId, idx) {
        parkSection(secId, pane);
        var sec = document.getElementById(secId);
        if (sec) sec.classList.toggle("w11-pane-active", idx === 0);
      });
      on(rail, "click", function (e) {
        var b = e.target.closest(".w11-settings__navitem");
        if (!b) return;
        rail.querySelectorAll(".w11-settings__navitem").forEach(function (n) { n.classList.remove("is-active"); });
        b.classList.add("is-active");
        var target = b.getAttribute("data-target");
        app.sections.forEach(function (secId) {
          var sec = document.getElementById(secId);
          if (sec) sec.classList.toggle("w11-pane-active", secId === target);
        });
      });
    } else {
      app.sections.forEach(function (secId) { parkSection(secId, body); });
    }

    wins[app.id] = {
      id: app.id, app: app, frame: frame, body: body, taskBtn: null,
      state: "closed", rect: null, prevRect: null
    };
  }

  // Move a live <section> into `dest`, leaving a comment placeholder in <main>.
  function parkSection(secId, dest) {
    var sec = document.getElementById(secId);
    if (!sec) return;
    var ph = document.createComment("win11:" + secId);
    sec.parentNode.insertBefore(ph, sec);
    placeholders[secId] = ph;
    dest.appendChild(sec);
  }

  // =========================================================================
  // WINDOW MANAGER
  // =========================================================================
  function firstRect(w) {
    var app = w.app;
    var size = SIZES[app.skin] || SIZES.generic;
    var vw = window.innerWidth, vh = window.innerHeight;
    var width = Math.min(size.w, vw - 40);
    var height = Math.min(size.h, vh - 96);       // leave room for taskbar
    var idx = APPS.indexOf(app);
    var x = Math.min(112 + idx * 34, Math.max(20, vw - width - 20));   // clear the desktop-icon column
    var y = Math.min(40 + idx * 30, Math.max(20, vh - height - 80));
    return { x: x, y: y, w: width, h: height };
  }

  function applyRect(w) {
    if (w.frame.classList.contains("is-max") || !w.rect) return;
    w.frame.style.left = w.rect.x + "px";
    w.frame.style.top = w.rect.y + "px";
    w.frame.style.width = w.rect.w + "px";
    w.frame.style.height = w.rect.h + "px";
  }

  function openWindow(id) {
    var w = wins[id];
    if (!w) return;
    if (w.state === "open") { focusWindow(id); return; }   // already open -> just focus
    if (!w.rect) w.rect = firstRect(w);
    w.frame.style.display = "";
    w.frame.classList.remove("is-min");
    w.state = "open";
    applyRect(w);
    if (isMobile()) setMax(w, true);
    focusWindow(id);
    syncTask(id);
    if (id === "portfolio") relayoutPortfolio();
  }

  function focusWindow(id) {
    var w = wins[id];
    if (!w) return;
    Object.keys(wins).forEach(function (k) {
      wins[k].frame.classList.toggle("is-active", k === id);
      if (wins[k].taskBtn) wins[k].taskBtn.classList.toggle("is-active", k === id && wins[k].state === "open");
    });
    w.frame.style.zIndex = String(++zTop);
  }

  function minimizeWindow(id) {
    var w = wins[id];
    if (!w || w.state === "closed") return;
    w.frame.classList.add("is-min");
    w.state = "min";
    if (w.taskBtn) w.taskBtn.classList.remove("is-active");
    syncTask(id);
    focusTopmost();
  }

  function setMax(w, want) {
    if (want) {
      if (!w.frame.classList.contains("is-max")) w.prevRect = w.rect ? { x: w.rect.x, y: w.rect.y, w: w.rect.w, h: w.rect.h } : null;
      w.frame.classList.add("is-max");
      w.frame.style.left = w.frame.style.top = w.frame.style.width = w.frame.style.height = "";
      var maxIcon = w.frame.querySelector(".w11-wbtn--max i");
      if (maxIcon) maxIcon.className = "bi bi-window-stack";
    } else {
      w.frame.classList.remove("is-max");
      if (w.prevRect) w.rect = w.prevRect;
      applyRect(w);
      var mi = w.frame.querySelector(".w11-wbtn--max i");
      if (mi) mi.className = "bi bi-square";
    }
  }

  function toggleMax(id) {
    var w = wins[id];
    if (!w) return;
    setMax(w, !w.frame.classList.contains("is-max"));
    if (id === "portfolio") relayoutPortfolio();
  }

  function closeWindow(id) {
    var w = wins[id];
    if (!w) return;
    w.frame.style.display = "none";
    w.frame.classList.remove("is-active");
    w.state = "closed";                 // section stays parked inside the frame
    syncTask(id);
    focusTopmost();
  }

  function syncTask(id) {
    var w = wins[id];
    if (!w || !w.taskBtn) return;
    w.taskBtn.classList.toggle("is-running", w.state === "open" || w.state === "min");
    w.taskBtn.classList.toggle("is-active", w.state === "open" && w.frame.classList.contains("is-active"));
  }

  function focusTopmost() {
    var top = null, topZ = -1;
    Object.keys(wins).forEach(function (k) {
      var w = wins[k];
      if (w.state === "open") { var z = parseInt(w.frame.style.zIndex || "0", 10); if (z >= topZ) { topZ = z; top = k; } }
    });
    if (top) focusWindow(top); else Object.keys(wins).forEach(function (k) { if (wins[k].taskBtn) wins[k].taskBtn.classList.remove("is-active"); });
  }

  // taskbar click: closed->open, open&focused->minimise, else focus/restore
  function onTaskClick(id) {
    var w = wins[id];
    if (!w) return;
    if (w.state === "closed") { openWindow(id); return; }
    if (w.state === "min") { w.frame.classList.remove("is-min"); w.state = "open"; focusWindow(id); syncTask(id); if (id === "portfolio") relayoutPortfolio(); return; }
    // open:
    if (w.frame.classList.contains("is-active")) minimizeWindow(id);
    else focusWindow(id);
  }

  function onWindowLayerClick(e) {
    var btn = e.target.closest(".w11-wbtn");
    if (!btn) return;
    var frame = btn.closest(".w11-window");
    if (!frame) return;
    var id = frame.getAttribute("data-win");
    if (btn.classList.contains("w11-wbtn--min")) minimizeWindow(id);
    else if (btn.classList.contains("w11-wbtn--max")) toggleMax(id);
    else if (btn.classList.contains("w11-wbtn--close")) closeWindow(id);
  }

  // ---- drag + focus-on-press ----------------------------------------------
  var drag = null;
  function onWindowLayerPointerDown(e) {
    var frame = e.target.closest(".w11-window");
    if (!frame) return;
    focusWindow(frame.getAttribute("data-win"));            // click-to-front
    var bar = e.target.closest(".w11-window__titlebar");
    if (!bar || e.target.closest(".w11-wbtn")) return;       // only the bar drags
    if (isMobile() || frame.classList.contains("is-max")) return;
    var id = frame.getAttribute("data-win");
    var w = wins[id];
    if (!w.rect) w.rect = firstRect(w);
    drag = { id: id, w: w, sx: e.clientX, sy: e.clientY, ox: w.rect.x, oy: w.rect.y };
    frame.classList.add("is-dragging");
    bar.setPointerCapture(e.pointerId);
    on(bar, "pointermove", onDragMove);
    on(bar, "pointerup", onDragEnd);
    on(bar, "pointercancel", onDragEnd);
  }
  function onDragMove(e) {
    if (!drag) return;
    var vw = window.innerWidth, vh = window.innerHeight;
    var nx = drag.ox + (e.clientX - drag.sx);
    var ny = drag.oy + (e.clientY - drag.sy);
    nx = Math.max(-(drag.w.rect.w - 90), Math.min(nx, vw - 90));   // keep title grabbable
    ny = Math.max(0, Math.min(ny, vh - 88));
    drag.w.rect.x = nx; drag.w.rect.y = ny;
    drag.w.frame.style.left = nx + "px";
    drag.w.frame.style.top = ny + "px";
  }
  function onDragEnd() {
    if (!drag) return;
    drag.w.frame.classList.remove("is-dragging");
    var id = drag.id;
    drag = null;
    if (id === "portfolio") relayoutPortfolio();
  }

  // ---- in-page anchors (nav links + hero buttons) --------------------------
  function onAnchorClick(e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var app = hashToApp(a.getAttribute("href"));
    if (!app) return;                        // e.g. href="#" (scroll-top) — ignore
    e.preventDefault();
    e.stopPropagation();
    openWindow(app.id);
  }

  // ---- context menu --------------------------------------------------------
  var ctxEl = null;
  function closeCtx() { if (ctxEl && ctxEl.parentNode) ctxEl.parentNode.removeChild(ctxEl); ctxEl = null; }
  function onContextMenu(e) {
    // allow the native menu inside inputs/textareas (e.g. the contact form)
    if (e.target.closest("input, textarea, a")) return;
    e.preventDefault();
    closeCtx();
    ctxEl = el("div", "w11-ctx");
    var items = [
      { label: "Refresh", icon: "bi-arrow-clockwise", act: refreshDesktop },
      { sep: true },
      { label: "Open About Me", icon: "bi-person", act: function () { openWindow("about"); } },
      { label: "Open Portfolio", icon: "bi-images", act: function () { openWindow("portfolio"); } },
      { label: "Open Contact", icon: "bi-file-text", act: function () { openWindow("contact"); } },
      { sep: true },
      { label: "Next theme", icon: "bi-palette", act: cycleTheme }
    ];
    items.forEach(function (it) {
      if (it.sep) { ctxEl.appendChild(el("div", "w11-ctx__sep")); return; }
      var b = el("button", "w11-ctx__item", '<i class="bi ' + it.icon + '"></i><span>' + it.label + '</span>');
      b.type = "button";
      on(b, "click", function () { closeCtx(); it.act(); });
      ctxEl.appendChild(b);
    });
    desktopEl.appendChild(ctxEl);
    var vw = window.innerWidth, vh = window.innerHeight;
    var r = ctxEl.getBoundingClientRect();
    ctxEl.style.left = Math.min(e.clientX, vw - r.width - 8) + "px";
    ctxEl.style.top = Math.min(e.clientY, vh - r.height - 8) + "px";
  }
  function onDocPointerDown(e) {
    if (ctxEl && !e.target.closest(".w11-ctx")) closeCtx();
    if (!e.target.closest(".w11-icon")) selectIcon(null);
  }
  function refreshDesktop() {
    if (!desktopEl) return;
    var wp = desktopEl.querySelector(".w11-wallpaper");
    if (!wp) return;
    wp.classList.remove("is-refresh");
    void wp.offsetWidth;                 // reflow to restart the animation
    wp.classList.add("is-refresh");
  }

  function selectIcon(icon) {
    if (!desktopEl) return;
    desktopEl.querySelectorAll(".w11-icon.is-selected").forEach(function (n) { n.classList.remove("is-selected"); });
    if (icon) icon.classList.add("is-selected");
  }

  // ---- theme switch (context menu / shutdown dialog OK) --------------------
  function cycleTheme() {
    if (window.SiteTheme && typeof window.SiteTheme.next === "function") { window.SiteTheme.next(); return; }
    var btn = document.querySelector(".site-theme-toggle");
    if (btn) btn.click();
  }

  // ---- "Shut Down Windows" dialog (opened by the Start button) -------------
  // Replica of the classic Alt+F4 dialog; its only action is "Switch theme".
  function openShutdownDialog() {
    if (!desktopEl || desktopEl.querySelector(".w11-shutdown-backdrop")) return;
    var back = el("div", "w11-shutdown-backdrop");
    var dlg = el("div", "w11-shutdown",
      '<div class="w11-shutdown__bar">Shut Down Windows</div>' +
      '<div class="w11-shutdown__content">' +
        '<div class="w11-shutdown__brand">' +
          '<span class="w11-shutdown__logo" aria-hidden="true"></span>' +
          '<span class="w11-shutdown__wordmark">Windows 11</span>' +
        '</div>' +
        '<div class="w11-shutdown__row">' +
          '<i class="bi bi-display w11-shutdown__pc" aria-hidden="true"></i>' +
          '<div class="w11-shutdown__fields">' +
            '<label class="w11-shutdown__label" for="w11-shutdown-select">What do you want the computer to do?</label>' +
            '<select class="w11-shutdown__select" id="w11-shutdown-select"><option>Switch theme</option></select>' +
            '<p class="w11-shutdown__desc">Switches this site to the next theme.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="w11-shutdown__footer">' +
        '<button type="button" class="w11-dlgbtn w11-dlgbtn--ok">OK</button>' +
        '<button type="button" class="w11-dlgbtn w11-dlgbtn--cancel">Cancel</button>' +
        '<button type="button" class="w11-dlgbtn w11-dlgbtn--help">Help</button>' +
      '</div>');
    back.appendChild(dlg);
    desktopEl.appendChild(back);

    // OK -> cycle theme; that fires "themechange" -> destroy() which removes
    // the whole desktop (and this dialog with it) — no manual close needed.
    dlg.querySelector(".w11-dlgbtn--ok").addEventListener("click", function () { cycleTheme(); });
    dlg.querySelector(".w11-dlgbtn--cancel").addEventListener("click", closeShutdownDialog);
    dlg.querySelector(".w11-dlgbtn--help").addEventListener("click", closeShutdownDialog);
    back.addEventListener("pointerdown", function (e) { if (e.target === back) closeShutdownDialog(); });
    dlg.querySelector(".w11-dlgbtn--ok").focus();
  }
  function closeShutdownDialog() {
    if (!desktopEl) return;
    var back = desktopEl.querySelector(".w11-shutdown-backdrop");
    if (back && back.parentNode) back.parentNode.removeChild(back);
  }
  function onKeydown(e) {
    if (e.key === "Escape") { closeShutdownDialog(); closeCtx(); }
  }

  // ---- clock ---------------------------------------------------------------
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tickClock() {
    if (!desktopEl) return;
    var d = new Date();
    var t = desktopEl.querySelector(".w11-clock-time");
    var dt = desktopEl.querySelector(".w11-clock-date");
    var h = d.getHours(), m = d.getMinutes();
    if (t) t.textContent = pad(h) + ":" + pad(m);
    if (dt) dt.textContent = pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear();
  }
  function startClock() { tickClock(); clockTimer = window.setInterval(tickClock, 15000); }
  function stopClock() { if (clockTimer) { clearInterval(clockTimer); clockTimer = null; } }

  // ---- Isotope relayout (portfolio grid measured while hidden -> 0 width) ---
  var relayoutRaf = null;
  function relayoutPortfolio() {
    if (relayoutRaf) cancelAnimationFrame(relayoutRaf);
    relayoutRaf = requestAnimationFrame(function () {
      relayoutRaf = null;
      window.dispatchEvent(new Event("resize"));   // Isotope's own resize handler reflows
    });
  }

  function onBreakpoint() {
    Object.keys(wins).forEach(function (k) {
      var w = wins[k];
      if (w.state === "open") setMax(w, isMobile());
    });
  }

  // =========================================================================
  // DESTROY
  // =========================================================================
  function destroy() {
    if (!built) return;
    built = false;
    stopClock();
    closeCtx();
    offAll();

    // move every parked section back to its original spot, in order
    Object.keys(placeholders).forEach(function (secId) {
      var sec = document.getElementById(secId);
      var ph = placeholders[secId];
      if (sec && ph && ph.parentNode) { ph.parentNode.replaceChild(sec, ph); sec.classList.remove("w11-pane-active"); }
    });
    placeholders = {};

    if (desktopEl && desktopEl.parentNode) desktopEl.parentNode.removeChild(desktopEl);
    desktopEl = null;
    wins = {};
    zTop = 20;
    drag = null;

    window.dispatchEvent(new Event("resize"));   // let Isotope relayout the restored page
  }

  // =========================================================================
  // LIFECYCLE
  // =========================================================================
  function sync() {
    if (isWin11() && !built) build();
    else if (!isWin11() && built) destroy();
  }

  // Build after load so main.js has captured its Isotope/GLightbox/AOS refs
  // (we move nodes AFTER those references are bound).
  if (document.readyState === "complete") sync();
  else window.addEventListener("load", sync);
  window.addEventListener("themechange", sync);
})();
