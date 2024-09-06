-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasBeenOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedDeck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedFlashcard" (
    "id" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedFlashcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFlashcard" ADD CONSTRAINT "SharedFlashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "SharedDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------- Manual Seeding --------------------------
-- Getting started shared deck
INSERT INTO "SharedDeck" ("id", "name", "createdAt", "updatedAt") VALUES ('cm0ofisyv00006wy1pfu3uvm9', 'Getting started', '2024-09-06 17:15:48.000', '2024-09-06 17:15:48.000');

INSERT INTO "SharedFlashcard" ("id", "front", "back", "deckId", "createdAt", "updatedAt") VALUES ('cm0ofisyv00016wy14dvajeph', '🎉 Welcome to Memcards! Press the Flip button below', 'Press Next to move to the next card', 'cm0ofisyv00006wy1pfu3uvm9', '2024-09-06 17:15:48.000', '2024-09-06 17:15:48.000');
INSERT INTO "SharedFlashcard" ("id", "front", "back", "deckId", "createdAt", "updatedAt") VALUES ('cm0ofisyv00026wy1z5pl7qw3', 'You can Edit or delete this card using the menu above', 'Press Next', 'cm0ofisyv00006wy1pfu3uvm9', '2024-09-06 17:15:48.000', '2024-09-06 17:15:48.000');
INSERT INTO "SharedFlashcard" ("id", "front", "back", "deckId", "createdAt", "updatedAt") VALUES ('cm0ofisyv00036wy1jwleeem7', 'Create your own decks and cards on the main page', 'Happy studying! 😁', 'cm0ofisyv00006wy1pfu3uvm9', '2024-09-06 17:15:48.000', '2024-09-06 17:15:48.000');




-- INSERT INTO SharedFlashcard(id,front,back,deckId,createdAt,updatedAt)
-- VALUES ('cm0ofisyv00016wy14dvajeph','🎉 Welcome to Memcards! Press the Flip button below','Press Next to move to the next card','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);
-- INSERT INTO SharedFlashcard(id,front,back,deckId,createdAt,updatedAt)
-- VALUES ('cm0ofisyv00026wy1z5pl7qw3','You can Edit or delete this card using the menu above','Press Next','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);
-- INSERT INTO SharedFlashcard(id,front,back,deckId,createdAt,updatedAt)
-- VALUES ('cm0ofisyv00036wy1jwleeem7','Create your own decks and cards on the main page','Happy studying! 😁','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);