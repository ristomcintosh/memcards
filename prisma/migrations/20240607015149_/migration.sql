-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cardCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Deck" ("cardCount", "id", "name") SELECT "cardCount", "id", "name" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_key_check("Deck");
PRAGMA foreign_keys=ON;
