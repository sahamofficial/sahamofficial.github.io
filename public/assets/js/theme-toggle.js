(function () {
  "use strict";

  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  const THEMES = [
    { value: "light", icon: "bi-brightness-high-fill", label: "Soft Light" },
    { value: "dark", icon: "bi-terminal-fill", label: "Terminal" },
    { value: "bento", icon: "bi-grid-1x2-fill", label: "Bento Grid" },
    { value: "glass", icon: "bi-droplet-half", label: "Smoke Glass" },
    { value: "aurum", icon: "bi-gem", label: "Aurum" },
    { value: "neo", icon: "bi-circle-square", label: "Neomorphism" },
    { value: "clay", icon: "bi-balloon-fill", label: "Claymorphism" },
    { value: "maximal", icon: "bi-palette-fill", label: "Maximalism" },
    { value: "win11", icon: "bi-windows", label: "Windows 11" },
  ];

  function indexOfValue(value) {
    for (let i = 0; i < THEMES.length; i += 1) {
      if (THEMES[i].value === value) return i;
    }
    return 0;
  }

  function currentIndex() {
    return indexOfValue(root.getAttribute("data-theme") || "light");
  }

  function store(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage issues.
    }
  }

  function paintButton(button) {
    const next = THEMES[(currentIndex() + 1) % THEMES.length];
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = "bi " + next.icon;
    }
    const label = "Switch to " + next.label + " theme";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function apply(theme) {
    if (!THEMES.some((item) => item.value === theme)) {
      theme = "light";
    }
    root.setAttribute("data-theme", theme);
    store(theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  function next() {
    apply(THEMES[(currentIndex() + 1) % THEMES.length].value);
  }

  window.SiteTheme = {
    list: THEMES,
    apply,
    next,
    current: () => root.getAttribute("data-theme") || "light",
    STORAGE_KEY,
  };

  function build() {
    const header = document.querySelector("#header");
    if (!header || header.querySelector(".site-theme-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "site-theme-toggle";
    button.appendChild(document.createElement("i"));
    paintButton(button);

    button.addEventListener("click", () => {
      const nextTheme = THEMES[(currentIndex() + 1) % THEMES.length];
      apply(nextTheme.value);
      paintButton(button);
    });

    const social = header.querySelector(".social-links");
    if (social && social.parentNode === header) {
      social.insertAdjacentElement("afterend", button);
    } else {
      header.appendChild(button);
    }
  }

  if (document.readyState !== "loading") {
    build();
  } else {
    document.addEventListener("DOMContentLoaded", build);
  }

  let ticking = false;
  function syncNav() {
    const y = window.scrollY || window.pageYOffset || 0;
    root.classList.toggle("nav-scrolled", y > window.innerHeight * 0.6);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      (window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 16)))(syncNav);
    }
  }, { passive: true });

  window.addEventListener("resize", syncNav, { passive: true });
  syncNav();
})();
