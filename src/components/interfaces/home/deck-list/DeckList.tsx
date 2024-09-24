"use client";

import Link from "next/link";
import type { DeckWithCardCount } from "@/types";
import { DeckMenu } from "./DeckListMenu";
import { ModalManager, useModalState } from "./ModalManger";

type DeckListProps = {
  decks: DeckWithCardCount[];
};

export const DeckList = ({ decks }: DeckListProps) => {
  const { modalType, closeModal, toggleModal, selectedDeck } = useModalState();

  return (
    <>
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="flex items-center gap-2 px-2.5 py-1 text-2xl border-b-2 border-gray-300 last:mb-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          data-testid={`deck-${deck.name}`}
        >
          <Link
            className="flex-grow text-inherit hover:no-underline break-words hyphens-auto"
            href={`/study/${deck.id}`}
          >
            {deck.name}
          </Link>
          <p>
            <span className="sr-only">number of cards,</span>
            {deck.cardCount}
          </p>

          <DeckMenu
            handleRename={() => toggleModal(deck, "rename")}
            handleDelete={() => toggleModal(deck, "delete")}
          />
        </div>
      ))}
      <ModalManager
        modalType={modalType}
        deck={selectedDeck}
        closeModal={closeModal}
      />
    </>
  );
};
