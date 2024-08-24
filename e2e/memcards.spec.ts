import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("Create deck flow", () => {
  test("Create and delete deck", async ({ page }) => {
    await page.getByLabel("Create").click()
    await page.getByRole("menuitem", { name: "Create Deck" }).click()

    await expect(page.getByText("Create A New Deck")).toBeVisible()

    await page.getByLabel("Deck Name:").fill("New deck")
    await page.getByRole("button", { name: "Submit" }).click()

    await expect(page.getByText("New deck")).toBeVisible()

    const deckToDelete = page.getByTestId("deck-New deck")
    await deckToDelete.getByLabel("Deck Options").click()

    await page.getByRole("menuitem", { name: "Delete" }).click()
    await page.getByRole("button", { name: "Yes" }).click()
  })

  test("Cancel deck creation", async ({ page }) => {
    await page.getByLabel("Create").click()
    await page.getByRole("menuitem", { name: "Create Deck" }).click()

    await expect(page.getByText("Create A New Deck")).toBeVisible()

    await page.getByRole("button", { name: "Cancel" }).click()

    await expect(page.getByText("Create A New Deck")).not.toBeVisible()
  })
})

test("Deck study flow", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Basic Portuguese" }).click()

  expect(page.getByRole("heading", { name: "Basic Portuguese" })).toBeVisible()

  expect(page.getByText("What is 'hello' in Portuguese?")).toBeVisible()

  await page.getByRole("button", { name: "Flip" }).click()

  expect(page.getByText("Olá")).toBeVisible()

  await page.getByRole("button", { name: "Next" }).click()
  await page.getByRole("button", { name: "Next" }).click()
  await page.getByRole("button", { name: "Next" }).click()
  await page.getByRole("button", { name: "Next" }).click()

  expect(page.getByTestId("completed-modal")).toBeVisible()

  await page.getByRole("link", { name: "Home" }).click()
})
