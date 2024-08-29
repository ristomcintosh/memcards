import { Page } from "@playwright/test"

export class CreateFlashcardPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/create-flashcard")
  }

  async createFlashcard(front: string, back: string, deckName: string) {
    await this.page.getByLabel("Deck").click()
    await this.page.getByLabel(deckName).click()
    await this.page.getByLabel("Front").fill(front)
    await this.page.getByLabel("Back").fill(back)
    await this.page.getByRole("button", { name: "Create" }).click()
    await this.page.getByText(back).waitFor({ state: "detached" })
  }
}
