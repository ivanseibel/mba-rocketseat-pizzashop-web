import { expect, test } from "@playwright/test";

test("list orders, first page", async ({ page }) => {
  await page.goto("/orders");

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-2", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-3", exact: true }),
  ).toBeVisible();
});

test("list orders, next page", async ({ page }) => {
  await page.goto("/orders");

  await page.getByLabel("Next page").click();

  await expect(
    page.getByRole("cell", { name: "order-11", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-12", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-13", exact: true }),
  ).toBeVisible();
});

test("list orders, last page", async ({ page }) => {
  await page.goto("/orders");

  await page.getByLabel("Last page").click();

  await expect(
    page.getByRole("cell", { name: "order-61", exact: true }),
  ).toBeVisible();
});

test("list orders, previous page", async ({ page }) => {
  await page.goto("/orders");

  await page.getByLabel("Last page").click();
  await page.getByLabel("Previous page").click();

  await expect(
    page.getByRole("cell", { name: "order-51", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-52", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-53", exact: true }),
  ).toBeVisible();
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders");

  await page.getByPlaceholder("Order id").fill("order-1");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
});

test("filter by customer", async ({ page }) => {
  await page.goto("/orders");

  await page.getByPlaceholder("Customer").fill("John Doe");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("John Doe")).toBeVisible();
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders");

  await page.getByRole("combobox").click();
  await page.getByLabel("Pending").getByText("Pending").click();
  await page.getByRole("button", { name: "Search" }).click();

  const tableRows = await page.$$("table tbody tr");

  for (const row of tableRows) {
    const status = await row.$("td:nth-child(4)");

    expect(await status?.textContent()).toBe("Pending");
  }
});
