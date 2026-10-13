import { test, expect } from "@playwright/test";
test("spotlight keyboard, pending results, empty state and language", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "搜索图谱" }).focus();
  await page.keyboard.press("Control+k");
  const search = page.getByRole("combobox", { name: "搜索关键词" });
  await expect(search).toBeFocused();
  await search.fill("LAD");
  await expect(page.getByRole("dialog").getByRole("option")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await search.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await search.fill("nothing-to-find");
  await expect(page.getByRole("dialog")).toContainText("没有匹配条目");
  await search.fill("生理教学");
  await search.press("Enter");
  await expect(page).toHaveURL(/#\/physiology/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByText(/English version not yet available for this module/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Search atlas" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Search atlas" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "切换为中文" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});
test("viewer survives route round trip without replaying the last camera command", async ({
  page,
  isMobile,
}) => {
  await page.goto("/#/anatomy");
  const canvas = page.locator("canvas[data-ready=true]");
  await expect(canvas).toBeVisible();
  await page.getByText("键盘与触屏镜头控制", { exact: true }).click();
  await page.getByRole("button", { name: "放大场景", exact: true }).click();
  await page.getByRole("button", { name: "环体", exact: true }).click();
  await page.getByRole("slider", { name: "不透明度", exact: true }).fill("0.4");
  const position = await canvas.getAttribute("data-camera-position");
  const target = await canvas.getAttribute("data-camera-target");
  if (isMobile) await page.locator(".directory > summary").click();
  await page
    .locator(".directory")
    .getByRole("link", { name: "生理教学模型", exact: true })
    .click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.goBack();
  await expect(canvas).toHaveAttribute("data-camera-position", position!);
  await expect(canvas).toHaveAttribute("data-camera-target", target!);
  await expect(page.getByRole("combobox", { name: "选择对象" })).toHaveValue(
    "torus",
  );
  await expect(
    page.getByRole("slider", { name: "不透明度", exact: true }),
  ).toHaveValue("0.4");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "3D 交互实验室",
  );
  await expect(
    page.getByRole("slider", { name: "不透明度", exact: true }),
  ).toHaveValue("1");
});
