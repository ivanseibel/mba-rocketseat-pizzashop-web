import { expect, test } from "@playwright/test";

test("display day orders amount metric", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("1,000")).toBeVisible();
  await expect(page.getByText("+10%")).toBeVisible();
});

test("display month cancelled orders amount metric", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("5", { exact: true })).toBeVisible();
  await expect(page.getByText("-5%")).toBeVisible();
});

test("display month orders amount metric", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("250")).toBeVisible();
  await expect(page.getByText("-10%")).toBeVisible();
});

test("display month revenue amount metric", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("$5,500.00")).toBeVisible();
  await expect(page.getByText("-23%")).toBeVisible();
});
