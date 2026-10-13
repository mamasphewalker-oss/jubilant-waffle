import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const output = process.argv[2];
if (!output) throw new Error("Provide output directory");
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["tablet", 820, 1180],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:4180/#/anatomy");
  await page.locator("canvas[data-ready=true]").waitFor();
  await page.screenshot({
    path: output + "/anatomy-" + name + ".png",
    fullPage: true,
  });
  console.log(
    name,
    await page.locator("h1").innerText(),
    await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    })),
  );
  await page.close();
}
await browser.close();
