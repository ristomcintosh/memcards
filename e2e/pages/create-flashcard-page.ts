import type { Page } from "@playwright/test"

export class CreateFlashcardPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/create-flashcard")
  }

  async createFlashcard(
    deckName: string,
    front: string = "Test Front",
    back: string = "Test Back"
  ) {
    await this.page.getByLabel("Deck").click()
    await this.page.getByLabel(deckName).click()
    await this.page.getByLabel("Front").fill(front)
    await this.page.getByLabel("Back").fill(back)
    await this.page.getByRole("button", { name: "Create" }).click()
    await this.page
      .getByTestId("toast-title")
      .getByText("Flashcard created!")
      .waitFor({ state: "visible" })
  }
}
