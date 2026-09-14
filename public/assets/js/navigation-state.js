(function (global) {
  "use strict";

  function normalizeLocationPath(pathname) {
    return (pathname || "/").replace(/\/+$/, "") || "/";
  }

  function getNavStateForLink(linkHref, currentPath, currentHash, locationHref) {
    const href = typeof linkHref === "string" ? linkHref : (linkHref || "");
    if (!href) {
      return { isActive: false, ariaCurrent: null };
    }

    const currentLocationHref = locationHref || "http://localhost/";
    const normalizedCurrentPath = normalizeLocationPath(currentPath);
    const normalizedCurrentHash = currentHash || "";
    const target = new URL(href, currentLocationHref);
    const targetPath = normalizeLocationPath(target.pathname);
    const targetHash = target.hash || "";

    let isActive = false;
    if (href === "/" && normalizedCurrentPath === "/") {
      isActive = !normalizedCurrentHash || normalizedCurrentHash === "#hero" || normalizedCurrentHash === "";
    } else if (targetPath === normalizedCurrentPath) {
      isActive = !targetHash || normalizedCurrentHash === targetHash;
    } else if (normalizedCurrentPath === "/" && targetHash.startsWith("#") && normalizedCurrentHash === targetHash) {
      isActive = true;
    }

    return {
      isActive,
      ariaCurrent: isActive ? (targetHash ? "location" : "page") : null,
    };
  }

  function applyHeaderToggleState(header, button, expanded) {
    if (!header || !button) {
      return false;
    }

    header.classList.toggle("header-show", expanded);
    button.setAttribute("aria-expanded", String(expanded));
    button.setAttribute("aria-label", expanded ? "Close navigation menu" : "Open navigation menu");

    const icon = button.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !expanded);
      icon.classList.toggle("bi-x", expanded);
    }

    return true;
  }

  function initializeOptionalEnhancements(windowObject, documentObject) {
    const safeWindow = windowObject || global;
    const safeDocument = documentObject || (typeof document !== "undefined" ? document : null);

    if (!safeWindow || !safeDocument) {
      return { aos: false, typed: false, glightbox: false, isotope: false, swiper: false };
    }

    let aosActive = false;
    let typedActive = false;
    let glightboxActive = false;
    let isotopeActive = false;
    let swiperActive = false;

    if (typeof safeWindow.AOS !== "undefined" && typeof safeWindow.AOS.init === "function") {
      safeWindow.AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });
      aosActive = true;
    } else {
      safeDocument.querySelectorAll("[data-aos]").forEach((element) => {
        element.classList.add("aos-animate");
      });
    }

    const typedElement = safeDocument.querySelector(".typed");
    if (typedElement && typeof safeWindow.Typed !== "undefined") {
      const typedStrings = typedElement.getAttribute("data-typed-items");
      if (typedStrings) {
        try {
          new safeWindow.Typed(".typed", {
            strings: typedStrings.split(","),
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
          });
          typedActive = true;
        } catch {
          safeDocument.documentElement?.classList.add("typed-unavailable");
        }
      }
    }

    if (typeof safeWindow.GLightbox !== "undefined") {
      safeWindow.GLightbox({ selector: ".glightbox" });
      glightboxActive = true;
    }

    if (typeof safeWindow.Isotope !== "undefined" || typeof safeWindow.imagesLoaded !== "undefined") {
      safeDocument.querySelectorAll(".isotope-layout").forEach(() => {
        isotopeActive = true;
      });
    }

    if (typeof safeWindow.Swiper !== "undefined") {
      safeDocument.querySelectorAll(".init-swiper").forEach(() => {
        swiperActive = true;
      });
    }

    return { aos: aosActive, typed: typedActive, glightbox: glightboxActive, isotope: isotopeActive, swiper: swiperActive };
  }

  const api = {
    normalizeLocationPath,
    getNavStateForLink,
    applyHeaderToggleState,
    initializeOptionalEnhancements,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.NavigationState = api;
})(typeof window !== "undefined" ? window : globalThis);
