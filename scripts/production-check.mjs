import { chromium, expect } from "@playwright/test";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("dist");
const base = "/jubilant-waffle/";
const screenshots = process.argv[2];
if (screenshots) await mkdir(screenshots, { recursive: true });
// Deliberately no SPA fallback: models and route reloads must work on static Pages.
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://local").pathname);
    if (!path.startsWith(base)) {
      res.writeHead(404).end();
      return;
    }
    const file = resolve(root, path.slice(base.length) || "index.html");
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    const bytes = await readFile(file);
    const types = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".svg": "image/svg+xml",
    };
    res
      .writeHead(200, {
        "Content-Type": types[extname(file)] ?? "application/octet-stream",
      })
      .end(bytes);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url =
  process.env.QA_URL || `http://127.0.0.1:${server.address().port}${base}`;
const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const errors = [],
  warnings = [],
  failed = [];
try {
  for (const [width, height] of [
    [1920, 1080],
    [1440, 1000],
    [390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const resources = [];
    page.on("request", (request) => resources.push(request.url()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
      if (m.type() === "warning") warnings.push(m.text());
    });
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });
    for (const route of [
      "/",
      "/anatomy",
      "/physiology",
      "/pathology-pharmacology",
      "/diagnosis",
      "/treatment",
      "/cases",
    ]) {
      await page.goto(`${url}#${route}`);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveTitle(/Clinical Atlas/);
      if (route === "/")
        expect(resources.some((url) => /AnatomyViewer-/.test(url))).toBe(false);
      if (route === "/anatomy")
        await expect(page.locator("canvas[data-ready=true]")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(await page.locator("vite-error-overlay").count()).toBe(0);
      if (screenshots && ["/", "/anatomy", "/cases"].includes(route)) {
        await page.screenshot({
          path: resolve(
            screenshots,
            `${route.slice(1) || "home"}-${width}.png`,
          ),
          fullPage: true,
        });
      }
    }
    await page.reload();
    await expect(page.locator("h1")).toContainText("病例推理框架");
    await page.getByRole("button", { name: "搜索图谱" }).click();
    await page.getByRole("combobox", { name: "搜索关键词" }).fill("解剖");
    if (screenshots)
      await page.screenshot({
        path: resolve(screenshots, `search-${width}.png`),
      });
    await page.getByRole("combobox", { name: "搜索关键词" }).press("Enter");
    await expect(page).toHaveURL(/#\/anatomy/);
    await expect(page.locator("canvas[data-ready=true]")).toBeVisible();
    await page.goBack();
    await expect(page.locator("h1")).toContainText("病例推理框架");
    await page.goForward();
    await expect(page.locator("canvas[data-ready=true]")).toBeVisible();
    console.log(
      `PASS ${width}x${height}: 7 routes, reload, back/forward, search, WebGL, overflow, page identity`,
    );
    await page.close();
  }
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  console.log(
    JSON.stringify({ errors, failed, warnings: [...new Set(warnings)] }),
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
