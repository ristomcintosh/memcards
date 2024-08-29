import { test, expect } from "./fixtures/auth"
import AxeBuilder from "@axe-core/playwright"

test("Create flashcard page should have no accessibility violations", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByLabel("Create").click()
  await page.getByRole("menuitem", { name: "Create Flashcards" }).click()

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  if (accessibilityScanResults.violations.length > 0) {
    console.log(accessibilityScanResults.violations)
  }

  expect(accessibilityScanResults.violations.length).toBe(0)
})
