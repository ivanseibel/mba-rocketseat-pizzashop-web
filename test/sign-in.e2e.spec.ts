import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in");

  await page.getByLabel("Email").fill("johndoe@email.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  const toast = page.getByText("A magic link has been sent to your email");

  await expect(toast).toBeVisible();
});

test("sign in with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Email").fill("ddd@email.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  const toast = page.getByText("Failed to send magic link. Please try again.");

  await expect(toast).toBeVisible();
});

test("navigate to sign-up page", async ({ page }) => {
  await page.goto("/sign-in", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "New to pizza.shop? Sign up" }).click();

  await expect(page).toHaveURL("/sign-up");
});
