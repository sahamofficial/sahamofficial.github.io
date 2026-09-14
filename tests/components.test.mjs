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
    component.usageContext,
  ));
});

test("published Playground data executes with complete records", async () => {
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
});

test("static export emits collection, detail, recovery, and sitemap content", () => {
  const command = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.error?.message ?? ""}\n${result.stdout ?? ""}\n${result.stderr ?? ""}`);

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
      assert.match(collectionHtml, /documentation-first references/);
      assert.match(firstDetailHtml, /Source surface reserved/);
      assert.match(firstDetailHtml, /Preview surface reserved/);
      assert.match(secondDetailHtml, /React feature list/);
      assert.match(sitemapXml, /<loc>https:\/\/sahamali\.dev\/playground<\/loc>/);
      assert.match(sitemapXml, /playground\/responsive-status-card/);
      assert.match(sitemapXml, /playground\/react-feature-list/);
      assert.match(notFoundHtml, /Return Home/);
    },
  );
});
