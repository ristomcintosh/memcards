import { test, expect } from "./fixtures/auth"
import AxeBuilder from "@axe-core/playwright"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Create and delete deck", async ({ page }, testInfo) => {
  const deckName = `New deck ${testInfo.testId}`
  await page.getByLabel("Create").click()
  await page.getByRole("menuitem", { name: "Create Deck" }).click()

  await expect(page.getByText("Create A New Deck")).toBeVisible()

  await page.getByLabel("Deck Name:").fill(deckName)
  await page.getByRole("button", { name: "Submit" }).click()

  await expect(page.getByText(deckName)).toBeVisible()

  await page.getByTestId(`deck-${deckName}`).getByLabel("Deck Options").click()

  await page.getByRole("menuitem", { name: "Delete" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
  await expect(page.getByTestId(`deck-${deckName}`)).not.toBeVisible()
})

test("Cancel deck creation", async ({ page }) => {
  await page.getByLabel("Create").click()
  await page.getByRole("menuitem", { name: "Create Deck" }).click()

  await expect(page.getByText("Create A New Deck")).toBeVisible()

  await page.getByRole("button", { name: "Cancel" }).click()

  await expect(page.getByText("Create A New Deck")).not.toBeVisible()
})

test("should have no accessibility violations", async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScanResults.violations.length).toBe(0)
})