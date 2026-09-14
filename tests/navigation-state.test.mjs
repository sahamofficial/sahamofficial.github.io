import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const {
  normalizeLocationPath,
  getNavStateForLink,
  applyHeaderToggleState,
  initializeOptionalEnhancements,
} = require("../public/assets/js/navigation-state.js");

test("responsive shell normalizes direct route paths and keeps root home behavior stable", () => {
  assert.equal(normalizeLocationPath("/portfolio/"), "/portfolio");
  assert.equal(normalizeLocationPath("/"), "/");
  assert.deepEqual(getNavStateForLink("/", "/", "", "https://example.com/"), { isActive: true, ariaCurrent: "page" });
  assert.deepEqual(getNavStateForLink("/portfolio", "/portfolio", "", "https://example.com/portfolio"), {
    isActive: true,
    ariaCurrent: "page",
  });
});

test("direct routes and hash-linked navigation resolve to the correct active item without false positives", () => {
  assert.deepEqual(getNavStateForLink("/#services", "/", "#services", "https://example.com/"), {
    isActive: true,
    ariaCurrent: "location",
  });
  assert.deepEqual(getNavStateForLink("/contact", "/", "", "https://example.com/"), {
    isActive: false,
    ariaCurrent: null,
  });
  assert.deepEqual(getNavStateForLink("/about", "/about", "", "https://example.com/about"), {
    isActive: true,
    ariaCurrent: "page",
  });
});

test("header toggle state stays semantically synchronized for keyboard and pointer users", () => {
  const header = {
    classList: {
      toggle() {},
    },
  };
  const icon = {
    classList: {
      toggle() {},
    },
  };
  const button = {
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    querySelector(selector) {
      assert.equal(selector, "i");
      return icon;
    },
  };

  assert.equal(applyHeaderToggleState(header, button, true), true);
  assert.equal(button.attributes["aria-expanded"], "true");
  assert.equal(button.attributes["aria-label"], "Close navigation menu");

  applyHeaderToggleState(header, button, false);
  assert.equal(button.attributes["aria-expanded"], "false");
  assert.equal(button.attributes["aria-label"], "Open navigation menu");
});

test("missing vendor globals and delayed enhancement scripts remain safe to initialize", () => {
  const documentObject = {
    querySelectorAll(selector) {
      assert.ok(selector === "[data-aos]" || selector === ".init-swiper" || selector === ".isotope-layout");
      return [];
    },
    documentElement: {
      classList: {
        add() {},
      },
    },
    querySelector(selector) {
      assert.ok(selector === ".typed");
      return null;
    },
  };

  const result = initializeOptionalEnhancements(
    {
      matchMedia: () => ({ matches: false }),
      addEventListener() {},
    },
    documentObject,
  );

  assert.deepEqual(result, {
    aos: false,
    typed: false,
    glightbox: false,
    isotope: false,
    swiper: false,
  });
});
