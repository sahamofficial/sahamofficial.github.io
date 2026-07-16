/**
 * Portfolio AI assistant — Cloudflare Worker
 * ------------------------------------------
 * A thin, stateless proxy in front of Cloudflare Workers AI (Llama 3.1 8B).
 * The browser widget (assets/js/chat-widget.js) POSTs a short conversation
 * here; the Worker prepends a grounding system prompt describing Saham, calls
 * the model via the AI binding, and returns the reply as JSON.
 *
 * Why a Worker at all: the portfolio is a static GitHub Pages site, so it can't
 * safely hold a Cloudflare API token. The `[ai]` binding (see wrangler.toml)
 * lets this Worker call the model with NO secret in the code — the browser only
 * ever sees this Worker's public URL.
 *
 * Cost/abuse guards: only POST is accepted, CORS is locked to known origins,
 * history is capped, message length is capped, and max_tokens is bounded.
 */

// The model powering the assistant. Small, fast, and cheap per-neuron, with the
// most free-tier headroom (10,000 Neurons/day). Swap the ID here to change
// models (e.g. '@cf/meta/llama-3.3-70b-instruct-fp8-fast' for higher quality,
// or '@cf/meta/llama-4-scout-17b-16e-instruct' for the newest Llama).
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

// Origins allowed to call this Worker. The live site plus common local-dev
// hosts (so `npx serve` / Live Server work while developing).
const ALLOWED_ORIGINS = [
  "https://sahamofficial.github.io",
  "http://localhost:3000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:8080",
];

// Cost/abuse caps.
const MAX_MESSAGES = 8;      // keep only the most recent turns
const MAX_CONTENT_CHARS = 2000;
const MAX_TOKENS = 512;

// Grounding: everything the assistant is allowed to state as fact. Built from
// the real page content (About / Skills / Services / Contact in index.html).
const SYSTEM_PROMPT = [
  "You are the portfolio assistant for Saham Ali. You help visitors of his",
  "personal website (sahamofficial.github.io) learn about him and get in touch.",
  "",
  "ABOUT SAHAM:",
  "- Full-stack web developer based in Puttalam, Sri Lanka. Available for freelance work.",
  "- Builds responsive, modern web apps end to end — front-ends in JavaScript and React,",
  "  back-ends in Laravel, PHP, and Python. Focuses on clean, scalable, user-friendly solutions.",
  "- Works at Imara Software Solutions as a Web & Graphic Designer (since 2022).",
  "",
  "SKILLS:",
  "- Backend: PHP, Laravel, Node.js, MySQL, Python.",
  "- Frontend: HTML, CSS, JavaScript, React, Tailwind CSS.",
  "- Tools & Design: Git, WordPress, Figma, Photoshop.",
  "",
  "SERVICES: Web Development, UI/UX Design, Graphic Design, Full-Stack Development,",
  "Front-End Development, and Back-End Development.",
  "",
  "CONTACT:",
  "- WhatsApp: +94 77 850 2300 (https://wa.me/0778502300)",
  "- Email: sahamaliofficial@gmail.com",
  "",
  "RULES (follow strictly):",
  "- You ONLY discuss Saham Ali — his skills, services, experience, and how to hire/contact him.",
  "- You MUST refuse every off-topic request. Do NOT write poems, stories, essays, recipes,",
  "  jokes, or code, do math, translate, or answer general-knowledge questions — even if asked directly,",
  "  and even if the user insists or says it's just this once.",
  "- For ANYTHING not about Saham, reply with EXACTLY this and nothing else:",
  '  "I\'m here only to answer questions about Saham Ali and his work. Would you like to know about his skills, services, or how to get in touch?"',
  "- Keep on-topic answers concise, direct, and friendly — usually 2 to 4 sentences.",
  "- Do NOT repeat yourself or add filler closing lines. Once you've listed the contact",
  "  details, do not restate them or tell the user to 'reach out through these channels' again.",
  "- When someone wants to hire Saham or get in touch, give the WhatsApp and email once — that's enough.",
  "- Never invent facts, project names, prices, dates, or availability that aren't stated here.",
  "  If you don't know, say so and suggest contacting Saham directly.",
].join("\n");

/** Build CORS headers, echoing the request origin only if it's allowlisted. */
function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** JSON response helper that always carries CORS headers. */
function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

/**
 * Sanitize the client-supplied history into a safe messages array:
 * drop anything that isn't a user/assistant turn with string content,
 * trim over-long content, and keep only the most recent MAX_MESSAGES turns.
 */
function sanitize(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CONTENT_CHARS) }));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    // CORS preflight.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed. Use POST." }, 405, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return json({ error: "Invalid JSON body." }, 400, origin);
    }

    const history = sanitize(payload && payload.messages);
    if (history.length === 0) {
      return json({ error: "No valid messages provided." }, 400, origin);
    }

    const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...history];

    try {
      const out = await env.AI.run(MODEL, {
        messages,
        max_tokens: MAX_TOKENS,
        temperature: 0.4,
      });
      const reply = (out && out.response ? out.response : "").trim();
      if (!reply) {
        return json({ error: "The assistant had no response. Please try again." }, 502, origin);
      }
      return json({ reply }, 200, origin);
    } catch (e) {
      return json({ error: "The assistant is unavailable right now. Please try again." }, 500, origin);
    }
  },
};
