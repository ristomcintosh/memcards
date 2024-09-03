import { test, expect } from "@playwright/test"
import { PrismaClient } from "@prisma/client"

test.afterEach(async () => {
  const db = new PrismaClient()

  const user = await db.user.findUnique({
    where: { email: "preload@mail.com" },
  })

  await db.deck.deleteMany({ where: { userId: user?.id } })

  await db.user.delete({ where: { id: user?.id } })
})

test("new user should see a preloaded deck after signup", async ({ page }) => {
  await page.goto("http://localhost:3000/signup")
  await page.getByLabel("Email").fill("preload@mail.com")
  await page.getByLabel("Username").fill("preload")
  await page.locator('input[name="password"]').fill("password1")
  await page.getByRole("button", { name: "Sign up" }).click()

  await expect(page.getByTestId("home-page")).toBeVisible()

  await expect(page.getByText("Getting Started")).toBeVisible()
})
