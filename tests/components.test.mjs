import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

async function loadComponentData() {
  const source = await readFile(new URL("../src/data/components.ts", import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}

async function loadPreviewRenderer() {
  const source = await readFile(new URL("../src/app/playground/[slug]/playground-editor.tsx", import.meta.url), "utf8");
  const rendererSource = source
    .slice(0, source.indexOf("export default function PlaygroundEditor"))
    .replace(/^"use client";\s*/, "")
    .replace(/^import type .*;\s*/m, "");
  const output = ts.transpileModule(`${rendererSource}\nexport { renderSafePreview };`, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}

test("published Playground records have stable, unique URL-safe slugs and required metadata", async () => {
  const { components, publishedComponents } = await loadComponentData();
  const slugs = publishedComponents.map((component) => component.slug);

  assert.ok(components.length > 0);
  assert.ok(slugs.length > 0);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
  assert.ok(publishedComponents.every((component) =>
    component.title &&
    component.purpose &&
    component.technology &&
    component.usageContext &&
    component.preview.label &&
    component.preview.description,
  ));
});

test("published Playground data declares editable, safe source contracts and preview limits", async () => {
  const { publishedComponents } = await loadComponentData();

  assert.ok(publishedComponents.every((component) => component.source.editableSource.trim().length > 0));
  assert.ok(publishedComponents.every((component) => component.source.format === "html-css" || component.source.format === "react-css"));
  assert.ok(publishedComponents.every((component) => Array.isArray(component.source.allowedDependencies) && component.source.allowedDependencies.length > 0));
  assert.ok(publishedComponents.every((component) => Number.isFinite(component.source.previewLimits.maxCharacters) && component.source.previewLimits.maxCharacters > 0));
  assert.ok(publishedComponents.every((component) => Number.isFinite(component.source.previewLimits.maxLines) && component.source.previewLimits.maxLines > 0));
  assert.ok(publishedComponents.every((component) => Number.isFinite(component.source.previewLimits.maxRenderMs) && component.source.previewLimits.maxRenderMs > 0));
  assert.ok(publishedComponents.every((component) => Array.isArray(component.source.previewLimits.allowedTags) && component.source.previewLimits.allowedTags.length > 0));
});

test("interactive editor keeps draft and submitted preview state separate and rejects unsafe inputs", async () => {
  const editor = await readFile(new URL("../src/app/playground/[slug]/playground-editor.tsx", import.meta.url), "utf8");

  assert.match(editor, /const \[draft, setDraft\] = useState/);
  assert.match(editor, /const \[submittedSource, setSubmittedSource\] = useState/);
  assert.match(editor, /setSubmittedSource\(draft\)/);
  assert.match(editor, /setDraft\(initialSource\);\s*setSubmittedSource\(initialSource\)/s);
  assert.match(editor, /sandbox=""/);
  assert.match(editor, /@import/);
  assert.match(editor, /url/);
  assert.match(editor, /attributePattern/);
  assert.match(editor, /maxRenderMs/);
});

test("preview renderer returns specific validation failures and recovers on a valid rerun", async () => {
  const { renderSafePreview } = await loadPreviewRenderer();
  const { publishedComponents } = await loadComponentData();
  const component = publishedComponents.find((entry) => entry.slug === "responsive-status-card");

  assert.ok(component);
  const invalidResult = renderSafePreview(component, "<script>alert('nope')</script>");
  assert.equal(invalidResult.html, "");
  assert.match(invalidResult.reason, /disallowed browser capability/i);

  const validResult = renderSafePreview(component, component.source.editableSource);
  assert.ok(validResult.html);
  assert.equal(validResult.reason, undefined);
});

test("preview renderer reports execution timeout without replacing validation errors", async () => {
  const { renderSafePreview } = await loadPreviewRenderer();
  const { publishedComponents } = await loadComponentData();
  const component = publishedComponents.find((entry) => entry.slug === "responsive-status-card");

  assert.ok(component);
  const timeoutComponent = {
    ...component,
    source: {
      ...component.source,
      previewLimits: { ...component.source.previewLimits, maxRenderMs: 0 },
    },
  };
  const timeoutResult = renderSafePreview(timeoutComponent, component.source.editableSource);
  assert.equal(timeoutResult.html, "");
  assert.match(timeoutResult.reason, /execution-time limit/i);

  const invalidResult = renderSafePreview(timeoutComponent, "<script>alert('nope')</script>");
  assert.match(invalidResult.reason, /disallowed browser capability/i);
});

test("published Playground data executes with complete records and reset-safe contracts", async () => {
  const { components, publishedComponents, getComponentBySlug, isComponentComplete } = await loadComponentData();

  assert.equal(publishedComponents.length, components.filter((component) => isComponentComplete(component)).length);
  assert.deepEqual(publishedComponents.map((component) => component.slug), [
    "responsive-status-card",
    "react-feature-list",
  ]);
  assert.equal(getComponentBySlug("missing-component"), undefined);
  assert.ok(publishedComponents.every((component) => isComponentComplete(component)));
  assert.equal(isComponentComplete({ ...publishedComponents[0], title: "  " }), false);
  assert.equal(isComponentComplete({ ...publishedComponents[0], limitations: ["  "] }), false);
  assert.equal(isComponentComplete({ ...publishedComponents[0], source: { ...publishedComponents[0].source, editableSource: "" } }), false);
});

test("static export emits collection, detail, recovery, and interactive editor surfaces", () => {
  const command = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.error?.message ?? ""}
${result.stdout ?? ""}
${result.stderr ?? ""}`);

  const out = join(projectRoot, "out");
  const index = readFile(join(out, "index.html"), "utf8");
  const collection = readFile(join(out, "playground", "index.html"), "utf8");
  const firstDetail = readFile(join(out, "playground", "responsive-status-card", "index.html"), "utf8");
  const secondDetail = readFile(join(out, "playground", "react-feature-list", "index.html"), "utf8");
  const sitemap = readFile(join(out, "sitemap.xml"), "utf8");
  const notFound = readFile(join(out, "404.html"), "utf8");

  return Promise.all([index, collection, firstDetail, secondDetail, sitemap, notFound]).then(
    ([indexHtml, collectionHtml, firstDetailHtml, secondDetailHtml, sitemapXml, notFoundHtml]) => {
      assert.match(indexHtml, /data-nav="playground"/);
      assert.match(collectionHtml, /Component Playground/);
      assert.match(collectionHtml, /Responsive status card/);
      assert.match(collectionHtml, /Each published example includes a constrained, browser-scoped editor/);
      assert.match(firstDetailHtml, /Run/);
      assert.match(firstDetailHtml, /Reset/);
      assert.match(firstDetailHtml, /Copy/);
      assert.match(firstDetailHtml, /Download/);
      assert.match(firstDetailHtml, /Rendered after Run/);
      assert.match(secondDetailHtml, /React feature list/);
      assert.match(sitemapXml, /<loc>https:\/\/sahamali\.dev\/playground<\/loc>/);
      assert.match(sitemapXml, /playground\/responsive-status-card/);
      assert.match(sitemapXml, /playground\/react-feature-list/);
      assert.match(notFoundHtml, /Return Home/);
    },
  );
});
