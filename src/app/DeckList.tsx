import { MenuItemsAnimate } from "@/components/MenuItemsAnimate"
import { Deck } from "@/types"
import { Menu, MenuButton, MenuItem } from "@headlessui/react"

const decks: Deck[] = [
  {
    name: "Deck 1",
    cardCount: 25,
    id: "some-id",
  },
]

export const DeckList = () => {
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center pl-2 mb-2 text-2xl border-b-2 border-gray-300 last:mb-0"
    >
      <p className="flex-1">{deck.name}</p>
      <p data-testid="deck-card-count">{deck.cardCount}</p>
      <DeckOptions />
    </div>
  ))
}

const menuOptions = ["Rename", "Delete"]

const DeckOptions = () => {
  return (
    <Menu>
      <MenuButton aria-label="Deck menu" className="w-5">
        <Icon />
      </MenuButton>
      <MenuItemsAnimate>
        {menuOptions.map((option) => (
          <MenuItem key={option}>
            <button className="w-full text-center data-[active]:bg-brand-800 data-[active]:bg-opacity-60 text-base whitespace-nowrap p-2 border-b-2 last:border-0 border-brand-700 border-opacity-60">
              {option}
            </button>
          </MenuItem>
        ))}
      </MenuItemsAnimate>
    </Menu>
  )
}

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
)
