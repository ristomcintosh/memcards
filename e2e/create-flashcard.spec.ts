import { test, expect } from "./fixtures/base"

test("Create flashcard page should have no accessibility violations", async ({
  page,
  makeAxeBuilder,
}) => {
  await page.goto("/create-flashcard")

  expect(
    page.getByRole("heading", { name: "Create A New Flashcard" })
  ).toBeVisible()

  const accessibilityScanResults = await makeAxeBuilder().analyzeWithLogger()

  expect(accessibilityScanResults.violations.length).toBe(0)
})
