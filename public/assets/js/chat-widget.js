/**
 * Portfolio AI Assistant — chat widget
 * ------------------------------------
 * A floating "Ask about Saham" chat, bottom-right. It POSTs the recent
 * conversation to a small Cloudflare Worker (see /worker), which runs Llama 3.1
 * 8B on Cloudflare Workers AI grounded with Saham's bio, and returns a reply.
 *
 * Design notes (matches the rest of the site):
 *   - Self-contained IIFE, no framework, no build step (like click-sound.js).
 *   - Builds its own DOM and appends to <body> (like theme-toggle.js).
 *   - Styled entirely with the theme CSS variables in assets/css/chat-widget.css,
 *     so it recolors automatically across all five themes.
 *   - Honors prefers-reduced-motion; the launcher lifts above #scroll-top on
 *     scroll (same scroll-reactive pattern as theme-toggle.js).
 *   - Message text is rendered with textContent only (never innerHTML), so
 *     visitor input and model output can't inject markup.
 *
 * Console API:  window.portfolioChat.open() / .close() / .toggle()
 */
(function () {
  "use strict";

  // -------------------------------------------------------------
  // Config
  // -------------------------------------------------------------
  // Your deployed Worker URL. Set this after `wrangler deploy` (see worker/README.md).
  var WORKER_URL = "https://saham-portfolio-ai.sahamaliofficial.workers.dev";

  var STORAGE_KEY = "portfolioChatOpen";  // remember open/closed between pages
  var MAX_HISTORY = 8;                      // turns kept + sent (mirrors the Worker cap)
  var GREETING =
    "Hi! I'm Saham's assistant — ask me about his skills, services, or how to get in touch.";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------
  // State + element refs (filled in build())
  // -------------------------------------------------------------
  var messages = [];      // [{ role: 'user' | 'assistant', content: '...' }]
  var sending = false;
  var greeted = false;
  var root, launch, panel, log, input, sendBtn;

  // -------------------------------------------------------------
  // DOM helpers
  // -------------------------------------------------------------
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function iconButton(className, iconClass, label) {
    var btn = el("button", className);
    btn.type = "button";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
    btn.appendChild(el("i", "bi " + iconClass));
    return btn;
  }

  // -------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------
  function addBubble(role, text) {
    var row = el("div", "chat__msg chat__msg--" + role);
    row.appendChild(el("div", "chat__bubble", text));
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  // Animated "typing" placeholder shown while the Worker responds.
  function addTyping() {
    var row = el("div", "chat__msg chat__msg--assistant chat__msg--typing");
    var bubble = el("div", "chat__bubble");
    for (var i = 0; i < 3; i++) bubble.appendChild(el("span", "chat__dot"));
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  // -------------------------------------------------------------
  // Networking — send the conversation to the Worker
  // -------------------------------------------------------------
  function send(text) {
    if (sending) return;
    text = (text || "").trim();
    if (!text) return;

    if (WORKER_URL.indexOf("<your-subdomain>") !== -1) {
      addBubble("assistant", "The assistant isn't configured yet. (Set WORKER_URL in chat-widget.js.)");
      return;
    }

    messages.push({ role: "user", content: text });
    if (messages.length > MAX_HISTORY) messages = messages.slice(-MAX_HISTORY);
    addBubble("user", text);

    input.value = "";
    setSending(true);
    var typing = addTyping();

    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages })
    })
      .then(function (response) {
        if (response.ok) return response.json();
        throw new Error("HTTP " + response.status);
      })
      .then(function (data) {
        typing.remove();
        var reply = data && data.reply ? data.reply : null;
        if (reply) {
          messages.push({ role: "assistant", content: reply });
          addBubble("assistant", reply);
        } else {
          addBubble("assistant", (data && data.error) || "Sorry, I couldn't reply just then.");
        }
      })
      .catch(function () {
        typing.remove();
        addBubble(
          "assistant",
          "I'm having trouble connecting right now. You can reach Saham directly on WhatsApp (+94 77 850 2300) or by email (sahamaliofficial@gmail.com)."
        );
      })
      .then(function () {
        setSending(false);
        input.focus();
      });
  }

  function setSending(value) {
    sending = value;
    input.disabled = value;
    sendBtn.disabled = value;
    root.classList.toggle("chat--busy", value);
  }

  // -------------------------------------------------------------
  // Open / close
  // -------------------------------------------------------------
  function open() {
    root.classList.add("chat--open");
    launch.setAttribute("aria-expanded", "true");
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch (e) { /* ignore */ }
    if (!greeted) {                         // first open: friendly welcome
      addBubble("assistant", GREETING);
      greeted = true;
    }
    input.focus();
  }

  function close() {
    root.classList.remove("chat--open");
    launch.setAttribute("aria-expanded", "false");
    try { localStorage.setItem(STORAGE_KEY, "0"); } catch (e) { /* ignore */ }
    launch.focus();
  }

  function toggle() {
    if (root.classList.contains("chat--open")) close();
    else open();
  }

  // -------------------------------------------------------------
  // Build the widget and wire events
  // -------------------------------------------------------------
  function build() {
    if (document.querySelector(".chat")) return;   // guard against double-init

    root = el("div", "chat");
    if (reduceMotion) root.classList.add("chat--no-motion");

    // Launcher button (collapsed state).
    launch = iconButton("chat__launch", "bi-chat-dots-fill", "Chat with Saham's AI assistant");
    launch.setAttribute("aria-expanded", "false");
    launch.addEventListener("click", toggle);

    // Panel (expanded state).
    panel = el("div", "chat__panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Portfolio assistant");

    var head = el("div", "chat__head");
    var heading = el("div", "chat__title");
    heading.appendChild(el("span", "chat__title-name", "Ask about Saham"));
    heading.appendChild(el("span", "chat__title-sub", "AI assistant"));
    var closeBtn = iconButton("chat__close", "bi-x-lg", "Close chat");
    closeBtn.addEventListener("click", close);
    head.appendChild(heading);
    head.appendChild(closeBtn);

    log = el("div", "chat__log");
    log.setAttribute("aria-live", "polite");

    var form = el("form", "chat__form");
    input = el("input", "chat__input");
    input.type = "text";
    input.placeholder = "Type your question…";
    input.setAttribute("aria-label", "Type your question");
    input.setAttribute("autocomplete", "off");
    input.maxLength = 500;
    sendBtn = iconButton("chat__send", "bi-send-fill", "Send message");
    sendBtn.type = "submit";
    form.appendChild(input);
    form.appendChild(sendBtn);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      send(input.value);
    });

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(form);

    root.appendChild(panel);
    root.appendChild(launch);
    document.body.appendChild(root);

    // Esc closes the panel when it's open.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("chat--open")) close();
    });

    // Lift the launcher above #scroll-top once it appears (same threshold as
    // the template's scroll-top: ~100px). rAF-throttled, passive listener.
    var ticking = false;
    function syncRaise() {
      var y = window.scrollY || window.pageYOffset || 0;
      root.classList.toggle("chat--raised", y > 100);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(syncRaise); }
    }, { passive: true });
    syncRaise();

    // Restore previous open state (e.g. navigating between pages).
    var wasOpen = false;
    try { wasOpen = localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) { /* ignore */ }
    if (wasOpen) open();
  }

  if (document.readyState !== "loading") build();
  else document.addEventListener("DOMContentLoaded", build);

  // Small public API, consistent with window.clickSound.
  window.portfolioChat = { open: open, close: close, toggle: toggle };
})();
