import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up");

  await page.getByLabel("Restaurant name").fill("Pizza Shop");
  await page.getByLabel("Manager name").fill("John Doe");
  await page.getByLabel("Phone").fill("1234567");
  await page.getByLabel("Email").fill("johndoe@email.com");

  await page.getByRole("button", { name: "Sign up" }).click();

  const toast = page.getByText("Your account was created!");

  await expect(toast).toBeVisible();
});

test("sign up forcing bad request", async ({ page }) => {
  await page.goto("/sign-up", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Restaurant name").fill("Bad Name");
  await page.getByLabel("Manager name").fill("John Doe");
  await page.getByLabel("Phone").fill("1234567");
  await page.getByLabel("Email").fill("johndoe@email.com");

  await page.getByRole("button", { name: "Sign up" }).click();

  const toast = page.getByText("Failed to sign up. Please try again later.");

  await expect(toast).toBeVisible();
});

test("navigate to sign-in page", async ({ page }) => {
  await page.goto("/sign-up", {
    waitUntil: "networkidle",
  });

  await page
    .getByRole("link", { name: "Already have an account? Sign in" })
    .click();

  await expect(page).toHaveURL("/sign-in");
});
