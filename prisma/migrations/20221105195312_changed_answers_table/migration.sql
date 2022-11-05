/*
  Warnings:

  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `questionId` on the `Choice` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Answers";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "text" TEXT NOT NULL,
    "questionId" INTEGER,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("id", "questionId", "text") SELECT "id", "questionId", "text" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "subelement" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "correctAnswer" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Question" ("group", "id", "questionId", "questionText", "subelement") SELECT "group", "id", "questionId", "questionText", "subelement" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
