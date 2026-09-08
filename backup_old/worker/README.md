# Portfolio AI assistant — Cloudflare Worker

This Worker powers the chat widget on the portfolio. It proxies the browser to
**Cloudflare Workers AI** (Llama 3.1 8B) so no API token is ever exposed on the
static GitHub Pages site.

```
Browser widget ──POST──► this Worker ──env.AI.run()──► @cf/meta/llama-3.1-8b-instruct
(chat-widget.js)          (CORS + system prompt + caps)      (Workers AI, hosted)
```

## One-time setup

1. **Cloudflare account** (free) — https://dash.cloudflare.com/sign-up
2. **Install Wrangler** (the Cloudflare CLI):
   ```bash
   npm install -g wrangler
   ```
3. **Log in** (opens a browser to authorize):
   ```bash
   wrangler login
   ```

## Run locally

From this `worker/` directory:

```bash
wrangler dev
```

The AI binding runs against the real Workers AI service. Test it:

```bash
curl -X POST http://localhost:8787/ \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What does Saham do?"}]}'
# -> {"reply":"Saham is a full-stack web developer ..."}
```

## Deploy

```bash
wrangler deploy
```

Wrangler prints your public URL, e.g.:

```
https://saham-portfolio-ai.<your-subdomain>.workers.dev
```

**Copy that URL** into `WORKER_URL` in
[`../assets/js/chat-widget.js`](../assets/js/chat-widget.js), commit, and push —
GitHub Pages redeploys the site automatically.

## Notes

- **Model** — change it via the `MODEL` constant in `src/index.js`
  (e.g. `@cf/meta/llama-3.3-70b-instruct-fp8-fast` for higher quality).
- **Allowed origins** — `ALLOWED_ORIGINS` in `src/index.js` locks CORS to the
  live site plus common localhost dev ports. Add/remove as needed.
- **Cost** — Workers AI free tier is 10,000 Neurons/day (resets 00:00 UTC).
  `MAX_TOKENS`, `MAX_MESSAGES`, and `MAX_CONTENT_CHARS` keep each call bounded.
  Watch usage in the Cloudflare dashboard → Workers AI.
- **Optional hardening (future):** streaming responses (`stream: true`) and
  per-IP rate limiting (KV or the Rate Limiting binding, keyed on
  `request.headers.get("cf-connecting-ip")`).
