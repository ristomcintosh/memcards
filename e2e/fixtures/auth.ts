import { test as baseTest, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

export * from "@playwright/test"
export const test = baseTest.extend<
  NonNullable<unknown>,
  { workerStorageState: string }
>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      )

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName)
        return
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined })

      const account = { username: `user${id}`, password: "password" }

      await page.goto("http://127.0.0.1:3000/login")
      await page.getByLabel("Username").fill(account.username)
      await page.locator('input[name="password"]').fill(account.password)
      await page.getByRole("button", { name: "Login" }).click()

      if (await page.getByText("Incorrect password or Username").isVisible()) {
        await page.goto("http://127.0.0.1:3000/create-user")
        await page.getByLabel("Username").fill(account.username)
        await page.locator('input[name="password"]').fill(account.password)
        await page.getByRole("button", { name: "Submit" }).click()
      }

      await expect(page.getByLabel("Create")).toBeVisible()

      // End of authentication steps.

      await page.context().storageState({ path: fileName })
      await page.close()
      await use(fileName)
    },
    { scope: "worker" },
  ],
})
