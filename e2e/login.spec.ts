import { test, expect } from "@playwright/test"

test("login as a guest user", async ({ page }) => {
  await page.goto("/")
  await page
    .getByRole("button", { name: "Explore Without Signing In!" })
    .click()
  await expect(page.locator("text=Getting Started")).toBeVisible()
})
