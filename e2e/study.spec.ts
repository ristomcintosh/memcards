import { test as base, expect } from "./fixtures/base"
import { CreateFlashcardPage } from "./pages/create-flashcard-page"
import { HomePage } from "./pages/home-page"

const test = base.extend<{
  createNewDeck: () => Promise<string>
  createFlashCardPage: CreateFlashcardPage
}>({
  createNewDeck: [
    async ({ page }, use) => {
      const homePage = new HomePage(page)
      const setup = async () => {
        const deckName = `Deck ${crypto.randomUUID()}`
        await homePage.goto()
        await homePage.createDeck(deckName)
        return deckName
      }

      await use(setup)

      await homePage.goto()
      await homePage.deleteAllDecks()
    },
    { auto: true },
  ],
  createFlashCardPage: async ({ page }, use) => {
    const createFlashCardPage = new CreateFlashcardPage(page)
    await use(createFlashCardPage)
  },
})

test("Normal study flow", async ({
  page,
  createNewDeck,
  createFlashCardPage,
}) => {
  const deckName = await createNewDeck()

  await createFlashCardPage.goto()
  const flashcardFront = "What is 'hello' in Portuguese?"
  const flashcardBack = "Olá"
  await createFlashCardPage.createFlashcard(
    deckName,
    flashcardFront,
    flashcardBack
  )

  await page.goto("/")

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
  createNewDeck,
  makeAxeBuilder,
}) => {
  const deckName = await createNewDeck()
  await page.getByRole("link", { name: deckName }).click()

  await expect(
    page.getByText("😅 Oops, no flashcards here! Add some!")
  ).toBeVisible()

  const accessibilityScanResults = await makeAxeBuilder().analyzeWithLogger()

  expect(accessibilityScanResults.violations.length).toBe(0)
})

test("should have no accessibility violations", async ({
  page,
  createNewDeck,
  createFlashCardPage,
  makeAxeBuilder,
}) => {
  const deckName = await createNewDeck()
  await createFlashCardPage.goto()
  await createFlashCardPage.createFlashcard(deckName)

  await page.goto("/")
  await page.getByRole("link", { name: deckName }).click()

  const accessibilityScanResults = await makeAxeBuilder().analyzeWithLogger()

  expect(accessibilityScanResults.violations.length).toBe(0)
})
