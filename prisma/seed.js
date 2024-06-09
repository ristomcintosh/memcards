const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.flashcard.deleteMany()
  await prisma.deck.deleteMany()

  const deck1 = await prisma.deck.create({
    data: {
      name: "World Capitals",
      flashcards: {
        create: [
          { front: "What is the capital of France?", back: "Paris" },
          { front: "What is the capital of Portugal?", back: "Lisbon" },
          { front: "What is the capital of Spain?", back: "Madrid" },
          { front: "What is the capital of Italy?", back: "Rome" },
        ],
      },
    },
  })

  const deck2 = await prisma.deck.create({
    data: {
      name: "Basic Portuguese",
      flashcards: {
        create: [
          { front: "What is 'hello' in Portuguese?", back: "Olá" },
          { front: "What is 'thank you' in Portuguese?", back: "Obrigado" },
          { front: "What is 'blue' in Portuguese?", back: "Azul" },
          { front: "What is 'green' in Portuguese?", back: "Verde" },
        ],
      },
    },
  })

  console.log({ deck1, deck2 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
