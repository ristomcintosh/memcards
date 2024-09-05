-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasBeenOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SharedDeck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SharedFlashcard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SharedFlashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "SharedDeck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");


--------------------------------- Manual Seeding --------------------------
-- Getting started shared deck
INSERT INTO SharedDeck VALUES('cm0ofisyv00006wy1pfu3uvm9','Getting Started',1725488869927,1725488869927);

INSERT INTO SharedFlashcard VALUES('cm0ofisyv00016wy14dvajeph','🎉 Welcome to Memcards! Press the Flip button below','Press Next to move to the next card','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);
INSERT INTO SharedFlashcard VALUES('cm0ofisyv00026wy1z5pl7qw3','You can Edit or delete this card using the menu (top left)','Press Next','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);
INSERT INTO SharedFlashcard VALUES('cm0ofisyv00036wy1jwleeem7','Create your own decks and cards on the main page','Happy studying! 😁','cm0ofisyv00006wy1pfu3uvm9',1725488869927,1725488869927);
