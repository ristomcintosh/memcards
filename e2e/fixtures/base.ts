import { test as base } from "@playwright/test"
import { AxeBuilder, makeAxeBuilder } from "./a11y"
import { handleAuth } from "./auth"
export * from "@playwright/test"

type BaseFixtures = {
  makeAxeBuilder: () => AxeBuilder
}

export const test = base.extend<BaseFixtures, { workerStorageState: string }>({
  makeAxeBuilder: makeAxeBuilder,

  // Authentication - one user per worker.
  // copy pasta from https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [handleAuth, { scope: "worker" }],
})
