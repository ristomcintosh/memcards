import { test as base, expect } from "./fixtures/auth"
import { CreateFlashcardPage } from "./pages/create-flashcard-page"
import { HomePage } from "./pages/home-page"
import AxeBuilder from "@axe-core/playwright"

const test = base.extend<{
  homePage: HomePage
  createFlashCardPage: CreateFlashcardPage
  deckName: string
}>({
  deckName: `Deck ${crypto.randomUUID()}`,
  homePage: [
    async ({ page, deckName }, use) => {
      const homePage = new HomePage(page)
      await homePage.goto()
      await homePage.createDeck(deckName)

      await use(homePage)

      await homePage.goto()
      await homePage.deleteDeck(deckName)
    },
    { auto: true },
  ],
})

test("Normal study flow", async ({ page, homePage, deckName }) => {
  const createFlashCardPage = new CreateFlashcardPage(page)
  await createFlashCardPage.goto()
  const flashcardFront = "What is 'hello' in Portuguese?"
  const flashcardBack = "Olá"
  await createFlashCardPage.createFlashcard(
    flashcardFront,
    flashcardBack,
    deckName
  )

  await homePage.goto()
  await page.getByRole("link", { name: deckName }).click()

  await expect(page.getByText(deckName)).toBeVisible()

  await expect(page.getByText(flashcardFront)).toBeVisible()

  await page.getByRole("button", { name: "Flip" }).click()

  await expect(page.getByText(flashcardBack)).toBeVisible()

  await page.getByRole("button", { name: "Next" }).click()

  await expect(page.getByTestId("completed-modal")).toBeVisible()
})

test("try to study a deck with no flashcards", async ({
  page,
  homePage,
  deckName,
}) => {
  await homePage.goto()
  await page.getByRole("link", { name: deckName }).click()

  await expect(
    page.getByText("😅 Oops, no flashcards here! Add some!")
  ).toBeVisible()
})

test("should have no accessibility violations", async ({
  page,
  homePage,
  deckName,
}) => {
  const createFlashCardPage = new CreateFlashcardPage(page)
  await createFlashCardPage.goto()
  const flashcardFront = "What is 'hello' in Portuguese?"
  const flashcardBack = "Olá"
  await createFlashCardPage.createFlashcard(
    flashcardFront,
    flashcardBack,
    deckName
  )
  await homePage.goto()
  await page.getByRole("link", { name: deckName }).click()

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  if (accessibilityScanResults.violations.length > 0) {
    console.log(accessibilityScanResults.violations)
  }

  expect(accessibilityScanResults.violations.length).toBe(0)
})
