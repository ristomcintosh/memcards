/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  await prisma.flashcard.deleteMany()
  await prisma.deck.deleteMany()
  await prisma.user.deleteMany()

  console.log("🌱 seeding user")
  const user = await prisma.user.create({
    data: {
      password: await bcrypt.hash("password", 10),
      username: "user",
      email: "email@email.com",
    },
  })

  console.log("🌱 seeding getting started deck to user")
  const tutorialDeck = await prisma.sharedDeck.findFirst({
    include: {
      flashcards: {
        select: { front: true, back: true },
      },
    },
  })

  if (!tutorialDeck)
    throw new Error("Tutorial deck not found, Did you run the migration?")

  await prisma.deck.create({
    data: {
      name: tutorialDeck.name,
      userId: user.id,
      flashcards: {
        create: tutorialDeck.flashcards,
      },
    },
  })

  console.log("🌱 seeding deck")
  await prisma.deck.create({
    data: {
      name: "Basic Portuguese",
      userId: user.id,
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
