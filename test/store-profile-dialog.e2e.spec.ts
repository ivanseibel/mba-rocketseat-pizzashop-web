import { expect, test } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Pizza Shop" }).click();

  await page.getByRole("menuitem", { name: "Profile" }).click();

  await page.getByLabel("Name").fill("Super Pizza Shop");
  await page.getByLabel("Description").fill("The best pizza in town");

  await page.getByRole("button", { name: "Save" }).click();

  const toast = page.getByText("Profile updated successfully!");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await expect(
    page.getByRole("button", { name: "Super Pizza Shop" }),
  ).toBeVisible();
});

test("update profile forcing bad request", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Pizza Shop" }).click();

  await page.getByRole("menuitem", { name: "Profile" }).click();

  await page.getByLabel("Name").fill("Bad Name");
  await page.getByLabel("Description").fill("The best pizza in town");

  await page.getByRole("button", { name: "Save" }).click();

  const toast = page.getByText(
    "Failed to update profile. Please try again later.",
  );

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();
});
