"use client"
import { Flashcard as FlashcardType, FlashcardImage } from "@/types"
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
      className="relative flex flex-col items-center justify-center w-3/4 max-w-md bg-white shadow-lg rounded-xl"
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
  image?: FlashcardImage
}

const FlashcardContent = ({ cardSide, text, image }: FlashcardContentProps) => {
  const defaultStyles = cardSide === "back" ? { rotateY: 180 } : {}
  return (
    <motion.div
      key={cardSide}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ delay: 0.2 }}
      style={{ ...defaultStyles }}
      className="flex flex-col items-center justify-center w-full p-4"
    >
      <p className="mb-2 text-4xl text-center">{text}</p>
      {/* {image && (
        <div className="bg-gray-400 max-w-xxs">
          <img
            className="object-contain"
            width="400"
            src={image.src}
            alt={image.alt}
          />
        </div>
      )} */}
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
