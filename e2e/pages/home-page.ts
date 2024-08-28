import { Page } from "@playwright/test"

export class HomePage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/")
  }

  async createDeck(deckName: string) {
    await this.page.getByLabel("Create").click()
    await this.page.getByRole("menuitem", { name: "Create Deck" }).click()
    await this.page.getByLabel("Deck Name:").fill(deckName)
    await this.page.getByRole("button", { name: "Submit" }).click()
  }

  async deleteDeck(deckName: string) {
    await this.page
      .getByTestId(`deck-${deckName}`)
      .getByLabel("Deck Options")
      .click()
    await this.page.getByRole("menuitem", { name: "Delete" }).click()
    await this.page.getByRole("button", { name: "Yes" }).click()
  }
}
