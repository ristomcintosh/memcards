import { test, expect } from "@playwright/test"

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
