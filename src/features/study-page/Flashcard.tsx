"use client"
import { Flashcard as FlashcardType } from "@/types"
import { motion, Variants } from "framer-motion"

type CardSide = "front" | "back"

type FlashcardProps = {
  cardSide: CardSide
  flashcard: FlashcardType
}

export const Flashcard = ({ cardSide, flashcard }: FlashcardProps) => {
  return (
    <motion.div
      variants={flashcardVariants}
      animate={cardSide === "front" ? "flipToFront" : "flipToBack"}
      className="relative flex flex-col items-center justify-center w-3/4 max-w-md bg-zinc-50 dark:bg-zinc-600 shadow-lg rounded-xl"
      style={{ minHeight: "250px" }}
    >
      <FlashcardContent
        cardSide={cardSide}
        text={cardSide === "front" ? flashcard.front : flashcard.back}
      />
    </motion.div>
  )
}

type FlashcardContentProps = {
  text: string
  cardSide: CardSide
}

const FlashcardContent = ({ cardSide, text }: FlashcardContentProps) => {
  const defaultStyles = cardSide === "back" ? { rotateY: 180 } : {}
  return (
    <motion.div
      style={{ ...defaultStyles }}
      className="flex flex-col items-center justify-center w-full p-4"
    >
      <p className="mb-2 text-4xl text-center">{text}</p>
    </motion.div>
  )
}

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
}
