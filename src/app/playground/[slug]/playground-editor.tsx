"use client";

import { useState } from "react";
import type { ComponentRecord } from "@/data/components";

const forbiddenPatterns = [
  /<script\s*/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /srcdoc\s*=/i,
  /fetch\s*\(/i,
  /navigator\./i,
  /localStorage|sessionStorage/i,
  /document\.|window\./i,
  /import\s+.*from\s*["']/i,
  /new\s+URL\s*\(/i,
  /<iframe\s*/i,
  /<object\s*/i,
  /<embed\s*/i,
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseReactFeatureEntries(source: string): { title: string; description: string }[] {
  const match = source.match(/const\s+features\s*=\s*\[([\s\S]*?)]\s*;/);
  if (!match) {
    return [];
  }

  const entryPattern = /\{\s*title:\s*"([^"]+)"\s*,\s*description:\s*"([^"]+)"\s*\}/g;
  const entries: { title: string; description: string }[] = [];
  let result: RegExpExecArray | null;

  while ((result = entryPattern.exec(match[1])) !== null) {
    entries.push({
      title: result[1],
      description: result[2],
    });
  }

  return entries;
}

function buildSafeReactPreview(source: string, maxCharacters: number, maxLines: number): { html: string; reason?: string } {
  const candidate = source.trim();
  if (!candidate) {
    return { html: "", reason: "Source is empty." };
  }

  if (candidate.length > maxCharacters) {
    return { html: "", reason: `The React source exceeds the ${maxCharacters}-character preview limit.` };
  }

  const lines = candidate.split(/\r?\n/).length;
  if (lines > maxLines) {
    return { html: "", reason: `The React source exceeds the ${maxLines}-line preview limit.` };
  }

  const normalized = candidate.replace(/\r/g, "");
  if (forbiddenPatterns.some((pattern) => pattern.test(normalized))) {
    return { html: "", reason: "This source uses a disallowed browser capability, network call, or runtime feature." };
  }

  const requiredMarkers = [
    "export default function FeatureList()",
    "features.map",
    "className=\"feature-list\"",
    "className=\"feature-list__items\"",
  ];
  if (requiredMarkers.some((marker) => !normalized.includes(marker))) {
    return { html: "", reason: "This React example must keep the documented feature-list structure." };
  }

  const entries = parseReactFeatureEntries(candidate);
  if (entries.length === 0) {
    return { html: "", reason: "This React example must use the documented feature-list shape." };
  }

  const itemMarkup = entries
    .map(
      (feature) => `
        <li>
          <h3>${escapeHtml(feature.title)}</h3>
          <p>${escapeHtml(feature.description)}</p>
        </li>
      `,
    )
    .join("");

  return {
    html: `
      <style>
        body {
          margin: 0;
          padding: 1rem;
          background: #0b1020;
          color: #eef6ff;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .feature-list {
          max-width: 540px;
          margin: 0 auto;
          padding: 1.5rem 1.25rem;
          border: 1px solid rgba(98, 227, 255, 0.2);
          border-radius: 18px;
          background: rgba(18, 26, 43, 0.85);
          box-shadow: 0 10px 24px rgba(11, 16, 32, 0.28);
        }
        .feature-list__header {
          display: grid;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .feature-list__tag {
          color: #62e3ff;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .feature-list__header h2 {
          margin: 0;
          font-size: clamp(1.3rem, 2vw, 1.8rem);
        }
        .feature-list__items {
          margin: 0;
          padding-left: 1.1rem;
          display: grid;
          gap: 0.8rem;
        }
        .feature-list__items li {
          padding: 0.85rem 0.9rem;
          border: 1px solid rgba(98, 227, 255, 0.16);
          border-radius: 12px;
          background: rgba(11, 16, 32, 0.45);
          list-style: none;
        }
        .feature-list__items h3 {
          margin: 0 0 0.35rem;
          font-size: 1.06rem;
        }
        .feature-list__items p {
          margin: 0;
          line-height: 1.55;
          color: #b7c3d9;
        }
      </style>
      <section class="feature-list">
        <div class="feature-list__header">
          <span class="feature-list__tag">What this pattern supports</span>
          <h2>Feature list</h2>
        </div>
        <ul class="feature-list__items">${itemMarkup}</ul>
      </section>
    `,
  };
}

function buildSafeHtmlPreview(source: string, maxCharacters: number, maxLines: number, allowedTags: string[]): { html: string; reason?: string } {
  const candidate = source.trim();
  if (!candidate) {
    return { html: "", reason: "Source is empty." };
  }

  if (candidate.length > maxCharacters) {
    return { html: "", reason: `The HTML source exceeds the ${maxCharacters}-character preview limit.` };
  }

  const lines = candidate.split(/\r?\n/).length;
  if (lines > maxLines) {
    return { html: "", reason: `The HTML source exceeds the ${maxLines}-line preview limit.` };
  }

  if (forbiddenPatterns.some((pattern) => pattern.test(candidate))) {
    return { html: "", reason: "This source uses a disallowed browser capability or scripting feature." };
  }

  if (/@import\b|url\s*\(|expression\s*\(/i.test(candidate)) {
    return { html: "", reason: "External CSS resources are not supported in this preview boundary." };
  }

  const attributePattern = /\s([a-z-]+)\s*=\s*(['"])(.*?)\2/gi;
  let attributeMatch: RegExpExecArray | null;
  while ((attributeMatch = attributePattern.exec(candidate)) !== null) {
    const attribute = attributeMatch[1];
    const value = attributeMatch[3];
    if (/^on/i.test(attribute) || /javascript:|data:text\/html|vbscript:/i.test(value)) {
      return { html: "", reason: "Event handlers and executable URL attributes are not supported." };
    }
  }

  const tagPattern = /<\/?([a-z0-9-]+)/g;
  const tags = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(candidate)) !== null) {
    tags.add(match[1].toLowerCase());
  }

  const disallowedTag = [...tags].find((tag) => !allowedTags.map((allowedTag) => allowedTag.toLowerCase()).includes(tag));
  if (disallowedTag) {
    return { html: "", reason: `The tag <${disallowedTag}> is not supported in this preview boundary.` };
  }

  return { html: candidate };
}

function renderSafePreview(component: ComponentRecord, source: string): { html: string; reason?: string } {
  const startedAt = performance.now();
  const limits = component.source.previewLimits;
  if (component.source.format === "html-css") {
    const result = buildSafeHtmlPreview(source, limits.maxCharacters, limits.maxLines, limits.allowedTags);
    return performance.now() - startedAt > limits.maxRenderMs
      ? { html: "", reason: "The preview exceeded its execution-time limit." }
      : result;
  }

  const result = buildSafeReactPreview(source, limits.maxCharacters, limits.maxLines);
  return performance.now() - startedAt > limits.maxRenderMs
    ? { html: "", reason: "The preview exceeded its execution-time limit." }
    : result;
}

function buildPreviewDocument(html: string): string {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body {
            margin: 0;
            min-height: 100%;
            background: #0b1020;
            color: #eef6ff;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>`;
}

export default function PlaygroundEditor({ component }: { component: ComponentRecord }) {
  const initialSource = component.source.editableSource;
  const [draft, setDraft] = useState(initialSource);
  const [submittedSource, setSubmittedSource] = useState(initialSource);
  const [statusMessage, setStatusMessage] = useState("This example is ready to run in the constrained preview.");
  const [statusTone, setStatusTone] = useState<"info" | "success" | "error">("info");

  const currentPreview = renderSafePreview(component, submittedSource);

  const handleRun = () => {
    const result = renderSafePreview(component, draft);
    if (!result.html) {
      setStatusTone("error");
      setStatusMessage(result.reason ?? "The preview could not run because the source is outside the supported boundary.");
      return;
    }

    setSubmittedSource(draft);
    setStatusTone("success");
    setStatusMessage("Preview refreshed with the current submitted source.");
  };

  const handleReset = () => {
    setDraft(initialSource);
    setSubmittedSource(initialSource);
    setStatusTone("info");
    setStatusMessage("Source and preview reset to the original component example.");
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard is unavailable in this browser.");
      }

      await navigator.clipboard.writeText(submittedSource);
      setStatusTone("success");
      setStatusMessage("The current submitted source was copied to the clipboard.");
    } catch {
      setStatusTone("error");
      setStatusMessage("Clipboard access is unavailable here; use Download to save the current source instead.");
    }
  };

  const handleDownload = () => {
    const extension = component.source.format === "react-css" ? "jsx" : "html";
    const blob = new Blob([submittedSource], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${component.slug}.${extension}`;
    anchor.rel = "noopener";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatusTone("success");
    setStatusMessage("The current submitted source was downloaded as a local file.");
  };

  const previewDocument = buildPreviewDocument(currentPreview.html || "");

  return (
    <>
      <section className="playground-surface" aria-labelledby="component-preview">
        <div className="playground-surface-heading">
          <div>
            <span className="playground-surface-label">Preview</span>
            <h2 id="component-preview">{component.preview.label}</h2>
          </div>
          <span className="playground-reserved">Rendered after Run</span>
        </div>
        <div className="playground-preview-frame-wrap">
          <iframe
            title={`${component.title} preview`}
            className="playground-preview-frame"
            srcDoc={previewDocument}
            sandbox=""
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="playground-surface" aria-labelledby="component-source">
        <div className="playground-surface-heading">
          <div>
            <span className="playground-surface-label">Source</span>
            <h2 id="component-source">{component.source.label}</h2>
          </div>
          <span className="playground-reserved">Safe editing</span>
        </div>

        <p>{component.source.description}</p>

        <label className="playground-editor-label" htmlFor={`component-editor-${component.slug}`}>
          Editable source
        </label>
        <textarea
          id={`component-editor-${component.slug}`}
          className="playground-editor"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          spellCheck={false}
          aria-describedby={`playground-status-${component.slug}`}
        />

        <div className="playground-action-group" role="group" aria-label={`${component.title} actions`}>
          <button type="button" className="portfolio-button-primary" onClick={handleRun}>
            Run
          </button>
          <button type="button" className="portfolio-button-secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="portfolio-button-secondary" onClick={handleCopy}>
            Copy
          </button>
          <button type="button" className="portfolio-button-secondary" onClick={handleDownload}>
            Download
          </button>
        </div>

        <p id={`playground-status-${component.slug}`} className={`playground-status playground-status--${statusTone}`} role="status" aria-live="polite">
          {statusMessage}
        </p>

        <ul className="playground-constraint-list" aria-label="Preview constraints">
          <li>
            {component.source.format === "html-css" ? "HTML / CSS" : "React / CSS"} · {component.source.allowedDependencies.join(", ")}
          </li>
          <li>
            Max {component.source.previewLimits.maxCharacters.toLocaleString()} characters and {component.source.previewLimits.maxLines} lines
          </li>
          <li>
            Allowed tags: {component.source.previewLimits.allowedTags.join(", ")}
          </li>
        </ul>
      </section>
    </>
  );
}
