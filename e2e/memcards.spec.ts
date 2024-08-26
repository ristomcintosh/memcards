import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("Create deck flow", () => {
  test("Create and delete deck", async ({ page }, testInfo) => {
    const deckName = `New deck ${testInfo.testId}`
    await page.getByLabel("Create").click()
    await page.getByRole("menuitem", { name: "Create Deck" }).click()

    await expect(page.getByText("Create A New Deck")).toBeVisible()

    await page.getByLabel("Deck Name:").fill(deckName)
    await page.getByRole("button", { name: "Submit" }).click()

    await expect(page.getByText(deckName)).toBeVisible()

    await page
      .getByTestId(`deck-${deckName}`)
      .getByLabel("Deck Options")
      .click()

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
})

test.describe("Study Session Scenarios", () => {
  test("Normal study flow", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "Basic Portuguese" }).click()

    await expect(
      page.getByRole("heading", { name: "Basic Portuguese" })
    ).toBeVisible()

    await expect(page.getByText("What is 'hello' in Portuguese?")).toBeVisible()

    await page.getByRole("button", { name: "Flip" }).click()

    await expect(page.getByText("Olá")).toBeVisible()

    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Next" }).click()

    await expect(page.getByTestId("completed-modal")).toBeVisible()

    await page.getByRole("link", { name: "Home" }).click()
  })

  test("Studying a deck with no flashcards", async ({ page }) => {
    await page.goto("/study/empty-deck")

    await expect(page.getByText("Page Not Found")).toBeVisible()

    await page.getByRole("link", { name: "Home" }).click()
  })
})

test.describe("Accessibility", () => {
  test("Main page should have no accessibility violations", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    console.log(accessibilityScanResults.violations)

    expect(accessibilityScanResults.violations.length).toBe(0)
  })

  test("Study page should have no accessibility violations", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Basic Portuguese" }).click()

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations.length).toBe(0)
  })

  test("Create flashcard page should have no accessibility violations", async ({
    page,
  }, testInfo) => {
    await page.getByLabel("Create").click()
    await page.getByRole("menuitem", { name: "Create Flashcards" }).click()

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations.length).toBe(0)
  })
})
