import { test, expect } from "@playwright/test"
import { PrismaClient } from "@prisma/client"

test.afterEach(async () => {
  console.log("Cleaning up")
  const db = new PrismaClient()
  const user = await db.user.findUnique({
    where: { email: "preload@mail.com" },
  })

  const decks = await db.deck.findMany({
    where: { userId: user?.id },
    select: { id: true },
  })

  decks.forEach(async (deck) => {
    await db.flashcard.deleteMany({ where: { deckId: deck.id } })
    await db.deck.delete({ where: { id: deck.id } })
  })

  await db.user.delete({ where: { id: user?.id } })
})

test("new user should see a preloaded deck after signup", async ({ page }) => {
  await page.goto("http://localhost:3000/signup")
  await page.getByLabel("Email").fill("preload@mail.com")
  await page.getByLabel("Username").fill("preload")
  await page.locator('input[name="password"]').fill("password1")
  await page.getByRole("button", { name: "Sign up" }).click()

  await expect(page.getByTestId("home-page")).toBeVisible()

  await expect(page.getByText("World Capitals")).toBeVisible()
})
