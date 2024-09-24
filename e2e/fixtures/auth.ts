import type {
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  WorkerFixture} from "@playwright/test";
import {
  expect
} from "@playwright/test"
import fs from "fs"
import path from "path"

export const handleAuth: WorkerFixture<
  string,
  { workerStorageState: string } & PlaywrightWorkerArgs &
    PlaywrightWorkerOptions
> = async ({ browser }, use, workerInfo) => {
  // Use parallelIndex as a unique identifier for each worker.
  const id = workerInfo.parallelIndex
  const fileName = path.resolve(
    workerInfo.project.outputDir,
    `.auth/${id}.json`
  )

  if (fs.existsSync(fileName)) {
    // Reuse existing authentication state if any.
    await use(fileName)
    return
  }

  // Important: make sure we authenticate in a clean environment by unsetting storage state.
  const page = await browser.newPage({ storageState: undefined })

  const account = {
    username: `user${id}`,
    email: `test${id}@mail.com`,
    password: "password1",
  }

  await page.goto("http://127.0.0.1:3000/login")
  await page.getByLabel("Username").fill(account.username)
  await page.locator('input[name="password"]').fill(account.password)
  await page.getByRole("button", { name: "Log in" }).click()

  try {
    await expect(page.getByTestId("login-message")).toBeVisible({
      timeout: 1000,
    })
    console.log(
      `Login unsuccessful for user ${account.username}, creating account...`
    )
    await page.goto("http://127.0.0.1:3000/signup")
    await page.getByLabel("Email").fill(account.email)
    await page.getByLabel("Username").fill(account.username)
    await page.locator('input[name="password"]').fill(account.password)
    await page.getByRole("button", { name: "Sign up" }).click()
  } catch {
  } finally {
    // Wait for the "Create" button to confirm successful login
    await expect(page.getByLabel("Create")).toBeVisible()
    console.log(`Login successful for user ${account.username}`)
  }

  // Save storage state after successful login or account creation
  await page.context().storageState({ path: fileName })
  await page.close()
  await use(fileName)
}
