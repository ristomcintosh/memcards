/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  await prisma.flashcard.deleteMany()
  await prisma.deck.deleteMany()
  await prisma.user.deleteMany()
  await prisma.sharedDeck.deleteMany()

  console.log("🌱 seeding user")
  const user = await prisma.user.create({
    data: {
      password: await bcrypt.hash("password", 10),
      username: "user",
      email: "email@email.com",
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

  console.log("🌱 seeding shared deck")
  await prisma.sharedDeck.create({
    data: {
      name: "Getting Started",
      flashcards: {
        create: [
          {
            front: "🎉 Welcome to Memcards! Press the Flip button below",
            back: "Press Next to move to the next card",
          },
          {
            front: "You can Edit or delete this card using the menu (top left)",
            back: "Press Next",
          },
          {
            front: "Create your own decks and cards on the main page",
            back: "Happy studying! 😁",
          },
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
