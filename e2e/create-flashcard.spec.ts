import { test, expect } from "./fixtures/base"

test("Create flashcard page should have no accessibility violations", async ({
  page,
  makeAxeBuilder,
}) => {
  await page.goto("/")
  await page.getByLabel("Create").click()
  await page.getByRole("menuitem", { name: "Create Flashcards" }).click()

  expect(page.getByLabel("Front")).toBeVisible()

  const accessibilityScanResults = await makeAxeBuilder().analyzeWithLogger()

  expect(accessibilityScanResults.violations.length).toBe(0)
})
