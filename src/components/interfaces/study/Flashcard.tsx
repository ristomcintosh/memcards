"use client";

import { Variants, motion } from "framer-motion";
import { Flashcard as FlashcardType } from "@/types";

type CardSide = "front" | "back";

type FlashcardProps = {
  cardSide: CardSide;
  flashcard: FlashcardType;
};

export const Flashcard = ({ cardSide, flashcard }: FlashcardProps) => {
  return (
    <motion.div
      variants={flashcardVariants}
      animate={cardSide === "front" ? "flipToFront" : "flipToBack"}
      className="relative py-4 px-6 flex-grow flex items-center justify-center w-full max-w-xs  sm:max-w-lg bg-zinc-50 dark:bg-zinc-600 shadow-lg rounded-xl break-words hyphens-auto"
      style={{ minHeight: "300px", maxHeight: "500px" }}
    >
      <FlashcardContent
        cardSide={cardSide}
        text={cardSide === "front" ? flashcard.front : flashcard.back}
      />
    </motion.div>
  );
};

type FlashcardContentProps = {
  text: string;
  cardSide: CardSide;
};

const FlashcardContent = ({ cardSide, text }: FlashcardContentProps) => {
  const defaultStyles = cardSide === "back" ? { rotateY: 180 } : {};
  return (
    <motion.p
      style={{ ...defaultStyles }}
      className="text-2xl sm:text-3xl text-center"
    >
      {text}
    </motion.p>
  );
};

const flashcardVariants: Variants = {
  flipToFront: {
    rotateY: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
    },
  },
  flipToBack: {
    rotateY: 180,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
    },
  },
};
