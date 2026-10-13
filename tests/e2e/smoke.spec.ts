import { test, expect } from "@playwright/test";
test("isolation, clipping and keyboard camera change the actual scene", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#/anatomy");
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveAttribute("data-ready", "true");
  const initialViewportHeight = (await page.locator(".viewport").boundingBox())!
    .height;
  await page
    .getByRole("button", { name: "仅显示选中对象", exact: true })
    .click();
  await expect(
    page.getByRole("checkbox", { name: "显示环体", exact: true }),
  ).not.toBeChecked();
  await expect(
    page.getByRole("checkbox", { name: "显示柱体", exact: true }),
  ).not.toBeChecked();
  await page.getByRole("checkbox", { name: "显示标签", exact: true }).uncheck();
  await page.getByText("技术剖切演示", { exact: true }).click();
  const before = await canvas.screenshot();
  await page.getByRole("checkbox", { name: "启用剖切", exact: true }).check();
  await page
    .getByRole("slider", { name: "剖切位置", exact: true })
    .fill("-2.2");
  await canvas.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  expect((await canvas.screenshot()).equals(before)).toBe(false);
  await page.getByRole("checkbox", { name: "启用剖切", exact: true }).uncheck();
  await page
    .getByRole("button", { name: "恢复隔离前可见性", exact: true })
    .click();
  await expect(
    page.getByRole("checkbox", { name: "显示环体", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("checkbox", { name: "显示柱体", exact: true }),
  ).toBeChecked();
  await page.getByText("键盘与触屏镜头控制", { exact: true }).click();
  const cameraBefore = await canvas.getAttribute("data-camera-position");
  const renderedBefore = await canvas.screenshot();
  await page.getByRole("group", { name: "镜头键盘控制区" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(canvas).not.toHaveAttribute(
    "data-camera-position",
    cameraBefore!,
  );
  await canvas.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  expect((await canvas.screenshot()).equals(renderedBefore)).toBe(false);
  await page.getByRole("button", { name: "放大场景", exact: true }).click();
  expect((await page.locator(".viewport").boundingBox())!.height).toBeCloseTo(
    initialViewportHeight,
    0,
  );
  expect(errors).toEqual([]);
});
test("course audiences, reflection and route links work", async ({ page }) => {
  await page.goto("/");
  await page.getByText("展开现有课程框架", { exact: true }).click();
  const course = page.getByRole("region", { name: "系统课程路径" });
  await expect(course.locator(".course-stages > li")).toHaveCount(5);
  await course
    .getByRole("combobox", { name: "学习者身份" })
    .selectOption("teacher");
  await expect(course).toContainText("临床教师任务：");
  await expect(course).toContainText("组织结构—功能讨论");
  await course.getByRole("checkbox").first().check();
  await expect(course).toContainText("已记录自查：1 / 5");
  await course.getByRole("button", { name: "重置自查记录" }).click();
  await expect(course.getByRole("checkbox").first()).not.toBeChecked();
  await course.getByRole("link", { name: "诊断教学框架", exact: true }).click();
  await expect(page).toHaveURL(/diagnosis/);
});
test("home, navigation, all routes and disclaimer", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "循环系统学习工作台",
  );
  await expect(page.locator("footer")).toContainText(
    "实际诊断、治疗、处方和用药决策",
  );
  if (isMobile) await page.getByRole("button", { name: "展开导航" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "3D 人体", exact: true })
    .click();
  await expect(page).toHaveURL(/anatomy/);
  for (const [path, title] of [
    ["/physiology", "心血管教学模型"],
    ["/pathology-pharmacology", "病理与药理"],
    ["/diagnosis", "中西医诊断教学"],
    ["/treatment", "治疗：西药与方剂"],
    ["/cases", "病例推理框架"],
  ]) {
    await page.goto("/#" + path);
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("WebGL renders pixels and viewer controls work", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/#/anatomy");
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveAttribute("data-ready", "true");
  // GPU readback is an actual rendered-pixel check, not only a canvas existence assertion.
  const hasPixels = await canvas.evaluate(async (c: HTMLCanvasElement) => {
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r)),
    );
    const gl = c.getContext("webgl2");
    if (!gl) return false;
    const bytes = new Uint8Array(4);
    gl.readPixels(
      Math.floor(c.width / 2),
      Math.floor(c.height / 2),
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      bytes,
    );
    return bytes[3] > 0;
  });
  expect(hasPixels).toBe(true);
  await page.getByRole("button", { name: "环体", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "选择对象" })).toHaveValue(
    "torus",
  );
  await page.getByRole("slider", { name: "不透明度" }).fill("0.4");
  await expect(page.getByRole("status", { name: "不透明度数值" })).toHaveText(
    "0.4",
  );
  await page.getByRole("button", { name: "聚焦到对象" }).click();
  await page
    .getByRole("checkbox", { name: "显示选中对象", exact: true })
    .uncheck();
  await expect(page.getByRole("button", { name: "聚焦到对象" })).toBeDisabled();
  await page
    .getByRole("checkbox", { name: "显示选中对象", exact: true })
    .check();
  await page.getByRole("button", { name: "重置视图", exact: true }).click();
  const box = await canvas.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      box.x + box.width / 2 + 60,
      box.y + box.height / 2 + 20,
      { steps: 8 },
    );
    await page.mouse.up();
    await page.mouse.wheel(0, 120);
    await page.mouse.down({ button: "right" });
    await page.mouse.move(box.x + box.width / 2 + 90, box.y + box.height / 2, {
      steps: 4,
    });
    await page.mouse.up({ button: "right" });
  }
  expect(errors).toEqual([]);
});
test("simulation updates and case stages advance", async ({ page }) => {
  await page.goto("/#/physiology");
  await expect(page.getByTestId("cardiac-output")).toContainText("4.90");
  await page.getByRole("slider", { name: "心率 HR" }).fill("100");
  await expect(page.getByTestId("cardiac-output")).toContainText("7.00");
  await expect(
    page.getByText("这是教学模型，不是患者计算器", { exact: false }),
  ).toBeVisible();
  await page.goto("/#/cases");
  await page.getByRole("button", { name: "下一教学步骤" }).click();
  await expect(page.locator(".case-preview strong")).toHaveText("History");
});

test("TCM sources show import boundaries and official repository links", async ({
  page,
}) => {
  await page.goto("/#/treatment");
  const sources = page.getByRole("region", { name: "中医药开源研究来源" });
  await expect(sources.locator("details")).toHaveCount(6);
  await expect(sources).toContainText("医学数据尚未导入");
  const first = sources.locator("details").first();
  await first.locator("summary").click();
  await expect(first).toContainText("数据导入：未获批准");
  await expect(first.getByRole("link")).toHaveAttribute(
    "href",
    "https://github.com/tigerneil/tcm-cli",
  );
});
