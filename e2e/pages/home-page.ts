import { Page } from "@playwright/test"

export class HomePage {
  private deckNames = new Set<string>()
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/")
  }

  async createDeck(deckName: string) {
    await this.page.getByLabel("Create").click()
    await this.page.getByRole("menuitem", { name: "Create Deck" }).click()
    await this.page.getByLabel("Deck Name:").fill(deckName)
    await this.page.getByRole("button", { name: "Submit" }).click()
    await this.page.getByText(deckName).waitFor({ state: "visible" })
    this.deckNames.add(deckName)
  }

  async deleteDeck(deckName: string) {
    await this.page
      .getByTestId(`deck-${deckName}`)
      .getByLabel("Deck Options")
      .click()
    await this.page.getByRole("menuitem", { name: "Delete" }).click()
    await this.page.getByRole("button", { name: "Continue" }).click()
  }

  async deleteAllDecks() {
    for (const deckName of this.deckNames) {
      await this.deleteDeck(deckName)
    }
  }
}
